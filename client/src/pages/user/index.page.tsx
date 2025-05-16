import { useState } from "react"
import InputText from "../../shared/components/InputText"
import Layout from "../../shared/components/Layout"
import Modal from "../../shared/components/Modal"
import Table from "../../shared/components/Table"
import TopNavBar from "../../shared/components/TopNavBar"

const USERS = [
  {
    id: 1,
    name: "최진우",
    role: "과장",
    department: "개발팀",
    age: 32,
  },
  {
    id: 2,
    name: "김정언",
    role: "부장",
    department: "개발팀",
    count: 3,
    age: 23,
  },
  {
    id: 3,
    name: "이수",
    role: "팀장",
    department: "인사팀",
    count: 1,
    age: 26,
  },
]

const RegisterUserModal = ({ open, onClose }: { open: boolean, onClose: () => void }) => {
  const [form, setForm] = useState({
    name: '',
    department: '',
    role: '',
    birthYear: '',
  })

  return <Modal onClose={onClose} open={open}>
    <h1 className="text-xl text-gray-700 mb-4 font-bold">사용자 등록</h1>
    <InputText label="이름" placeholder="홍길동" value={form.name} onChange={value => setForm(prev => ({ ...prev, name: value }))} />
    <div className="mb-4" />
    <InputText label="부서" placeholder="영업부" value={form.department} onChange={value => setForm(prev => ({ ...prev, department: value }))} />
    <div className="mb-4" />
    <InputText label="직급" placeholder="사원" value={form.role} onChange={value => setForm(prev => ({ ...prev, role: value }))} />
    <div className="mb-4" />
    <InputText label="출생년도" placeholder="2000" value={form.birthYear} onChange={value => setForm(prev => ({ ...prev, birthYear: value }))} />
    <div className="mt-8 flex justify-end w-full" >
      <button className="bg-blue-500 text-white px-6 py-1 rounded cursor-pointer">등록</button>
    </div>
  </Modal>
}

const UserPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <TopNavBar />
      <Layout>
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-gray-700 text-xl font-bold">사용자 관리</h1>
          <button className="bg-blue-500 text-white px-2 py-1 rounded cursor-pointer" onClick={() => setIsModalOpen(true)}>사용자 등록</button>
        </div>
        <RegisterUserModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
        <Table columns={[
          { key: 'id', header: 'ID' },
          { key: 'name', header: '이름' },
          { key: 'department', header: '부서' },
          { key: 'role', header: '직급' },
          { key: 'age', header: '나이' },
        ]} data={USERS}></Table>
      </Layout>
    </>
  )
}

export default UserPage