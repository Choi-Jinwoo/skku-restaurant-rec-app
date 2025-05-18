import axios from "axios";
import { RecommendMeetingPlaceForm } from "../pages/main/components/RecommendForm";

const axiosClient = axios.create({
  baseURL: 'http://localhost:8000',
})

export interface RecommendedMeetingPlace {
  name: string;
  address: string;
  operationTime: string;
  businessType: string;
  feature: string;
  imageUrl: string | null;
  ogImageUrl: string | null;
}

export interface User {
  id: string;
  name: string;
  role: string;
  department: string;
  birthYear: number;
  createdAt: string;
}


export const postRecommendMeetingPlace = async (payload: RecommendMeetingPlaceForm) => {
  return await axiosClient.post<{ data: RecommendedMeetingPlace[] }>('/place/recommend', {
    userIds: payload.users.map(user => String(user.id)),
    location: payload.location,
    purpose: payload.businessType,
    timeSlot: payload.timeSlot,
    parking: payload.parking,
    roomReservation: payload.room,
  })
}

export const fetchUsers = async () => {
  const { data } = await axiosClient.get<{ users: User[] }>('/users')

  return data
}


export interface MeetingPlace {
  id: string
  "imageUrl": string | null;
  "operationTime": string;
  "feature": string;
  "createdAt": string;
  "address": string;
  "status": "RECOMMENDED" | "GONE" | "DISMISSED" | "REVIEWED"
  "businessType": string;
  "users": string[]
  "name": string;
  "reviews"?: {
    content: string;
    score: number;
  }
}

export const getRecommendedMeetingPlace = async () => {
  return await axiosClient.get<{
    places: MeetingPlace[]
  }>('/place/list')
}

export const updateRecommendMeetingPlaceStatus = async (id: string, status: "RECOMMENDED" | 'GONE' | "DISMISSED") => {
  return await axiosClient.post("/place/status/update", {
    placeId: id,
    status
  })
}

export const createUser = async (user: Omit<User, 'id' | 'createdAt'>) => {
  return await axiosClient.post('/user', { ...user })
}
export const getUserRank = async () => {
  return await axiosClient.get<{ users: User[] }>('/user/rank')
}

export const createReview = async (data: { placeId: string, content: string, score: number }) => {
  return await axiosClient.post('/place/review', data)
}

export const getMBTIScore = async (data: { mbtis: string[] }) => {
  return await axiosClient.post<{ score: number }>('/mbti/score', data)
}