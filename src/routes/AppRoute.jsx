import { Route, Routes } from "react-router-dom";
import NavLayout from "../layouts/NavLayout";
import LandingPage from "../pages/userPages/LandingPage";
import Dashboard from "../pages/userPages/Dashboard";
import PassPage from "../pages/userPages/PassPage";
import RideDetails from "../pages/userPages/RideDetails";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

const AppRoute = () => {
  return (
    <Routes>
      <Route element={<NavLayout />}>
        <Route path="/" element={<LandingPage />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/pass" element={<PassPage />} />
      <Route path="/ride-details" element={<RideDetails />} />
    </Routes>
  )
}

export default AppRoute
