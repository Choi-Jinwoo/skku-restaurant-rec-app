import useRecommendedPlaces from "../../../hooks/useRecommendedPlaces";
import { updateRecommendMeetingPlaceStatus } from "../../../remote";

const RecentRecommendedList = () => {
  const { places, refetch } = useRecommendedPlaces("RECOMMENDED");

  return (
    <div>
      <h1 className="text-gray-700 text-xl mb-4 font-bold">최근 추천 받은 장소</h1>
      <section className="bg-white rounded-lg p-4">
        <h2 className="text-gray-400 text-sm mb-4 border-b-1 border-gray-200 pb-2">추천 받은 장소를 다녀오셨나요?</h2>
        <div className="flex flex-col gap-8">
          {places.map(place => (
            <div>
              <h3 className="text-md text-gray-700">{place.name}<span className="ml-2 text-sm text-gray-600">{place.businessType}</span></h3>
              <p className="text-sm text-gray-600 mt-1">{place.address}</p>
              <div className="flex items-center mt-2 gap-2">
                <button className="mt-2 text-sm bg-blue-50 text-blue-400 border-1 border-blue-400 rounded px-2 py-1 cursor-pointer"
                  onClick={async () => {
                    await updateRecommendMeetingPlaceStatus(place.id, "GONE");
                    refetch();
                  }}
                >다녀왔어요</button>
                <button
                  onClick={async () => {
                    await updateRecommendMeetingPlaceStatus(place.id, "DISMISSED");
                    refetch();
                  }}
                  className="mt-2 text-sm bg-gray-100 text-gray-500 border-1 border-gray-400 rounded px-2 py-1 cursor-pointer">안 다녀왔어요</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default RecentRecommendedList;