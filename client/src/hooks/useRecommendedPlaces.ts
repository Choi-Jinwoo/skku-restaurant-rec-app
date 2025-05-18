import { useEffect, useState } from "react"
import { getRecommendedMeetingPlace, MeetingPlace } from "../remote"

const useRecommendedPlaces = (status?: "RECOMMENDED" | "GONE" | "REVIEWED") => {

  const [list, setList] = useState<MeetingPlace[]>([])

  const handleSyncData = () => {
    getRecommendedMeetingPlace()
      .then(res => {
        setList(res.data.places.filter(item => status == null ? true : item.status === status))
      })
  }

  useEffect(() => {
    handleSyncData();
  }, [])

  return { places: list, refetch: handleSyncData };
}

export default useRecommendedPlaces