import Register from "./pages/auth/Register";
import LandingPage from "./pages/userPages/LandingPage";
import Navbar from "./components/userComponents/Navbar";



import Dashboard from "./pages/userPages/Dashboard";



function App() {
  return (
    <>
       <Navbar/>
      <LandingPage />
      <Dashboard/>

    </>
  );
}

export default App;
