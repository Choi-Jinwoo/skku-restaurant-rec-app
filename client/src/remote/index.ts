import axios from "axios";
import { MeetingPlaceStatus } from "../shared/models";
import { RecommendMeetingPlaceForm } from "../pages/main/components/RecommendForm";

const axiosClient = axios.create({
  baseURL: '',
})

export interface RecommendedMeetingPlace {
  id: number;
  name: string;
  address: string;
  feature: string;
  createdAt: string;
  time: string;
  businessType: string;
  imageUrl: string;
  status: MeetingPlaceStatus
}

export const postRecommendMeetingPlace = async (payload: RecommendMeetingPlaceForm) => {
  return {
    data: {
      places: [
        {
          id: 1,
          "name": "진진바라 삼성점",
          "address": "서울특별시 강남구 삼성로 85길 26",
          "time": "매일 11:30 - 22:00",
          "feature": "전통 한정식 코스 요리 제공, 고급스러운 인테리어, 다양한 크기의 룸 보유, 주차 가능",
          "businessType": "한식",
          "imageUrl": "https://tse2.mm.bing.net/th?id=OIP.Sw-HrgtQ0uTEGvS_o5fYTgHaJ2&pid=Api",
          status: MeetingPlaceStatus.RECOMMEND,
          createdAt: '2023-10-01T12:00:00Z',
        },
        {
          id: 2,
          "name": "천미미 삼성점",
          "address": "서울특별시 강남구 삼성로 534 1층",
          "time": "매일 11:00 - 21:30",
          "feature": "정통 중식 요리 제공, 다양한 룸 보유, 발렛파킹 포함 주차 가능, 단체 이용 적합",
          "businessType": "중식",
          "imageUrl": "https://tse3.mm.bing.net/th?id=OIP.pqRd11b93HErjTQ3R89orQHaDV&pid=Api",
          status: MeetingPlaceStatus.RECOMMEND,
          createdAt: '2023-10-01T12:00:00Z',
        },
        {
          id: 3,
          "name": "명인등심 삼성직영점",
          "address": "서울특별시 강남구 봉은사로86길 30",
          "time": "매일 11:30 - 22:00",
          "feature": "한우 등심 전문점, 프라이빗한 룸 보유, 발렛파킹 포함 주차 가능, 고급스러운 분위기",
          "businessType": "한식",
          "imageUrl": "https://tse4.mm.bing.net/th?id=OIP.oMI2AxaAPnSnFzpo6APJJwHaE7&pid=Api",
          status: MeetingPlaceStatus.RECOMMEND,
          createdAt: '2023-10-01T12:00:00Z',
        },
        {
          id: 4,
          "name": "하루 오마카세",
          "address": "서울특별시 강남구 삼성로 511 골든타워 B1",
          "time": "매일 11:30 - 23:00",
          "feature": "가성비 좋은 일식 오마카세 제공, 프라이빗한 룸 보유, 3시간 무료 주차 지원",
          "businessType": "일식",
          "imageUrl": "https://tse3.mm.bing.net/th?id=OIP.eF0_fE8Vz55pE3as3AngAgHaHa&pid=Api",
          status: MeetingPlaceStatus.RECOMMEND,
          createdAt: '2023-10-01T12:00:00Z',
        }
      ]
    }
  }
  // return await axiosClient.post<{ places: RecommendedMeetingPlace[] }>('/api/recommend', payload)
}