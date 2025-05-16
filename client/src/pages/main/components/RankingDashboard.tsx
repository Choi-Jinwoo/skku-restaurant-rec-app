import { User } from "../../../shared/models";

const USERS = [
  {
    id: 1,
    name: "최진우",
    role: "과장",
    department: "개발팀",
    count: 4,
  },
  {
    id: 2,
    name: "김정언",
    role: "부장",
    department: "개발팀",
    count: 3,
  },
  {
    id: 3,
    name: "이수",
    role: "팀장",
    department: "인사팀",
    count: 1,
  },
]

const RankingDashboard = () => {
  return (
    <div>
      <h1 className="text-gray-700 text-xl mb-4 font-bold">이번 달 프로 참석러</h1>
      <section className="bg-white rounded-lg p-4">
        {USERS.map((user, idx) => (
          <div className={`flex items-center justify-between py-2 ${idx !== USERS.length - 1 ? 'border-b border-gray-100' : ''}`} key={user.id}>
            <span className={idx === 0 ? "text-blue-500 font-bold text-lg" : "text-gray-500 font-bold text-lg"}>
              {idx + 1}등
            </span>
            <p className="text-gray-700 font-bold text-lg">{user.name} <span className="font-normal text-gray-500 text-sm">{user.department}, {user.role}</span></p>
          </div>
        ))}
      </section>
    </div>
  )
}

export default RankingDashboard;
