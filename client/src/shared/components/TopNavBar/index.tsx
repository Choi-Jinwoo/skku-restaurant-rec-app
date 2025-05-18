import { useNavigate } from "react-router";

const MENUS = [
  { name: '메인', link: '/' },
  { name: '사용자 관리', link: '/user' },
  { name: '리뷰 관리', link: '/review' },
  { name: '기타', link: '/etc' },
]

const TopNavBar = () => {
  const currentRoute = location.pathname;
  const navigate = useNavigate();

  return (
    <nav className="flex bg-white shadow-sm py-4 px-32 align-center">
      <div className="mr-32">
        <span>
          오늘 어디?
        </span>
      </div>
      <div className="flex gap-16 text-gray-700">
        {MENUS.map((menu, index) => (
          <div
            key={index}
            onClick={() => {
              navigate(menu.link)
            }}
            className={`cursor-pointer ${currentRoute === menu.link ? 'text-blue-500 ' : ''}`}>
            {menu.name}
          </div>
        ))}
      </div>
    </nav>
  )
}

export default TopNavBar;