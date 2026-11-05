import { Outlet } from "react-router-dom";
import Navbar from "../components/userComponents/Navbar";

const NavLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

export default NavLayout
