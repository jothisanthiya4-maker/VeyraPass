
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CarFront,
  UserRound,
  Mail,
  Phone,
  LockKeyhole,
  MapPin,
  ShieldCheck,
  UploadCloud,
  FileText,
  Users,
  Sparkles,
  CircleCheck,
} from "lucide-react";

const Register = () => {
  const [role, setRole] = useState("passenger");

  return (
    <div className="min-h-screen bg-[#F6F5F0] p-3 sm:p-6 lg:p-8">

      {/* Main Layout */}
      <div className="mx-auto flex min-h-[calc(100vh-48px)] max-w-7xl overflow-hidden rounded-[28px] bg-white shadow-[0_20px_70px_rgba(40,51,45,0.10)]">

        {/* LEFT BRAND PANEL */}
        <aside className="relative hidden w-[42%] flex-col justify-between overflow-hidden bg-[#28332D] p-10 text-white lg:flex xl:p-14">

          {/* Decorative circles */}
          <div className="absolute -right-32 top-20 h-80 w-80 rounded-full border border-white/10" />
          <div className="absolute -right-20 top-32 h-56 w-56 rounded-full border border-white/10" />
          <div className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-[#8FAF9A]/10 blur-2xl" />

          {/* Logo */}
          <div className="relative z-10">
            <a href="/" className="inline-flex items-center gap-3">
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
            </a>
          </div>

          {/* Branding content */}
          <div className="relative z-10 my-12">

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#8FAF9A]/30 bg-[#8FAF9A]/10 px-4 py-2 text-xs font-medium text-[#C5D6C9]">
              <Sparkles size={14} />
              YOUR CITY, YOUR RIDE
            </div>

            <h2 className="mb-6 font-serif text-4xl font-bold leading-[1.2] xl:text-5xl">
              Your Journey.
              <br />
              Your People.
              <br />
              <span className="text-[#8FAF9A]">
                Your Chennai.
              </span>
            </h2>

            <p className="max-w-sm text-sm leading-7 text-[#C5D6C9]">
              Make everyday travel simpler. Connect with fellow
              commuters, share your ride and discover a smarter
              way to move around Chennai.
            </p>

            {/* Feature cards */}
            <div className="mt-10 space-y-4">

              <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#8FAF9A]/20 text-[#C5D6C9]">
                  <MapPin size={22} />
                </div>

                <div>
                  <h3 className="text-sm font-semibold">
                    Smarter City Connections
                  </h3>
                  <p className="mt-1 text-xs text-[#B6C6B9]">
                    Find shared rides along your route.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#8FAF9A]/20 text-[#C5D6C9]">
                  <ShieldCheck size={22} />
                </div>

                <div>
                  <h3 className="text-sm font-semibold">
                    Travel With Confidence
                  </h3>
                  <p className="mt-1 text-xs text-[#B6C6B9]">
                    A convenient and connected commute.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#8FAF9A]/20 text-[#C5D6C9]">
                  <Users size={22} />
                </div>

                <div>
                  <h3 className="text-sm font-semibold">
                    Ride Together, Save More
                  </h3>
                  <p className="mt-1 text-xs text-[#B6C6B9]">
                    Share journeys with your community.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Footer */}
          <div className="relative z-10 border-t border-white/10 pt-6">
            <p className="text-xs text-[#B6C6B9]">
              © 2026 ShareAuto Chennai. All rights reserved.
            </p>
          </div>
        </aside>

        {/* RIGHT REGISTRATION PANEL */}
        <main className="flex flex-1 flex-col bg-[#F6F5F0]">

          {/* Top navigation */}
          <header className="flex items-center justify-between border-b border-[#E5E8E1] bg-[#F6F5F0] px-6 py-5 sm:px-10">

            <a
              href="/"
              className="flex items-center gap-2 text-sm font-semibold text-[#28332D] transition hover:text-[#8FAF9A]"
            >
              <ArrowLeft size={17} />
              Back to Home
            </a>

            <div className="flex items-center gap-2 text-xs font-medium text-[#788078]">
              <ShieldCheck size={16} className="text-[#8FAF9A]" />
              Secure Registration
            </div>

          </header>

          {/* Form area */}
          <div className="flex flex-1 items-center justify-center px-5 py-10 sm:px-10">

            <div className="w-full max-w-[520px]">

              {/* Heading */}
              <div className="mb-8">

                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#E5EDE6] px-3 py-1.5 text-[11px] font-bold tracking-wider text-[#526C59]">
                  <Sparkles size={13} />
                  JOIN THE COMMUNITY
                </div>

                <h2 className="font-serif text-3xl font-bold tracking-tight text-[#28332D] sm:text-4xl">
                  Create your account
                </h2>

                <p className="mt-3 text-sm leading-6 text-[#788078]">
                  Start your journey with ShareAuto. Register
                  today and experience smarter city travel.
                </p>

              </div>

              {/* Role Selection */}
              <div className="mb-7">

                <label className="mb-3 block text-sm font-semibold text-[#28332D]">
                  I want to join as
                </label>

                <div className="grid grid-cols-2 gap-3">

                  {/* Passenger */}
                  <button
                    type="button"
                    onClick={() => setRole("passenger")}
                    className={`relative flex items-center gap-3 rounded-2xl border p-4 text-left transition duration-200 ${
                      role === "passenger"
                        ? "border-[#8FAF9A] bg-[#E5EDE6] shadow-[0_4px_15px_rgba(143,175,154,0.15)]"
                        : "border-[#DCE3DC] bg-white hover:border-[#8FAF9A]"
                    }`}
                  >

                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                        role === "passenger"
                          ? "bg-[#28332D] text-white"
                          : "bg-[#F0F2ED] text-[#788078]"
                      }`}
                    >
                      <UserRound size={21} />
                    </div>

                    <div>
                      <p className="text-sm font-bold text-[#28332D]">
                        Passenger
                      </p>
                      <p className="mt-1 text-[10px] text-[#788078]">
                        Book your rides
                      </p>
                    </div>

                    {role === "passenger" && (
                      <CircleCheck
                        size={18}
                        className="absolute right-3 top-3 text-[#526C59]"
                      />
                    )}

                  </button>

                  {/* Driver */}
                  <button
                    type="button"
                    onClick={() => setRole("driver")}
                    className={`relative flex items-center gap-3 rounded-2xl border p-4 text-left transition duration-200 ${
                      role === "driver"
                        ? "border-[#8FAF9A] bg-[#E5EDE6] shadow-[0_4px_15px_rgba(143,175,154,0.15)]"
                        : "border-[#DCE3DC] bg-white hover:border-[#8FAF9A]"
                    }`}
                  >

                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                        role === "driver"
                          ? "bg-[#28332D] text-white"
                          : "bg-[#F0F2ED] text-[#788078]"
                      }`}
                    >
                      <CarFront size={22} />
                    </div>

                    <div>
                      <p className="text-sm font-bold text-[#28332D]">
                        Driver
                      </p>
                      <p className="mt-1 text-[10px] text-[#788078]">
                        Offer your rides
                      </p>
                    </div>

                    {role === "driver" && (
                      <CircleCheck
                        size={18}
                        className="absolute right-3 top-3 text-[#526C59]"
                      />
                    )}

                  </button>

                </div>
              </div>

              {/* Registration Form */}
              <form className="space-y-5">

                {/* Common Details */}
                <div className="grid gap-5 sm:grid-cols-2">

                  {/* Full Name */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#28332D]">
                      Full Name
                    </label>

                    <div className="relative">
                      <UserRound
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8FAF9A]"
                      />

                      <input
                        type="text"
                        placeholder="Enter your full name"
                        className="w-full rounded-xl border border-[#DCE3DC] bg-[#FAFBF9] py-3.5 pl-11 pr-4 text-sm outline-none transition placeholder:text-[#A4AAA4] focus:border-[#8FAF9A] focus:ring-4 focus:ring-[#8FAF9A]/15"
                      />
                    </div>
                  </div>

                  {/* Mobile Number */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#28332D]">
                      Mobile Number
                    </label>

                    <div className="relative">
                      <Phone
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8FAF9A]"
                      />

                      <input
                        type="tel"
                        placeholder="+91 00000 00000"
                        className="w-full rounded-xl border border-[#DCE3DC] bg-[#FAFBF9] py-3.5 pl-11 pr-4 text-sm outline-none transition placeholder:text-[#A4AAA4] focus:border-[#8FAF9A] focus:ring-4 focus:ring-[#8FAF9A]/15"
                      />
                    </div>
                  </div>

                </div>

                {/* Email Address */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-[#28332D]">
                    Email Address
                  </label>

                  <div className="relative">
                    <Mail
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8FAF9A]"
                    />

                    <input
                      type="email"
                      placeholder="you@example.com"
                      className="w-full rounded-xl border border-[#DCE3DC] bg-[#FAFBF9] py-3.5 pl-11 pr-4 text-sm outline-none transition placeholder:text-[#A4AAA4] focus:border-[#8FAF9A] focus:ring-4 focus:ring-[#8FAF9A]/15"
                    />
                  </div>
                </div>

                {/* Password Fields */}
                <div className="grid gap-5 sm:grid-cols-2">

                  {/* Password */}
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
                        type="password"
                        placeholder="Create password"
                        className="w-full rounded-xl border border-[#DCE3DC] bg-[#FAFBF9] py-3.5 pl-11 pr-4 text-sm outline-none transition placeholder:text-[#A4AAA4] focus:border-[#8FAF9A] focus:ring-4 focus:ring-[#8FAF9A]/15"
                      />
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#28332D]">
                      Confirm Password
                    </label>

                    <div className="relative">
                      <LockKeyhole
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8FAF9A]"
                      />

                      <input
                        type="password"
                        placeholder="Re-enter password"
                        className="w-full rounded-xl border border-[#DCE3DC] bg-[#FAFBF9] py-3.5 pl-11 pr-4 text-sm outline-none transition placeholder:text-[#A4AAA4] focus:border-[#8FAF9A] focus:ring-4 focus:ring-[#8FAF9A]/15"
                      />
                    </div>
                  </div>

                </div>

                {/* Driver-only details */}
                {role === "driver" && (
                  <div className="space-y-5 border-t border-[#DCE3DC] pt-6">

                    <div>
                      <h3 className="font-serif text-xl font-bold text-[#28332D]">
                        Vehicle Information
                      </h3>

                      <p className="mt-1 text-xs text-[#788078]">
                        Provide your driving and vehicle details.
                      </p>
                    </div>

                    {/* Driving Licence Number */}
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-[#28332D]">
                        Driving Licence Number
                      </label>

                      <div className="relative">
                        <FileText
                          size={18}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8FAF9A]"
                        />

                        <input
                          type="text"
                          placeholder="Enter licence number"
                          className="w-full rounded-xl border border-[#DCE3DC] bg-[#FAFBF9] py-3.5 pl-11 pr-4 text-sm outline-none transition placeholder:text-[#A4AAA4] focus:border-[#8FAF9A] focus:ring-4 focus:ring-[#8FAF9A]/15"
                        />
                      </div>
                    </div>

                    {/* Vehicle Registration Number */}
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-[#28332D]">
                        Vehicle Registration Number
                      </label>

                      <div className="relative">
                        <CarFront
                          size={18}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8FAF9A]"
                        />

                        <input
                          type="text"
                          placeholder="TN 00 AB 0000"
                          className="w-full rounded-xl border border-[#DCE3DC] bg-[#FAFBF9] py-3.5 pl-11 pr-4 text-sm outline-none transition placeholder:text-[#A4AAA4] focus:border-[#8FAF9A] focus:ring-4 focus:ring-[#8FAF9A]/15"
                        />
                      </div>
                    </div>

                    {/* Vehicle Model and Type */}
                    <div className="grid gap-5 sm:grid-cols-2">

                      {/* Vehicle Model */}
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-[#28332D]">
                          Vehicle Model
                        </label>

                        <div className="relative">
                          <CarFront
                            size={18}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8FAF9A]"
                          />

                          <input
                            type="text"
                            placeholder="e.g. Bajaj RE"
                            className="w-full rounded-xl border border-[#DCE3DC] bg-[#FAFBF9] py-3.5 pl-11 pr-4 text-sm outline-none transition placeholder:text-[#A4AAA4] focus:border-[#8FAF9A] focus:ring-4 focus:ring-[#8FAF9A]/15"
                          />
                        </div>
                      </div>

                      {/* Vehicle Type */}
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-[#28332D]">
                          Vehicle Type
                        </label>

                        <select className="w-full rounded-xl border border-[#DCE3DC] bg-[#FAFBF9] px-4 py-3.5 text-sm text-[#788078] outline-none focus:border-[#8FAF9A] focus:ring-4 focus:ring-[#8FAF9A]/15">
                          <option value="">Select vehicle</option>
                          <option value="auto">Auto Rickshaw</option>
                          <option value="electric">Electric Auto</option>
                        </select>
                      </div>

                    </div>

                    {/* Seating Capacity */}
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-[#28332D]">
                        Seating Capacity
                      </label>

                      <div className="relative">
                        <Users
                          size={18}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8FAF9A]"
                        />

                        <select className="w-full rounded-xl border border-[#DCE3DC] bg-[#FAFBF9] py-3.5 pl-11 pr-4 text-sm text-[#788078] outline-none focus:border-[#8FAF9A] focus:ring-4 focus:ring-[#8FAF9A]/15">
                          <option value="">Select capacity</option>
                          <option value="3">3 Seats</option>
                          <option value="4">4 Seats</option>
                          <option value="5">5 Seats</option>
                        </select>
                      </div>
                    </div>

                    {/* Document Upload */}
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#28332D]">
                        Upload Documents
                      </label>

                      <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#B7CABB] bg-[#E5EDE6]/50 px-5 py-7 text-center transition hover:border-[#8FAF9A] hover:bg-[#E5EDE6]">

                        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#526C59] shadow-sm">
                          <UploadCloud size={24} />
                        </div>

                        <p className="text-sm font-semibold text-[#28332D]">
                          Click to upload documents
                        </p>

                        <p className="mt-2 text-xs text-[#788078]">
                          Driving Licence and Vehicle RC
                        </p>

                        <p className="mt-1 text-[10px] text-[#9AA39A]">
                          PDF, JPG or PNG
                        </p>

                        <input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          multiple
                          className="hidden"
                        />

                      </label>
                    </div>

                  </div>
                )}

                {/* Terms and Conditions */}
                <label className="flex cursor-pointer items-start gap-3 pt-1">

                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4 accent-[#526C59]"
                  />

                  <span className="text-xs leading-6 text-[#788078]">
                    I agree to the{" "}
                    <a
                      href="#"
                      className="font-semibold text-[#526C59] underline"
                    >
                      Terms & Conditions
                    </a>{" "}
                    and{" "}
                    <a
                      href="#"
                      className="font-semibold text-[#526C59] underline"
                    >
                      Privacy Policy
                    </a>.
                  </span>

                </label>

                {/* Submit Button */}
                <button
                  type="button"
                  className="group flex w-full items-center justify-center gap-3 rounded-xl bg-[#28332D] py-4 text-sm font-bold tracking-wide text-white shadow-lg shadow-[#28332D]/15 transition duration-300 hover:-translate-y-0.5 hover:bg-[#3B5143] hover:shadow-xl"
                >
                  Create Account

                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </button>

              </form>

              {/* Login */}
              <p className="mt-7 text-center text-sm text-[#788078]">
                Already have an account?{" "}

                <a
                  href="/login"
                  className="font-bold text-[#526C59] underline-offset-4 hover:underline"
                >
                  Sign in
                </a>
              </p>

              {/* Footer */}
              <div className="mt-8 flex items-center justify-center gap-2 border-t border-[#E5E8E1] pt-5 text-[11px] text-[#9AA39A]">
                <ShieldCheck size={14} />
                Your journey begins with a simple registration.
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Register;
