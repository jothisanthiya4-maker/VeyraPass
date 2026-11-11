import { ArrowUpRight, CarFront, Menu } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="sticky top-0 z-50 border-b border-[#DCE3DC] bg-[#F6F5F0]/95 backdrop-blur-md">
    <div className="max-w-7xl mx-auto px-5 lg:px-10 h-20 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-2xl bg-[#28332D] flex items-center justify-center shadow-lg">
          <CarFront size={25} className="text-[#C5D6C9]" />
        </div>
        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-[#28332D]">
            Share<span className="text-[#8FAF9A]">Auto</span>
          </h1>
          <p className="text-[10px] font-semibold tracking-[2px] text-[#788078] uppercase">
            Chennai
          </p>
        </div>
      </Link>

      <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-[#788078]">
        <Link to="/" className="text-[#28332D] font-bold">Home</Link>
        <Link to="#about" className="hover:text-[#28332D] transition">About</Link>
        <Link to="#how-it-works" className="hover:text-[#28332D] transition">How It Works</Link>
        <Link to="#features" className="hover:text-[#28332D] transition">Features</Link>
        <Link to="#contact" className="hover:text-[#28332D] transition">Contact</Link>
      </div>

      <div className="flex items-center gap-3">
        <Link to="/login" className="hidden sm:block px-5 py-2.5 text-sm font-bold text-[#28332D] hover:bg-[#E5EDE6] rounded-xl transition">
          Login
        </Link>
        <Link to="/register" className="px-5 py-3 rounded-xl bg-[#28332D] text-white text-sm font-bold hover:bg-[#1E2923] transition shadow-md flex items-center gap-2">
          Get Started
          <ArrowUpRight size={16} />
        </Link>
        <button className="lg:hidden p-2 text-[#28332D]">
          <Menu size={25} />
        </button>
      </div>
    </div>
  </nav>
);

export default Navbar;
