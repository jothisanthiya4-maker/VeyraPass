import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import DriverVerification from "./pages/driverPages/DriverVerification";
import LandingPage from "./pages/userPages/LandingPage";
import { Routes, Route } from "react-router-dom";

import { BookingProvider } from "./components/context/BookingContext";
import Dashboard from "./pages/userPages/Dashboard";



function App() {
  return (
    <>
      <LandingPage />
      <Dashboard/>

    </>
  );
}

export default App;
