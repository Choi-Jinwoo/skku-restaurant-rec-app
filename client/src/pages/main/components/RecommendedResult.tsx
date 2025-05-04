import { RecommendedMeetingPlace } from "../../../remote";

type Props = {
  places: RecommendedMeetingPlace[]
}

const RecommendedResult = ({ places }: Props) => {
  return (
    <section className="bg-white rounded-lg p-4">
      <h2 className="text-md">조건에 맞는 식당들을 추천해드릴게요</h2>

      <div className="mt-4">
        {places.map(place => (
          <article key={place.id} >
            <div className="flex items-start gap-4 p-4">
              <img src={place.imageUrl} alt="" className="w-32 h-32 object-cover rounded-lg" />
              <div className="py-2 ">
                <h3 className="text-lg text-blue-500">{place.name}<span className="ml-2 text-sm text-gray-600">{place.businessType}</span></h3>
                <p className="text-gray-500 my-2">{place.feature}</p>
                <div className="h-fit px-2 py-1 rounded bg-blue-50 text-xs text-blue-600 w-fit">영업: {place.time}</div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default RecommendedResult;