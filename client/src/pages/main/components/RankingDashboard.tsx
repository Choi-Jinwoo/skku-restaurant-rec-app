import { useEffect, useState } from "react";
import { getUserRank, User } from "../../../remote";

const RankingDashboard = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getUserRank().then(({ data }) => {
      setUsers(data.users)
    })
  }, [])


  return (
    <div>
      <h1 className="text-gray-700 text-xl mb-4 font-bold">이번 달 프로 참석러</h1>
      <section className="bg-white rounded-lg p-4">
        {users.map((user, idx) => (
          <div className={`flex items-center justify-between py-2 ${idx !== users.length - 1 ? 'border-b border-gray-100' : ''}`} key={user.id}>
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
