import { Route, Routes } from "react-router-dom";
import NavLayout from "../layouts/NavLayout";
import LandingPage from "../pages/userPages/LandingPage";
import Dashboard from "../pages/userPages/Dashboard";
import PassPage from "../pages/userPages/PassPage";
import RideDetails from "../pages/userPages/RideDetails";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import AvailableAutos from "../pages/userPages/AvailableAutos";
import MyBookings from "../pages/userPages/MyBookings";
import MyPass from "../pages/userPages/MyPass";

const AppRoute = () => {
  return (
    <Routes>
      <Route element={<NavLayout />}>
        <Route path="/" element={<LandingPage />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<Dashboard />}>
        <Route path="/dashboard" element={<LandingPage />} />
        <Route path="/user/available-autos" element={<AvailableAutos />} />
        <Route path="/user/auto-details/:autoId" element={<RideDetails />} />
        <Route path="/pass" element={<PassPage />} />
        <Route path="/my-pass" element={<MyPass />} />
        <Route path="/my-bookings" element={<MyBookings />} />
      </Route>
    </Routes>
  )
}

export default AppRoute
