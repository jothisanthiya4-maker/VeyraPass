
import React from "react";
import {
  ArrowRight,
  ArrowUpRight,
  MapPin,
  Clock,
  Users,
  Wallet,
  CalendarDays,
  Zap,
  ShieldCheck,
  QrCode,
  Bell,
  Route,
  Ticket,
  Smartphone,
  Star,
  CheckCircle2,
//   Facebook,
//   Instagram,
//   Linkedin,
  Mail,
  Phone,
  MapPinned,
  CarFront,
  Navigation,
  CircleDollarSign,
  Headphones,
  ChevronRight,
  MoveRight,
  Sparkles,
} from "lucide-react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#F6F5F0] text-[#28332D] font-sans">

      {/* ================= HERO SECTION ================= */}

      <section className="relative overflow-hidden bg-[#F6F5F0]">

        {/* Background Decorations */}

        <div className="absolute -top-32 -right-20 w-96 h-96 bg-[#C5D6C9]/40 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#E5EDE6] rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-5 lg:px-10 py-16 lg:py-24 grid lg:grid-cols-2 gap-14 items-center">

          {/* Hero Content */}

          <div className="space-y-8">

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E5EDE6] border border-[#C5D6C9] text-[#28332D] text-xs font-bold tracking-wide">
              <Sparkles size={15} className="text-[#8FAF9A]" />
              A Smarter Way to Travel Around Chennai
            </div>

            <div>
              <h1 className="text-5xl sm:text-6xl lg:text-[68px] font-black leading-[1.08] tracking-tight text-[#28332D]">
                Share Your
                <span className="block text-[#8FAF9A]">Route.</span>
                Save Your
                <span className="block">Fare.</span>
              </h1>

              <p className="mt-7 text-base sm:text-lg leading-8 text-[#788078] max-w-xl">
                Your everyday Chennai commute just got smarter. Find people
                travelling your way, share an auto, split the cost, and reach
                your destination comfortably.
              </p>
            </div>

            {/* Hero Buttons */}

            <div className="flex flex-wrap gap-4">
              <a
                href="/register"
                className="px-7 py-4 rounded-2xl bg-[#28332D] text-white font-bold flex items-center gap-3 hover:bg-[#1E2923] transition shadow-lg"
              >
                Find an Auto
                <ArrowRight size={19} />
              </a>

              <a
                href="#how-it-works"
                className="px-7 py-4 rounded-2xl border border-[#C5D6C9] bg-white text-[#28332D] font-bold hover:bg-[#E5EDE6] transition flex items-center gap-2"
              >
                Explore How It Works
                <MoveRight size={18} />
              </a>
            </div>

            {/* Trust Points */}

            <div className="flex flex-wrap items-center gap-6 pt-3">
              <div className="flex items-center gap-2 text-sm text-[#788078]">
                <CheckCircle2 size={18} className="text-[#8FAF9A]" />
                Affordable rides
              </div>

              <div className="flex items-center gap-2 text-sm text-[#788078]">
                <CheckCircle2 size={18} className="text-[#8FAF9A]" />
                Easy booking
              </div>

              <div className="flex items-center gap-2 text-sm text-[#788078]">
                <CheckCircle2 size={18} className="text-[#8FAF9A]" />
                Shared journeys
              </div>
            </div>

          </div>


          {/* Hero Visual */}

          <div className="relative">

            <div className="absolute -top-7 -left-5 w-28 h-28 bg-[#C5D6C9] rounded-full blur-2xl opacity-70" />

            <div className="relative bg-[#28332D] rounded-[35px] p-5 sm:p-7 shadow-2xl overflow-hidden">

              <div className="absolute top-0 right-0 w-64 h-64 bg-[#8FAF9A]/20 rounded-full blur-3xl" />

              <div className="relative flex justify-between items-center mb-6">
                <div>
                  <p className="text-[#C5D6C9] text-xs font-semibold tracking-widest uppercase">
                    Your Daily Commute
                  </p>
                  <h3 className="text-white text-2xl font-bold mt-2">
                    Travel Together.
                  </h3>
                </div>

                <div className="w-12 h-12 rounded-2xl bg-[#8FAF9A]/20 flex items-center justify-center">
                  <Navigation className="text-[#C5D6C9]" size={25} />
                </div>
              </div>

              {/* Auto Image */}

              <div className="relative rounded-3xl overflow-hidden h-64 sm:h-72 bg-[#E5EDE6]">
                <img
                  src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=1000"
                  alt="Urban transportation"
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#1E2923]/80 via-transparent to-transparent" />

                <div className="absolute bottom-5 left-5 text-white">
                  <p className="text-xs text-[#C5D6C9] font-semibold uppercase tracking-widest">
                    Chennai • Shared Mobility
                  </p>
                  <h3 className="text-2xl font-bold mt-1">
                    Every Seat Has a Story.
                  </h3>
                </div>

                <div className="absolute top-4 right-4 bg-white/95 rounded-full px-3 py-2 flex items-center gap-2 text-xs font-bold text-[#28332D]">
                  <span className="w-2 h-2 rounded-full bg-[#8FAF9A]" />
                  Smart Commute
                </div>
              </div>

              {/* Route Card */}

              <div className="relative mt-5 bg-white rounded-2xl p-5">

                <div className="flex justify-between items-center mb-4">
                  <p className="font-bold text-[#28332D]">Sample Route</p>
                  <span className="text-xs font-bold bg-[#E5EDE6] text-[#28332D] px-3 py-1.5 rounded-full">
                    Shared Ride
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-3 h-3 rounded-full border-[3px] border-[#8FAF9A]" />
                    <div className="h-8 border-l-2 border-dashed border-[#C5D6C9]" />
                    <MapPin size={17} className="text-[#28332D]" />
                  </div>

                  <div className="flex-1 space-y-5">
                    <div>
                      <p className="text-[10px] text-[#788078] uppercase font-bold tracking-wider">Pickup</p>
                      <p className="font-bold text-sm text-[#28332D]">Guindy</p>
                    </div>

                    <div>
                      <p className="text-[10px] text-[#788078] uppercase font-bold tracking-wider">Destination</p>
                      <p className="font-bold text-sm text-[#28332D]">Velachery</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-[10px] text-[#788078] font-semibold">Sample fare</p>
                    <p className="text-2xl font-black text-[#28332D]">₹40</p>
                    <p className="text-[10px] text-[#788078]">per passenger</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Floating Card */}

            <div className="absolute -bottom-7 -left-7 hidden sm:flex items-center gap-3 bg-white rounded-2xl p-4 shadow-xl border border-[#DCE3DC]">
              <div className="w-11 h-11 rounded-xl bg-[#E5EDE6] flex items-center justify-center">
                <Wallet size={22} className="text-[#28332D]" />
              </div>
              <div>
                <p className="text-xs text-[#788078]">Travel smarter</p>
                <p className="font-extrabold text-[#28332D]">Share the cost</p>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ================= BOOKING OPTIONS ================= */}

      <section className="py-20 bg-white" id="about">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">

          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-[3px] font-extrabold text-[#8FAF9A]">
              Choose Your Ride
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#28332D] mt-4">
              Your Journey, Your Timing.
            </h2>

            <p className="mt-5 text-[#788078] leading-7">
              Whether you plan ahead or need a ride right now, ShareAuto
              gives you flexible ways to travel around the city.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-7">

            {/* Scheduled Booking */}

            <div className="group relative overflow-hidden rounded-[30px] bg-[#E5EDE6] p-8 sm:p-10 border border-[#DCE3DC] hover:shadow-xl transition duration-300">

              <div className="absolute -right-10 -top-10 w-48 h-48 bg-[#C5D6C9] rounded-full opacity-60 group-hover:scale-125 transition duration-500" />

              <div className="relative">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                  <CalendarDays size={30} className="text-[#28332D]" />
                </div>

                <span className="inline-block mt-7 text-xs font-bold tracking-widest uppercase text-[#788078]">
                  Plan Ahead
                </span>

                <h3 className="text-3xl font-black mt-3 text-[#28332D]">
                  Scheduled Booking
                </h3>

                <p className="mt-4 text-[#788078] leading-7 max-w-md">
                  Got a daily commute or a planned outing? Choose your
                  preferred date and time, find a suitable shared auto,
                  and reserve your seats in advance.
                </p>

                <div className="flex flex-wrap gap-3 mt-6">
                  <span className="px-3 py-2 bg-white rounded-lg text-xs font-bold text-[#28332D]">
                    <Clock size={14} className="inline mr-1" />
                    Choose time
                  </span>
                  <span className="px-3 py-2 bg-white rounded-lg text-xs font-bold text-[#28332D]">
                    <Ticket size={14} className="inline mr-1" />
                    Reserve seats
                  </span>
                </div>

                <a
                  href="/register"
                  className="inline-flex items-center gap-3 mt-9 px-6 py-3.5 rounded-xl bg-[#28332D] text-white font-bold hover:bg-[#1E2923] transition"
                >
                  Schedule a Ride
                  <ArrowRight size={18} />
                </a>
              </div>
            </div>


            {/* Instant Booking */}

            <div className="group relative overflow-hidden rounded-[30px] bg-[#28332D] p-8 sm:p-10 hover:shadow-xl transition duration-300">

              <div className="absolute -right-10 -top-10 w-48 h-48 bg-[#8FAF9A]/20 rounded-full group-hover:scale-125 transition duration-500" />

              <div className="relative">
                <div className="w-16 h-16 bg-[#8FAF9A]/20 rounded-2xl flex items-center justify-center">
                  <Zap size={30} className="text-[#C5D6C9]" />
                </div>

                <span className="inline-block mt-7 text-xs font-bold tracking-widest uppercase text-[#C5D6C9]">
                  Need a Ride Now?
                </span>

                <h3 className="text-3xl font-black mt-3 text-white">
                  Instant Booking
                </h3>

                <p className="mt-4 text-[#C5D6C9] leading-7 max-w-md">
                  Ready to go? Explore autos available for immediate
                  travel, check their routes and available seats, and
                  choose a ride that matches your destination.
                </p>

                <div className="flex flex-wrap gap-3 mt-6">
                  <span className="px-3 py-2 bg-white/10 rounded-lg text-xs font-bold text-white">
                    <MapPin size={14} className="inline mr-1" />
                    Find nearby routes
                  </span>
                  <span className="px-3 py-2 bg-white/10 rounded-lg text-xs font-bold text-white">
                    <Users size={14} className="inline mr-1" />
                    Check seats
                  </span>
                </div>

                <a
                  href="/register"
                  className="inline-flex items-center gap-3 mt-9 px-6 py-3.5 rounded-xl bg-[#C5D6C9] text-[#28332D] font-bold hover:bg-white transition"
                >
                  Find an Available Auto
                  <ArrowRight size={18} />
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ================= HOW IT WORKS ================= */}

      <section id="how-it-works" className="py-20 bg-[#F6F5F0]">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">

          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[3px] font-extrabold text-[#8FAF9A]">
              Simple Process
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mt-4 text-[#28332D]">
              Four Steps. One Smarter Journey.
            </h2>

            <p className="mt-5 text-[#788078] leading-7">
              Booking your next shared auto ride doesn't have to be
              complicated. Get started in just a few simple steps.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {/* Step 1 */}

            <div className="relative bg-white p-7 rounded-3xl border border-[#DCE3DC] hover:-translate-y-2 hover:shadow-xl transition duration-300">
              <div className="flex justify-between items-start">
                <div className="w-14 h-14 bg-[#E5EDE6] rounded-2xl flex items-center justify-center">
                  <MapPin size={26} className="text-[#28332D]" />
                </div>
                <span className="text-4xl font-black text-[#E5EDE6]">01</span>
              </div>

              <h3 className="text-xl font-extrabold mt-7 text-[#28332D]">
                Enter Your Route
              </h3>

              <p className="text-sm text-[#788078] mt-3 leading-7">
                Choose your pickup location and destination to explore
                suitable shared-auto routes.
              </p>
            </div>

            {/* Step 2 */}

            <div className="relative bg-white p-7 rounded-3xl border border-[#DCE3DC] hover:-translate-y-2 hover:shadow-xl transition duration-300">
              <div className="flex justify-between items-start">
                <div className="w-14 h-14 bg-[#E5EDE6] rounded-2xl flex items-center justify-center">
                  <Route size={26} className="text-[#28332D]" />
                </div>
                <span className="text-4xl font-black text-[#E5EDE6]">02</span>
              </div>

              <h3 className="text-xl font-extrabold mt-7 text-[#28332D]">
                Explore Autos
              </h3>

              <p className="text-sm text-[#788078] mt-3 leading-7">
                Discover autos travelling along compatible routes and
                compare their timings and available seats.
              </p>
            </div>

            {/* Step 3 */}

            <div className="relative bg-white p-7 rounded-3xl border border-[#DCE3DC] hover:-translate-y-2 hover:shadow-xl transition duration-300">
              <div className="flex justify-between items-start">
                <div className="w-14 h-14 bg-[#E5EDE6] rounded-2xl flex items-center justify-center">
                  <Ticket size={26} className="text-[#28332D]" />
                </div>
                <span className="text-4xl font-black text-[#E5EDE6]">03</span>
              </div>

              <h3 className="text-xl font-extrabold mt-7 text-[#28332D]">
                Reserve Your Seat
              </h3>

              <p className="text-sm text-[#788078] mt-3 leading-7">
                Select your preferred auto, reserve the required seats,
                and confirm your journey.
              </p>
            </div>

            {/* Step 4 */}

            <div className="relative bg-[#28332D] p-7 rounded-3xl border border-[#28332D] hover:-translate-y-2 hover:shadow-xl transition duration-300">
              <div className="flex justify-between items-start">
                <div className="w-14 h-14 bg-[#8FAF9A]/20 rounded-2xl flex items-center justify-center">
                  <QrCode size={26} className="text-[#C5D6C9]" />
                </div>
                <span className="text-4xl font-black text-white/10">04</span>
              </div>

              <h3 className="text-xl font-extrabold mt-7 text-white">
                Travel with Your Pass
              </h3>

              <p className="text-sm text-[#C5D6C9] mt-3 leading-7">
                Access your digital booking pass and enjoy a convenient
                shared-auto journey.
              </p>
            </div>

          </div>
        </div>
      </section>


      {/* ================= FEATURES ================= */}

      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">

          <div className="flex flex-col lg:flex-row justify-between lg:items-end gap-6 mb-14">
            <div className="max-w-2xl">
              <span className="text-xs uppercase tracking-[3px] font-extrabold text-[#8FAF9A]">
                Why ShareAuto?
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mt-4 text-[#28332D]">
                More Than Just a Ride.
              </h2>

              <p className="mt-5 text-[#788078] leading-7">
                Designed around the way Chennai travels. Everything you
                need for a simple, organised and affordable shared commute.
              </p>
            </div>

            <a
              href="/register"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#28332D] hover:text-[#8FAF9A] transition"
            >
              Start your journey
              <ArrowUpRight size={18} />
            </a>
          </div>


          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">

            {/* Feature 1 */}

            <div className="p-7 rounded-3xl bg-[#F6F5F0] border border-[#DCE3DC] hover:border-[#8FAF9A] hover:shadow-lg transition">
              <div className="w-13 h-13 w-[52px] h-[52px] bg-[#E5EDE6] rounded-2xl flex items-center justify-center">
                <Route size={25} className="text-[#28332D]" />
              </div>
              <h3 className="font-extrabold text-lg mt-6">Smart Route Matching</h3>
              <p className="text-sm text-[#788078] leading-7 mt-3">
                Find autos travelling along routes that match your pickup
                and destination.
              </p>
            </div>

            {/* Feature 2 */}

            <div className="p-7 rounded-3xl bg-[#F6F5F0] border border-[#DCE3DC] hover:border-[#8FAF9A] hover:shadow-lg transition">
              <div className="w-[52px] h-[52px] bg-[#E5EDE6] rounded-2xl flex items-center justify-center">
                <CircleDollarSign size={25} className="text-[#28332D]" />
              </div>
              <h3 className="font-extrabold text-lg mt-6">Affordable Travel</h3>
              <p className="text-sm text-[#788078] leading-7 mt-3">
                Share the journey with other passengers and make everyday
                travel more economical.
              </p>
            </div>

            {/* Feature 3 */}

            <div className="p-7 rounded-3xl bg-[#F6F5F0] border border-[#DCE3DC] hover:border-[#8FAF9A] hover:shadow-lg transition">
              <div className="w-[52px] h-[52px] bg-[#E5EDE6] rounded-2xl flex items-center justify-center">
                <CalendarDays size={25} className="text-[#28332D]" />
              </div>
              <h3 className="font-extrabold text-lg mt-6">Flexible Scheduling</h3>
              <p className="text-sm text-[#788078] leading-7 mt-3">
                Plan your commute in advance with a preferred date and
                time for scheduled bookings.
              </p>
            </div>

            {/* Feature 4 */}

            <div className="p-7 rounded-3xl bg-[#F6F5F0] border border-[#DCE3DC] hover:border-[#8FAF9A] hover:shadow-lg transition">
              <div className="w-[52px] h-[52px] bg-[#E5EDE6] rounded-2xl flex items-center justify-center">
                <Zap size={25} className="text-[#28332D]" />
              </div>
              <h3 className="font-extrabold text-lg mt-6">Instant Booking</h3>
              <p className="text-sm text-[#788078] leading-7 mt-3">
                Find available autos for immediate travel without
                planning your ride in advance.
              </p>
            </div>

            {/* Feature 5 */}

            <div className="p-7 rounded-3xl bg-[#F6F5F0] border border-[#DCE3DC] hover:border-[#8FAF9A] hover:shadow-lg transition">
              <div className="w-[52px] h-[52px] bg-[#E5EDE6] rounded-2xl flex items-center justify-center">
                <QrCode size={25} className="text-[#28332D]" />
              </div>
              <h3 className="font-extrabold text-lg mt-6">Digital QR Pass</h3>
              <p className="text-sm text-[#788078] leading-7 mt-3">
                Keep your booking details accessible through a digital
                pass for a convenient travel experience.
              </p>
            </div>

            {/* Feature 6 */}

            <div className="p-7 rounded-3xl bg-[#F6F5F0] border border-[#DCE3DC] hover:border-[#8FAF9A] hover:shadow-lg transition">
              <div className="w-[52px] h-[52px] bg-[#E5EDE6] rounded-2xl flex items-center justify-center">
                <Ticket size={25} className="text-[#28332D]" />
              </div>
              <h3 className="font-extrabold text-lg mt-6">Booking Management</h3>
              <p className="text-sm text-[#788078] leading-7 mt-3">
                View upcoming journeys, booking details and previous
                travel records in one place.
              </p>
            </div>

            {/* Feature 7 */}

            <div className="p-7 rounded-3xl bg-[#F6F5F0] border border-[#DCE3DC] hover:border-[#8FAF9A] hover:shadow-lg transition">
              <div className="w-[52px] h-[52px] bg-[#E5EDE6] rounded-2xl flex items-center justify-center">
                <Bell size={25} className="text-[#28332D]" />
              </div>
              <h3 className="font-extrabold text-lg mt-6">Travel Notifications</h3>
              <p className="text-sm text-[#788078] leading-7 mt-3">
                Stay informed about booking confirmations, ride updates
                and important travel notifications.
              </p>
            </div>

            {/* Feature 8 */}

            <div className="p-7 rounded-3xl bg-[#F6F5F0] border border-[#DCE3DC] hover:border-[#8FAF9A] hover:shadow-lg transition">
              <div className="w-[52px] h-[52px] bg-[#E5EDE6] rounded-2xl flex items-center justify-center">
                <ShieldCheck size={25} className="text-[#28332D]" />
              </div>
              <h3 className="font-extrabold text-lg mt-6">Passenger Safety</h3>
              <p className="text-sm text-[#788078] leading-7 mt-3">
                Access driver and vehicle information to help passengers
                make informed booking decisions.
              </p>
            </div>

          </div>
        </div>
      </section>


      {/* ================= POPULAR ROUTES ================= */}

      <section className="py-20 bg-[#F6F5F0]">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">

          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-[3px] font-extrabold text-[#8FAF9A]">
              Explore Chennai
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mt-4 text-[#28332D]">
              Routes That Keep You Moving.
            </h2>

            <p className="mt-5 text-[#788078] leading-7">
              Explore some example routes across Chennai and discover
              convenient ways to share your everyday commute.
            </p>
          </div>


          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* Route 1 */}

            <div className="bg-white rounded-3xl p-6 border border-[#DCE3DC] hover:shadow-xl transition">
              <div className="flex justify-between items-center">
                <div className="w-12 h-12 rounded-2xl bg-[#E5EDE6] flex items-center justify-center">
                  <MapPinned size={23} className="text-[#28332D]" />
                </div>
                <span className="text-xs bg-[#E5EDE6] text-[#28332D] px-3 py-1.5 rounded-full font-bold">
                  Sample Route
                </span>
              </div>

              <div className="flex items-center gap-3 mt-7">
                <div>
                  <p className="text-xs text-[#788078]">From</p>
                  <h3 className="font-extrabold text-lg">Guindy</h3>
                </div>
                <ArrowRight size={19} className="text-[#8FAF9A] mt-3" />
                <div>
                  <p className="text-xs text-[#788078]">To</p>
                  <h3 className="font-extrabold text-lg">Velachery</h3>
                </div>
              </div>

              <div className="border-t border-[#DCE3DC] mt-6 pt-5 flex justify-between items-center">
                <span className="text-xs text-[#788078]">Illustrative fare</span>
                <span className="font-black text-xl text-[#28332D]">₹30–₹50</span>
              </div>
            </div>


            {/* Route 2 */}

            <div className="bg-white rounded-3xl p-6 border border-[#DCE3DC] hover:shadow-xl transition">
              <div className="flex justify-between items-center">
                <div className="w-12 h-12 rounded-2xl bg-[#E5EDE6] flex items-center justify-center">
                  <MapPinned size={23} className="text-[#28332D]" />
                </div>
                <span className="text-xs bg-[#E5EDE6] text-[#28332D] px-3 py-1.5 rounded-full font-bold">
                  Sample Route
                </span>
              </div>

              <div className="flex items-center gap-3 mt-7">
                <div>
                  <p className="text-xs text-[#788078]">From</p>
                  <h3 className="font-extrabold text-lg">Ekkattuthangal</h3>
                </div>
                <ArrowRight size={19} className="text-[#8FAF9A] mt-3" />
                <div>
                  <p className="text-xs text-[#788078]">To</p>
                  <h3 className="font-extrabold text-lg">Saidapet</h3>
                </div>
              </div>

              <div className="border-t border-[#DCE3DC] mt-6 pt-5 flex justify-between items-center">
                <span className="text-xs text-[#788078]">Illustrative fare</span>
                <span className="font-black text-xl text-[#28332D]">₹25–₹40</span>
              </div>
            </div>


            {/* Route 3 */}

            <div className="bg-white rounded-3xl p-6 border border-[#DCE3DC] hover:shadow-xl transition">
              <div className="flex justify-between items-center">
                <div className="w-12 h-12 rounded-2xl bg-[#E5EDE6] flex items-center justify-center">
                  <MapPinned size={23} className="text-[#28332D]" />
                </div>
                <span className="text-xs bg-[#E5EDE6] text-[#28332D] px-3 py-1.5 rounded-full font-bold">
                  Sample Route
                </span>
              </div>

              <div className="flex items-center gap-3 mt-7">
                <div>
                  <p className="text-xs text-[#788078]">From</p>
                  <h3 className="font-extrabold text-lg">Ashok Nagar</h3>
                </div>
                <ArrowRight size={19} className="text-[#8FAF9A] mt-3" />
                <div>
                  <p className="text-xs text-[#788078]">To</p>
                  <h3 className="font-extrabold text-lg">T Nagar</h3>
                </div>
              </div>

              <div className="border-t border-[#DCE3DC] mt-6 pt-5 flex justify-between items-center">
                <span className="text-xs text-[#788078]">Illustrative fare</span>
                <span className="font-black text-xl text-[#28332D]">₹20–₹35</span>
              </div>
            </div>


            {/* Route 4 */}

            <div className="bg-white rounded-3xl p-6 border border-[#DCE3DC] hover:shadow-xl transition">
              <div className="flex justify-between items-center">
                <div className="w-12 h-12 rounded-2xl bg-[#E5EDE6] flex items-center justify-center">
                  <MapPinned size={23} className="text-[#28332D]" />
                </div>
                <span className="text-xs bg-[#E5EDE6] text-[#28332D] px-3 py-1.5 rounded-full font-bold">
                  Sample Route
                </span>
              </div>

              <div className="flex items-center gap-3 mt-7">
                <div>
                  <p className="text-xs text-[#788078]">From</p>
                  <h3 className="font-extrabold text-lg">Little Mount</h3>
                </div>
                <ArrowRight size={19} className="text-[#8FAF9A] mt-3" />
                <div>
                  <p className="text-xs text-[#788078]">To</p>
                  <h3 className="font-extrabold text-lg">Adyar</h3>
                </div>
              </div>

              <div className="border-t border-[#DCE3DC] mt-6 pt-5 flex justify-between items-center">
                <span className="text-xs text-[#788078]">Illustrative fare</span>
                <span className="font-black text-xl text-[#28332D]">₹30–₹50</span>
              </div>
            </div>


            {/* Route 5 */}

            <div className="bg-white rounded-3xl p-6 border border-[#DCE3DC] hover:shadow-xl transition">
              <div className="flex justify-between items-center">
                <div className="w-12 h-12 rounded-2xl bg-[#E5EDE6] flex items-center justify-center">
                  <MapPinned size={23} className="text-[#28332D]" />
                </div>
                <span className="text-xs bg-[#E5EDE6] text-[#28332D] px-3 py-1.5 rounded-full font-bold">
                  Sample Route
                </span>
              </div>

              <div className="flex items-center gap-3 mt-7">
                <div>
                  <p className="text-xs text-[#788078]">From</p>
                  <h3 className="font-extrabold text-lg">Vadapalani</h3>
                </div>
                <ArrowRight size={19} className="text-[#8FAF9A] mt-3" />
                <div>
                  <p className="text-xs text-[#788078]">To</p>
                  <h3 className="font-extrabold text-lg">Koyambedu</h3>
                </div>
              </div>

              <div className="border-t border-[#DCE3DC] mt-6 pt-5 flex justify-between items-center">
                <span className="text-xs text-[#788078]">Illustrative fare</span>
                <span className="font-black text-xl text-[#28332D]">₹20–₹35</span>
              </div>
            </div>


            {/* Explore More */}

            <div className="bg-[#28332D] rounded-3xl p-7 flex flex-col justify-between text-white">
              <div>
                <div className="w-12 h-12 bg-[#8FAF9A]/20 rounded-2xl flex items-center justify-center">
                  <Navigation size={24} className="text-[#C5D6C9]" />
                </div>

                <h3 className="text-2xl font-black mt-7">
                  Your Route Could Be Next.
                </h3>

                <p className="text-sm text-[#C5D6C9] mt-3 leading-7">
                  Explore available autos and find a shared journey that
                  works for your destination.
                </p>
              </div>

              <a
                href="/register"
                className="mt-7 flex items-center justify-between bg-[#C5D6C9] text-[#28332D] rounded-xl px-5 py-4 font-bold hover:bg-white transition"
              >
                Explore Autos
                <ArrowUpRight size={19} />
              </a>
            </div>

          </div>

          <p className="text-center text-xs text-[#788078] mt-7">
            *All routes and fare ranges displayed above are illustrative sample information, not live availability or confirmed fares.
          </p>

        </div>
      </section>


      {/* ================= STATISTICS ================= */}

      <section className="py-16 bg-[#28332D]">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">

          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-[3px] font-extrabold text-[#8FAF9A]">
              Built for Everyday Travel
            </span>

            <h2 className="text-3xl sm:text-4xl font-black text-white mt-4">
              A Commute That Makes Sense.
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">

            <div className="text-center border-r border-white/10 last:border-0">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-[#8FAF9A]/20 flex items-center justify-center">
                <MapPinned size={26} className="text-[#C5D6C9]" />
              </div>
              <h3 className="text-4xl sm:text-5xl font-black text-white mt-5">05</h3>
              <p className="text-sm text-[#C5D6C9] mt-2">Example Routes</p>
            </div>

            <div className="text-center border-r border-white/10 last:border-0">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-[#8FAF9A]/20 flex items-center justify-center">
                <CarFront size={26} className="text-[#C5D6C9]" />
              </div>
              <h3 className="text-4xl sm:text-5xl font-black text-white mt-5">02</h3>
              <p className="text-sm text-[#C5D6C9] mt-2">Booking Modes</p>
            </div>

            <div className="text-center border-r border-white/10 last:border-0">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-[#8FAF9A]/20 flex items-center justify-center">
                <Users size={26} className="text-[#C5D6C9]" />
              </div>
              <h3 className="text-4xl sm:text-5xl font-black text-white mt-5">03</h3>
              <p className="text-sm text-[#C5D6C9] mt-2">User Roles</p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-[#8FAF9A]/20 flex items-center justify-center">
                <Smartphone size={26} className="text-[#C5D6C9]" />
              </div>
              <h3 className="text-4xl sm:text-5xl font-black text-white mt-5">01</h3>
              <p className="text-sm text-[#C5D6C9] mt-2">Simple Platform</p>
            </div>

          </div>

          <p className="text-center text-xs text-[#8FAF9A] mt-10">
            Illustrative platform information for demonstration purposes.
          </p>

        </div>
      </section>


      {/* ================= TESTIMONIALS ================= */}

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">

          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-[3px] font-extrabold text-[#8FAF9A]">
              Passenger Experiences
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mt-4 text-[#28332D]">
              Every Journey Matters.
            </h2>

            <p className="mt-5 text-[#788078] leading-7">
              A preview of how passengers can share their travel
              experiences and feedback.
            </p>
          </div>


          <div className="grid md:grid-cols-3 gap-6">

            {/* Review 1 */}

            <div className="p-8 rounded-3xl bg-[#F6F5F0] border border-[#DCE3DC]">
              <div className="flex gap-1 text-[#8FAF9A]">
                <Star size={17} fill="currentColor" />
                <Star size={17} fill="currentColor" />
                <Star size={17} fill="currentColor" />
                <Star size={17} fill="currentColor" />
                <Star size={17} fill="currentColor" />
              </div>

              <p className="mt-6 text-[#28332D] leading-8 font-medium">
                "A convenient concept for everyday travel. Sharing a ride
                with people going in the same direction makes commuting
                feel more affordable."
              </p>

              <div className="flex items-center gap-3 mt-7 pt-6 border-t border-[#DCE3DC]">
                <div className="w-11 h-11 rounded-full bg-[#C5D6C9] flex items-center justify-center font-black text-[#28332D]">
                  A
                </div>
                <div>
                  <h4 className="font-extrabold text-sm">Arun Kumar</h4>
                  <p className="text-xs text-[#788078]">Sample Passenger • Guindy</p>
                </div>
              </div>
            </div>


            {/* Review 2 */}

            <div className="p-8 rounded-3xl bg-[#28332D] border border-[#28332D]">
              <div className="flex gap-1 text-[#C5D6C9]">
                <Star size={17} fill="currentColor" />
                <Star size={17} fill="currentColor" />
                <Star size={17} fill="currentColor" />
                <Star size={17} fill="currentColor" />
                <Star size={17} fill="currentColor" />
              </div>

              <p className="mt-6 text-white leading-8 font-medium">
                "The idea of scheduling a shared auto in advance is
                useful for people who travel to work or college every
                day."
              </p>

              <div className="flex items-center gap-3 mt-7 pt-6 border-t border-white/10">
                <div className="w-11 h-11 rounded-full bg-[#8FAF9A] flex items-center justify-center font-black text-[#28332D]">
                  P
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-white">Priya S</h4>
                  <p className="text-xs text-[#C5D6C9]">Sample Passenger • Velachery</p>
                </div>
              </div>
            </div>


            {/* Review 3 */}

            <div className="p-8 rounded-3xl bg-[#F6F5F0] border border-[#DCE3DC]">
              <div className="flex gap-1 text-[#8FAF9A]">
                <Star size={17} fill="currentColor" />
                <Star size={17} fill="currentColor" />
                <Star size={17} fill="currentColor" />
                <Star size={17} fill="currentColor" />
                <Star size={17} fill="currentColor" />
              </div>

              <p className="mt-6 text-[#28332D] leading-8 font-medium">
                "Having booking details and travel information in one
                place would make planning a daily commute much easier."
              </p>

              <div className="flex items-center gap-3 mt-7 pt-6 border-t border-[#DCE3DC]">
                <div className="w-11 h-11 rounded-full bg-[#C5D6C9] flex items-center justify-center font-black text-[#28332D]">
                  R
                </div>
                <div>
                  <h4 className="font-extrabold text-sm">Rahul M</h4>
                  <p className="text-xs text-[#788078]">Sample Passenger • T Nagar</p>
                </div>
              </div>
            </div>

          </div>

          <p className="text-center text-xs text-[#788078] mt-7">
            *These are sample testimonials created to demonstrate the review section. They are not actual passenger reviews.
          </p>

        </div>
      </section>


      {/* ================= CALL TO ACTION ================= */}

      <section className="py-20 bg-[#F6F5F0]">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">

          <div className="relative overflow-hidden bg-[#28332D] rounded-[35px] px-7 py-14 sm:px-14 sm:py-16 text-center">

            <div className="absolute -top-28 -left-20 w-72 h-72 rounded-full bg-[#8FAF9A]/20 blur-2xl" />
            <div className="absolute -bottom-28 -right-20 w-72 h-72 rounded-full bg-[#8FAF9A]/20 blur-2xl" />

            <div className="relative max-w-3xl mx-auto">

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-[#C5D6C9] text-xs font-bold uppercase tracking-widest">
                <Sparkles size={15} />
                Your Next Journey Starts Here
              </div>

              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white mt-7 leading-tight">
                Ready to Make Your
                <span className="block text-[#8FAF9A]">Commute Smarter?</span>
              </h2>

              <p className="text-[#C5D6C9] mt-6 leading-8 max-w-xl mx-auto">
                Join ShareAuto Chennai and discover a better way to
                travel. Find shared rides, save on fares and make
                every journey count.
              </p>

              <div className="flex flex-wrap justify-center gap-4 mt-9">
                <a
                  href="/register"
                  className="px-8 py-4 bg-[#C5D6C9] text-[#28332D] rounded-xl font-extrabold flex items-center gap-3 hover:bg-white transition"
                >
                  Create Your Account
                  <ArrowRight size={19} />
                </a>

                <a
                  href="/login"
                  className="px-8 py-4 border border-white/30 text-white rounded-xl font-bold hover:bg-white/10 transition"
                >
                  Login
                </a>
              </div>

            </div>
          </div>
        </div>
      </section>


      {/* ================= FOOTER ================= */}

      <footer id="contact" className="bg-[#1E2923] text-white pt-16 pb-8">

        <div className="max-w-7xl mx-auto px-5 lg:px-10">

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 pb-14 border-b border-white/10">

            {/* Brand */}

            <div className="lg:col-span-1">
              <a href="#" className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-[#8FAF9A] flex items-center justify-center">
                  <CarFront size={25} className="text-[#28332D]" />
                </div>

                <div>
                  <h2 className="text-xl font-extrabold">
                    Share<span className="text-[#8FAF9A]">Auto</span>
                  </h2>
                  <p className="text-[10px] font-semibold tracking-[2px] text-[#C5D6C9] uppercase">
                    Chennai
                  </p>
                </div>
              </a>

              <p className="text-sm text-[#C5D6C9] leading-7 mt-6 max-w-xs">
                Share your route, share the cost. Making everyday
                shared-auto travel simpler and more convenient.
              </p>

              {/* <div className="flex items-center gap-3 mt-6">
                <a href="#" className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-[#8FAF9A] hover:text-[#28332D] transition">
                  <Facebook size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-[#8FAF9A] hover:text-[#28332D] transition">
                  <Instagram size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-[#8FAF9A] hover:text-[#28332D] transition">
                  <Linkedin size={18} />
                </a>
              </div> */}
            </div>


            {/* Quick Links */}

            <div>
              <h3 className="font-extrabold text-lg mb-6">Quick Links</h3>

              <div className="space-y-4 text-sm text-[#C5D6C9]">
                <a href="#" className="block hover:text-white transition">Home</a>
                <a href="#about" className="block hover:text-white transition">About Us</a>
                <a href="#how-it-works" className="block hover:text-white transition">How It Works</a>
                <a href="#features" className="block hover:text-white transition">Features</a>
                <a href="/register" className="block hover:text-white transition">Register</a>
              </div>
            </div>


            {/* Passenger Support */}

            <div>
              <h3 className="font-extrabold text-lg mb-6">Passenger Support</h3>

              <div className="space-y-4 text-sm text-[#C5D6C9]">
                <a href="/login" className="block hover:text-white transition">Passenger Login</a>
                <a href="#contact" className="block hover:text-white transition">Help & Support</a>
                <a href="#contact" className="block hover:text-white transition">Contact Us</a>
                <a href="#contact" className="block hover:text-white transition">FAQs</a>
              </div>
            </div>


            {/* Contact */}

            <div>
              <h3 className="font-extrabold text-lg mb-6">Get in Touch</h3>

              <div className="space-y-5 text-sm text-[#C5D6C9]">

                <div className="flex gap-3 items-start">
                  <Mail size={18} className="text-[#8FAF9A] mt-0.5" />
                  <span>support@shareauto.example</span>
                </div>

                <div className="flex gap-3 items-start">
                  <Phone size={18} className="text-[#8FAF9A] mt-0.5" />
                  <span>Contact information coming soon</span>
                </div>

                <div className="flex gap-3 items-start">
                  <MapPin size={18} className="text-[#8FAF9A] mt-0.5" />
                  <span>Chennai, Tamil Nadu, India</span>
                </div>

              </div>
            </div>

          </div>


          {/* Bottom Footer */}

          <div className="flex flex-col sm:flex-row justify-between items-center gap-5 pt-8 text-xs text-[#8FAF9A]">

            <p>
              © 2026 ShareAuto Chennai. All rights reserved.
            </p>

            <div className="flex flex-wrap justify-center gap-6">
              <a href="#" className="hover:text-white transition">Privacy Policy</a>
              <a href="#" className="hover:text-white transition">Terms & Conditions</a>
              <a href="#" className="hover:text-white transition">Cookie Policy</a>
            </div>

            <p className="font-semibold">
              Share the Ride. Share the Cost.
            </p>

          </div>

        </div>
      </footer>

    </div>
  );
};

export default LandingPage;
