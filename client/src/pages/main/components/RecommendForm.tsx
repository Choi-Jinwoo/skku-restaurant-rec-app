import { useState } from "react"
import districts from '../../../constants/district.json'
import SearchInput from "../../../shared/components/SearchInput"
import { BusinessType, TimeSlot, User } from "../../../shared/models"
import { RadioGroup } from "../../../shared/components/RadioButton"
import Loading from "./Loading"

export type RecommendMeetingPlaceForm = {
  users: User[]
  location: string;
  businessType: BusinessType;
  timeSlot: TimeSlot;
  parking: boolean;
  room: boolean;
}

const USERS: User[] = [
  { id: 1, name: '김OO' },
  { id: 2, name: '이OO' },
  { id: 3, name: '최OO' },
  { id: 4, name: '박OO' }
]

type Props = {
  onSubmit: (form: RecommendMeetingPlaceForm) => void;
}

const RecommendForm = ({ onSubmit }: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [form, setForm] = useState<RecommendMeetingPlaceForm>({
    users: [],
    location: '',
    businessType: BusinessType.비즈니스,
    timeSlot: TimeSlot.저녁,
    parking: true,
    room: true
  })

  const handleChange = (key: keyof RecommendMeetingPlaceForm, value: RecommendMeetingPlaceForm[typeof key]) => {
    setForm((prev) => ({
      ...prev,
      [key]: value
    }))
  }

  const handleSubmit = async () => {
    setIsLoading(true);
    await onSubmit(form);
    setIsLoading(false);
  }


  if (isLoading) {
    return (
      <Loading />
    )
  }

  return (
    <section className="bg-white rounded-lg p-4">
      <div>
        <div className="flex justify-between items-center gap-4">
          <SearchInput placeholder="홍길동" label="이름" list={
            USERS.map(user => ({
              label: user.name,
              value: user,
            }))
          } onChange={(user) => {
            setForm(prev => ({
              ...prev,
              users: prev.users.some(item => item.id === user.id) ? prev.users : [...prev.users, user]
            }))
          }} />
          <SearchInput placeholder="서울특별시 종로구 혜화동" label="위치" list={
            districts.map(item => ({
              label: item.name,
              value: item.name,
            }))
          }
            onChange={(location) => {
              handleChange('location', location)
            }} />
        </div>
        <div className="mt-8">
          <span className="block mb-1 text-sm font-medium text-gray-700">참석인원</span>
          <div className="flex gap-1 h-8">
            {form.users.map(item => (
              <div key={item.id} className="h-fit px-2 py-1 rounded bg-blue-50 text-xs text-blue-600 w-fit">{item.name}</div>
            ))}
          </div>
        </div>
        <div className="flex justify-between items-center gap-4 mt-8">
          <SearchInput placeholder="" label="모임 종류" list={[
            { label: "비즈니스", value: BusinessType.비즈니스 },
            { label: '친목', value: BusinessType.친목 },
          ]}
            onChange={(businessType) => {
              handleChange('businessType', businessType)
            }} />
          <SearchInput placeholder="" label="모임 시간대" list={[
            { label: "점심", value: TimeSlot.점심 },
            { label: '저녁', value: TimeSlot.저녁 },
          ]}
            onChange={(timeSlot) => {
              handleChange('timeSlot', timeSlot)
            }} />
        </div>
        <div className="flex justify-between items-center gap-4 mt-8">
          <RadioGroup
            label="룸 여부"
            options={[
              { label: '룸 가능', value: true },
              { label: '룸 불가능', value: false }
            ]}
            value={form.room}
            onChange={(value) => {
              handleChange('room', value)
            }} />
          <RadioGroup
            label="주차 여부"
            options={[
              { label: '주차 가능', value: true },
              { label: '주차 불가능', value: false }
            ]}
            value={form.parking}
            onChange={(value) => {
              handleChange('parking', value)
            }} />
        </div>
      </div>

      <div className="flex justify-end mt-8">
        <button disabled={isLoading} onClick={handleSubmit} className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg">추천받기</button>
      </div>
    </section>
  )
}

export default RecommendForm