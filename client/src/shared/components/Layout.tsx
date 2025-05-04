import { PropsWithChildren } from "react";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="px-32 py-8">
      {children}
    </div>
  )
}

export default Layout;