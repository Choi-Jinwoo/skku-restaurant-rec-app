import { useEffect, useState } from "react";
import { fetchUsers, User } from "../remote";

const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);

  const refetch = () => {
    fetchUsers()
      .then(({ users }) => {
        setUsers(users)
      })
  }

  useEffect(() => {
    fetchUsers()
      .then(({ users }) => {
        setUsers(users)
      })
  }, [])

  return { users, refetch }
}

export default useUsers;
