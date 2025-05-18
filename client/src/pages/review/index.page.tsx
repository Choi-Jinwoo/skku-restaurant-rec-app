import { useState } from "react"
import useRecommendedPlaces from "../../hooks/useRecommendedPlaces"
import { createReview, MeetingPlace } from "../../remote"
import Layout from "../../shared/components/Layout"
import Modal from "../../shared/components/Modal"
import Table from "../../shared/components/Table"
import TopNavBar from "../../shared/components/TopNavBar"


const StarRating = ({ max = 5, onRate }: { max: number, onRate: (rate: number) => void }) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setSelected(index);
    if (onRate) onRate(index + 1);
  };

  const renderStar = (filled: boolean) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={1.5}
      className="w-6 h-6"
    >
      <path
        fillRule="evenodd"
        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
        clipRule="evenodd"
      />
    </svg>
  );


  return (
    <div className="flex space-x-1 text-yellow-400">
      {Array.from({ length: max }).map((_, index) => (
        <button
          key={index}
          type="button"
          onMouseEnter={() => setHovered(index)}
          onMouseLeave={() => setHovered(null)}
          onClick={() => handleClick(index)}
          className="hover:scale-110 transition-transform"
        >
          {renderStar(index <= (hovered ?? selected ?? -1))}
        </button>
      ))}
    </div>
  )
}

const RegisterReviewModal = ({ open, onClose, refetch, place }: { place: MeetingPlace | null, open: boolean, onClose: () => void, refetch: () => void }) => {
  const [form, setForm] = useState({
    content: '',
    score: 0,
  })

  const handleRegister = async () => {
    if (!form.content || form.score === 0) {
      alert('모든 필드를 입력해주세요.')
      return
    }

    await createReview({
      placeId: place!.id,
      content: form.content,
      score: form.score,
    })

    refetch();
    onClose();
  }


  return <Modal onClose={onClose} open={open}>
    <h1 className="text-xl text-gray-700 mb-4 font-bold">'{place?.name}' 리뷰 작성</h1>
    <div className="relative w-full max-w-md" >
      <label className="block mb-1 text-sm font-medium text-gray-700">
        별점
      </label>
      <StarRating max={5} onRate={(rate) => setForm(prev => ({ ...prev, score: rate }))} />
    </div>
    <div className="mb-4" />
    <div className="relative w-full max-w-md" >
      <label className="block mb-1 text-sm font-medium text-gray-700">
        내용
      </label>
      <textarea
        value={form.content}
        onChange={(e) => {
          setForm(prev => ({ ...prev, content: e.target.value }))
        }}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        placeholder="리뷰 내용을 작성해주세요"
      />
    </div>
    <div className="mt-8 flex justify-end w-full" >
      <button onClick={handleRegister} className="bg-blue-500 text-white px-6 py-1 rounded cursor-pointer">등록</button>
    </div>
  </Modal>
}

const ReviewPage = () => {
  const [place, setCurrentPlace] = useState<MeetingPlace | null>(null);
  const { places, refetch } = useRecommendedPlaces();

  const pendingPlaces = places.filter(item => item.status === "GONE");
  const reviewedPlaces = places.filter(item => item.status === "REVIEWED").map(item => ({ ...item, ...item.reviews! }));


  return (
    <>
      <TopNavBar />
      <Layout>
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-gray-700 text-xl font-bold">리뷰를 작성해보세요</h1>
        </div>
        <RegisterReviewModal place={place} open={place != null} onClose={() => setCurrentPlace(null)} refetch={() => {
          refetch();
        }} />
        <Table columns={[
          { key: 'idx', header: 'ID' },
          { key: 'name', header: '식당명' },
          { key: 'address', header: '주소' },
          {
            header: '작성하기', render: (item) => <button className="bg-blue-500 text-white px-2 py-1 rounded cursor-pointer" onClick={
              () => {
                setCurrentPlace(item)
              }
            }>작성하기</button>
          },
        ]} data={pendingPlaces.map((item, idx) => ({
          ...item,
          idx: idx + 1,
        }))}></Table>

        <div className="flex justify-between items-center mb-4 mt-8">
          <h1 className="text-gray-700 text-xl font-bold">리뷰를 작성해보세요 </h1>
        </div>
        <Table columns={[
          { key: 'id', header: 'ID' },
          { key: 'name', header: '식당명' },
          { key: 'address', header: '주소' },
          { key: 'content', header: '평점' },
          { key: 'score', header: '점수' },
        ]} data={reviewedPlaces.map((item, idx) => ({
          ...item,
          id: idx + 1,
        }))}></Table>
      </Layout>
    </>
  )
}

export default ReviewPage