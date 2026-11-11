
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CarFront,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  ShieldCheck,
  MapPin,
  Users,
  Sparkles,
  CircleCheck,
  KeyRound,
} from "lucide-react";

const LoginPassword = ({ value, onChange }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-[#28332D]">
        Password
      </label>

      <div className="relative">
        <LockKeyhole
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8FAF9A]"
        />

        <input
          type={visible ? "text" : "password"}
          name="password"
          value={value}
          onChange={onChange}
          placeholder="Enter your password"
          className="w-full rounded-xl border border-[#DCE3DC] bg-[#FAFBF9] py-4 pl-11 pr-12 text-sm outline-none transition placeholder:text-[#A4AAA4] focus:border-[#8FAF9A] focus:ring-4 focus:ring-[#8FAF9A]/15"
        />

        <button
          type="button"
          onClick={() => setVisible(!visible)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-[#788078] hover:text-[#28332D]"
        >
          {visible ? <EyeOff size={19} /> : <Eye size={19} />}
        </button>
      </div>
    </div>
  );
};

const Login = () => {
  const [remember, setRemember] = useState(false);
  const [loginData, setLoginData] = useState({
    emailOrMobile: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const registeredUsers = JSON.parse(localStorage.getItem("shareAuto-registeredUser")) || [];
    const currentUser = registeredUsers.find((user) =>
      (user.email === loginData.emailOrMobile ||
          user.mobileNumber === loginData.emailOrMobile) &&
        user.password === loginData.password
    );

    if (currentUser) {
      localStorage.setItem("shareAuto-actvieUser", JSON.stringify(currentUser));
      navigate("/dashboard");
    } else {
      alert("Email/mobile number or password is incorrect.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F5F0] p-3 sm:p-6 lg:p-8">

      <div className="mx-auto flex min-h-[calc(100vh-48px)] max-w-7xl overflow-hidden rounded-[28px] bg-white shadow-[0_20px_70px_rgba(40,51,45,0.10)]">

        {/* LEFT IMAGE PANEL */}
        <aside className="relative hidden w-[42%] flex-col justify-between overflow-hidden bg-[#28332D] p-10 text-white lg:flex xl:p-14">

          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.pexels.com/photos/19159279/pexels-photo-19159279/free-photo-of-indian-man-driving-a-yellow-car.png?auto=compress&dpr=1&h=750&w=1260')",
            }}
          />

          {/* Dark Green Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#18251F]/85 via-[#28332D]/65 to-[#18251F]/95" />

          {/* Extra Green Tint */}
          <div className="absolute inset-0 bg-[#28332D]/20" />

          {/* Decorative circles */}
          <div className="absolute -right-32 top-20 h-80 w-80 rounded-full border border-white/15" />
          <div className="absolute -right-20 top-32 h-56 w-56 rounded-full border border-white/15" />

          {/* Logo */}
          <div className="relative z-10">
            <Link to="/" className="inline-flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#8FAF9A] text-[#28332D]">
                <CarFront size={27} />
              </div>

              <div>
                <h1 className="text-2xl font-bold tracking-tight">
                  Share<span className="text-[#8FAF9A]">Auto</span>
                </h1>
                <p className="text-[9px] font-semibold tracking-[4px] text-[#C5D6C9]">
                  SHARE · RIDE · GO
                </p>
              </div>
            </Link>
          </div>

          {/* Branding Content */}
          <div className="relative z-10 my-12">

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#8FAF9A]/40 bg-[#28332D]/50 px-4 py-2 text-xs font-medium text-[#D5E5D8] backdrop-blur-md">
              <Sparkles size={14} />
              WELCOME TO SHAREAUTO
            </div>

            <h2 className="mb-6 font-serif text-4xl font-bold leading-[1.2] xl:text-5xl">
              Every Journey
              <br />
              Begins With
              <br />
              <span className="text-[#A9C6AE]">
                A Connection.
              </span>
            </h2>

            <p className="max-w-sm text-sm leading-7 text-[#F0F3ED]">
              Your everyday commute just got easier.
              Sign in to book rides, manage your travel
              passes and stay connected with Chennai.
            </p>

            {/* Feature Cards */}
            <div className="mt-10 space-y-4">

              <div className="flex items-center gap-4 rounded-2xl border border-white/15 bg-[#28332D]/55 p-4 backdrop-blur-md">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#8FAF9A]/25 text-[#D5E5D8]">
                  <MapPin size={22} />
                </div>

                <div>
                  <h3 className="text-sm font-semibold">
                    Explore Your Routes
                  </h3>
                  <p className="mt-1 text-xs text-[#E0E8DF]">
                    Find convenient rides across Chennai.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-2xl border border-white/15 bg-[#28332D]/55 p-4 backdrop-blur-md">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#8FAF9A]/25 text-[#D5E5D8]">
                  <Users size={22} />
                </div>

                <div>
                  <h3 className="text-sm font-semibold">
                    One Connected Community
                  </h3>
                  <p className="mt-1 text-xs text-[#E0E8DF]">
                    Passengers and drivers, together.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-2xl border border-white/15 bg-[#28332D]/55 p-4 backdrop-blur-md">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#8FAF9A]/25 text-[#D5E5D8]">
                  <ShieldCheck size={22} />
                </div>

                <div>
                  <h3 className="text-sm font-semibold">
                    Simple & Convenient
                  </h3>
                  <p className="mt-1 text-xs text-[#E0E8DF]">
                    Your travel essentials in one place.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Footer */}
          <div className="relative z-10 border-t border-white/20 pt-6">
            <p className="text-xs text-[#E0E8DF]">
              © 2026 ShareAuto Chennai. All rights reserved.
            </p>
          </div>

        </aside>

        {/* RIGHT LOGIN PANEL */}
        <main className="flex flex-1 flex-col bg-[#F6F5F0]">

          {/* Header */}
          <header className="flex items-center justify-between border-b border-[#E5E8E1] px-6 py-5 sm:px-10">

            <Link
              to="/"
              className="flex items-center gap-2 text-sm font-semibold text-[#28332D] transition hover:text-[#8FAF9A]"
            >
              <ArrowLeft size={17} />
              Back to Home
            </Link>

            <div className="flex items-center gap-2 text-xs font-medium text-[#788078]">
              <ShieldCheck size={16} className="text-[#8FAF9A]" />
              Secure Login
            </div>

          </header>

          {/* Login Content */}
          <div className="flex flex-1 items-center justify-center px-5 py-12 sm:px-10">

            <div className="w-full max-w-[440px]">

              {/* Login Heading */}
              <div className="mb-9">

                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E5EDE6] text-[#526C59]">
                  <KeyRound size={27} />
                </div>

                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#E5EDE6] px-3 py-1.5 text-[11px] font-bold tracking-wider text-[#526C59]">
                  <CircleCheck size={13} />
                  YOUR ACCOUNT AWAITS
                </div>

                <h2 className="font-serif text-4xl font-bold tracking-tight text-[#28332D]">
                  Welcome Back!
                </h2>

                <p className="mt-3 text-sm leading-6 text-[#788078]">
                  Sign in to continue your journey with
                  ShareAuto Chennai.
                </p>

              </div>

              {/* Login Form */}
              <form className="space-y-6" onSubmit={handleSubmit}>

                {/* Email / Mobile */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-[#28332D]">
                    Email or Mobile Number
                  </label>

                  <div className="relative">
                    <Mail
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8FAF9A]"
                    />

                    <input
                      type="text"
                      name="emailOrMobile"
                      value={loginData.emailOrMobile}
                      onChange={handleChange}
                      placeholder="Enter email or mobile number"
                      className="w-full rounded-xl border border-[#DCE3DC] bg-[#FAFBF9] py-4 pl-11 pr-4 text-sm outline-none transition placeholder:text-[#A4AAA4] focus:border-[#8FAF9A] focus:ring-4 focus:ring-[#8FAF9A]/15"
                    />
                  </div>
                </div>

                {/* Password */}
                <LoginPassword
                  value={loginData.password}
                  onChange={handleChange}
                />

                {/* Remember Me / Forgot Password */}
                <div className="flex flex-wrap items-center justify-between gap-3">

                  <label className="flex cursor-pointer items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={remember}
                      onChange={(e) => setRemember(e.target.checked)}
                      className="h-4 w-4 rounded accent-[#526C59]"
                    />

                    <span className="text-sm text-[#788078]">
                      Remember me
                    </span>
                  </label>

                  <Link
                    to="/forgot-password"
                    className="text-sm font-semibold text-[#526C59] transition hover:text-[#28332D] hover:underline"
                  >
                    Forgot Password?
                  </Link>

                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  className="group flex w-full items-center justify-center gap-3 rounded-xl bg-[#28332D] py-4 text-sm font-bold tracking-wide text-white shadow-lg shadow-[#28332D]/15 transition duration-300 hover:-translate-y-0.5 hover:bg-[#3B5143] hover:shadow-xl"
                >
                  Sign In to Your Account

                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </button>

              </form>

              {/* Divider */}
              <div className="my-8 flex items-center gap-4">
                <div className="h-px flex-1 bg-[#DCE3DC]" />
                <span className="text-xs font-medium text-[#9AA39A]">
                  NEW TO SHAREAUTO?
                </span>
                <div className="h-px flex-1 bg-[#DCE3DC]" />
              </div>

              {/* Register Link */}
              <div className="rounded-2xl border border-[#DCE3DC] bg-white p-5 text-center">

                <p className="text-sm text-[#788078]">
                  Don't have an account yet?
                </p>

                <Link
                  to="/register"
                  className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-[#526C59] transition hover:text-[#28332D]"
                >
                  Create an Account
                  <ArrowRight size={16} />
                </Link>

              </div>

              {/* Bottom Note */}
              <div className="mt-8 flex items-center justify-center gap-2 text-[11px] text-[#9AA39A]">
                <ShieldCheck size={14} />
                One login for passengers, drivers and administrators.
              </div>

            </div>
          </div>

        </main>
      </div>
    </div>
  );
};

export default Login;
