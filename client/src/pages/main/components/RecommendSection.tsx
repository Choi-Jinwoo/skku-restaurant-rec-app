import { useState } from "react";
import { postRecommendMeetingPlace, RecommendedMeetingPlace } from "../../../remote";
import RecommendForm, { RecommendMeetingPlaceForm } from "./RecommendForm"
import RecommendedResult from "./RecommendedResult";


const RecommendSection = () => {
  const [recommendedMeetingPlaces, setRecommendedMeetingPlaces] = useState<RecommendedMeetingPlace[] | null>(null);

  const handleSubmit = async (form: RecommendMeetingPlaceForm) => {
    const { data } = await postRecommendMeetingPlace(form)

    setRecommendedMeetingPlaces(data.data)
  }


  return (
    <div>
      <h1 className="text-gray-700 text-xl mb-4 font-bold">장소 추천받기</h1>
      {
        recommendedMeetingPlaces != null ? (
          <RecommendedResult places={recommendedMeetingPlaces} />
        ) : <RecommendForm onSubmit={handleSubmit} />
      }
    </div>
  )
}

export default RecommendSection