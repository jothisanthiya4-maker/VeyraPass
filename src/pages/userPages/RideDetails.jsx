
import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useAuto } from "../../context/AutoContext";

import {
  FaArrowLeft,
  FaStar,
  FaCar,
  FaMapMarkerAlt,
  FaUsers,
  FaCalendarAlt,
  FaClock,
  FaRoute,
  FaCheckCircle,
  FaChair,
  FaRupeeSign,
  FaTicketAlt,
  FaBolt,
  FaShieldAlt,
  FaInfoCircle,
  FaCheck
} from "react-icons/fa";

function RideDetails() {
  const { autoId } = useParams();
  const navigate = useNavigate();

  const { autos, selectedAuto, setAutos, setBookings } = useAuto();

  const auto =
    autos.find((item) => String(item.id) === autoId) ??
    (String(selectedAuto?.id) === autoId ? selectedAuto : null);

  const [requestedSeats, setRequestedSeats] = useState(1);
  const [toast, setToast] = useState("");
  const [boardingPoint, setBoardingPoint] = useState(auto?.pickup ?? "");
  const [droppingPoint, setDroppingPoint] = useState(auto?.destination ?? "");

  useEffect(() => {
    setBoardingPoint(auto?.pickup ?? "");
    setDroppingPoint(auto?.destination ?? "");
  }, [auto?.id, auto?.pickup, auto?.destination]);

  if (!auto) {
    return <Navigate to="/user/available-autos" replace />;
  }

  const boardingIndex = auto.route.indexOf(boardingPoint);
  const droppingIndex = auto.route.indexOf(droppingPoint);
  const routeLegs = Math.max(auto.route.length - 1, 1);
  const selectedLegs = Math.max(droppingIndex - boardingIndex, 0);
  const farePerSeat = Math.round((auto.fare * selectedLegs) / routeLegs);
  const totalFare = requestedSeats * farePerSeat;
  const reservedSeats = auto.totalSeats - auto.availableSeats;

  const handleBooking = () => {
    if (auto.availableSeats < 1) {
      setToast("Sorry, no seats are available.");
      return;
    }

    if (requestedSeats > auto.availableSeats) {
      setToast("Not enough seats are available.");
      return;
    }

    setBookings((previousBookings) => [
      ...previousBookings,
      {
        ...auto,
        boardingPoint,
        droppingPoint,
        farePerSeat,
        requestedSeats,
        totalFare,
        bookingId: Date.now(),
        bookingMode: "Instant",
        bookingStatus: "Confirmed"
      }
    ]);

    setAutos((previousAutos) =>
      previousAutos.map((item) =>
        item.id === auto.id
          ? {
              ...item,
              availableSeats: item.availableSeats - requestedSeats,
              status:
                item.availableSeats - requestedSeats === 0
                  ? "full"
                  : "available"
            }
          : item
      )
    );

    setToast("Instant booking booked successfully!");
  };

  const driverInitials = auto.driverName
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");

  return (
    <div className="min-h-screen bg-[#F6F5F0] px-4 sm:px-6 lg:px-8 py-8">

      <div className="max-w-6xl mx-auto">

        {/* TOAST MESSAGE */}

        {toast && (
          <div className="fixed top-5 right-5 z-50 max-w-sm bg-[#28332D] text-white px-5 py-4 rounded-xl shadow-xl flex items-center gap-3">
            <FaCheckCircle className="text-[#8FAF9A] text-lg shrink-0" />

            <p className="text-sm flex-1">{toast}</p>

            <button
              onClick={() => setToast("")}
              className="text-white/70 hover:text-white"
            >
              ✕
            </button>
          </div>
        )}


        {/* BACK BUTTON */}

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#28332D] hover:text-[#8FAF9A] transition mb-6"
        >
          <FaArrowLeft />
          Back to Available Autos
        </button>


        {/* PAGE HEADING */}

        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8FAF9A] mb-2">
            ShareAuto Chennai
          </p>

          <h1 className="text-3xl sm:text-4xl font-bold text-[#28332D]">
            Ride Details
          </h1>

          <p className="text-[#788078] mt-2">
            Review your ride information and confirm your booking.
          </p>
        </div>


        {/* MAIN GRID */}

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_350px] gap-6 items-start">

          {/* LEFT SIDE */}

          <div className="space-y-6">

            {/* DRIVER INFORMATION */}

            <section className="bg-white rounded-2xl border border-[#DCE3DC] p-6 shadow-sm">

              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold text-[#28332D]">
                  Driver Information
                </h2>

                <span className="text-xs font-semibold bg-[#E5EDE6] text-[#28332D] px-3 py-1.5 rounded-full">
                  Verified Driver
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-4">

                <div className="w-16 h-16 rounded-2xl bg-[#28332D] text-white flex items-center justify-center text-xl font-bold">
                  {driverInitials}
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-bold text-[#28332D]">
                    {auto.driverName}
                  </h3>

                  <div className="flex flex-wrap items-center gap-2 mt-2 text-sm text-[#788078]">

                    <span className="flex items-center gap-1 text-amber-500 font-semibold">
                      <FaStar />
                      {auto.rating}
                    </span>

                    <span>·</span>

                    <span>{auto.totalTrips} completed trips</span>

                  </div>

                  <p className="text-xs text-[#8FAF9A] font-semibold mt-2">
                    Driver ID: #{auto.id}
                  </p>
                </div>

              </div>

              <div className="grid grid-cols-2 gap-3 mt-6">

                <div className="bg-[#F6F5F0] rounded-xl p-4">
                  <p className="text-xs text-[#788078] mb-1">
                    Driver Rating
                  </p>
                  <p className="font-bold text-[#28332D]">
                    {auto.rating} / 5.0
                  </p>
                </div>

                <div className="bg-[#F6F5F0] rounded-xl p-4">
                  <p className="text-xs text-[#788078] mb-1">
                    Completed Trips
                  </p>
                  <p className="font-bold text-[#28332D]">
                    {auto.totalTrips}+
                  </p>
                </div>

              </div>

            </section>


            {/* VEHICLE INFORMATION */}

            <section className="bg-white rounded-2xl border border-[#DCE3DC] p-6 shadow-sm">

              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-[#E5EDE6] rounded-xl flex items-center justify-center">
                  <FaCar className="text-[#28332D] text-lg" />
                </div>

                <div>
                  <h2 className="text-lg font-bold text-[#28332D]">
                    Vehicle Information
                  </h2>
                  <p className="text-xs text-[#788078]">
                    Auto details and registration
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                <div>
                  <p className="text-xs text-[#788078] mb-1">
                    Vehicle Model
                  </p>
                  <p className="font-semibold text-[#28332D]">
                    {auto.vehicleModel}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-[#788078] mb-1">
                    Registration Number
                  </p>
                  <p className="font-semibold text-[#28332D]">
                    {auto.vehicleNumber}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-[#788078] mb-1">
                    Vehicle Type
                  </p>
                  <p className="font-semibold text-[#28332D]">
                    {auto.vehicleType}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-[#788078] mb-1">
                    Vehicle Status
                  </p>
                  <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full ${
                    auto.status === "full"
                      ? "bg-red-50 text-red-600"
                      : "bg-[#E5EDE6] text-[#28332D]"
                  }`}>
                    <FaCheckCircle />
                    {auto.status === "full" ? "Full" : "Available"}
                  </span>
                </div>

              </div>

            </section>


            {/* ROUTE INFORMATION */}

            <section className="bg-white rounded-2xl border border-[#DCE3DC] p-6 shadow-sm">

              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#E5EDE6] rounded-xl flex items-center justify-center">
                  <FaRoute className="text-[#28332D] text-lg" />
                </div>

                <div>
                  <h2 className="text-lg font-bold text-[#28332D]">
                    Route Information
                  </h2>
                  <p className="text-xs text-[#788078]">
                    Complete journey and intermediate stops
                  </p>
                </div>
              </div>


              {/* PICKUP AND DROP */}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">

                <div className="bg-[#F6F5F0] rounded-xl p-4">
                  <div className="flex items-center gap-2 text-xs text-[#788078] mb-2">
                    <FaMapMarkerAlt className="text-[#8FAF9A]" />
                    PICKUP LOCATION
                  </div>

                  <select
                    value={boardingPoint}
                    onChange={(event) => {
                      const nextBoardingPoint = event.target.value;
                      const nextBoardingIndex = auto.route.indexOf(nextBoardingPoint);
                      setBoardingPoint(nextBoardingPoint);
                      if (auto.route.indexOf(droppingPoint) <= nextBoardingIndex) {
                        setDroppingPoint(auto.destination);
                      }
                    }}
                    className="w-full rounded-lg border border-[#DCE3DC] bg-white p-2 font-bold text-[#28332D]"
                  >
                    {auto.route.slice(0, -1).map((stop) => (
                      <option key={stop} value={stop}>{stop}</option>
                    ))}
                  </select>
                </div>

                <div className="bg-[#F6F5F0] rounded-xl p-4">
                  <div className="flex items-center gap-2 text-xs text-[#788078] mb-2">
                    <FaMapMarkerAlt className="text-[#8FAF9A]" />
                    DESTINATION
                  </div>

                  <select
                    value={droppingPoint}
                    onChange={(event) => setDroppingPoint(event.target.value)}
                    className="w-full rounded-lg border border-[#DCE3DC] bg-white p-2 font-bold text-[#28332D]"
                  >
                    {auto.route.slice(boardingIndex + 1).map((stop) => (
                      <option key={stop} value={stop}>{stop}</option>
                    ))}
                  </select>
                </div>

              </div>


              {/* ROUTE TIMELINE */}

              <h3 className="text-sm font-bold text-[#28332D] mb-5">
                Complete Route
              </h3>

              <div className="relative pl-8 space-y-6">

                <div className="absolute left-[9px] top-2 bottom-3 border-l-2 border-dashed border-[#C5D6C9]" />

                {auto.route.map((stop, index) => (
                  <div
                    key={`${stop}-${index}`}
                    className="relative flex items-center justify-between gap-3"
                  >

                    <span className={`absolute -left-8 w-5 h-5 rounded-full border-4 border-white ${
                      index === 0 || index === auto.route.length - 1
                        ? "bg-[#28332D]"
                        : "bg-[#8FAF9A]"
                    }`} />

                    <div>
                      <p className={`text-sm ${
                        index === 0 || index === auto.route.length - 1
                          ? "font-bold text-[#28332D]"
                          : "font-medium text-[#788078]"
                      }`}>
                        {stop}
                      </p>

                      <p className="text-[10px] text-[#788078] mt-1">
                        {index === 0
                          ? "Starting point"
                          : index === auto.route.length - 1
                          ? "Final destination"
                          : "Intermediate stop"}
                      </p>
                    </div>

                    {(index === 0 || index === auto.route.length - 1) && (
                      <span className="text-[10px] font-bold text-[#8FAF9A] bg-[#E5EDE6] px-2.5 py-1 rounded-full">
                        {index === 0 ? "START" : "END"}
                      </span>
                    )}

                  </div>
                ))}

              </div>

            </section>


            {/* SCHEDULE INFORMATION */}

            <section className="bg-white rounded-2xl border border-[#DCE3DC] p-6 shadow-sm">

              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-[#E5EDE6] rounded-xl flex items-center justify-center">
                  <FaCalendarAlt className="text-[#28332D] text-lg" />
                </div>

                <div>
                  <h2 className="text-lg font-bold text-[#28332D]">
                    Journey Schedule
                  </h2>
                  <p className="text-xs text-[#788078]">
                    Date and estimated journey timings
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">

                <div className="bg-[#F6F5F0] rounded-xl p-4">
                  <FaCalendarAlt className="text-[#8FAF9A] mb-3" />
                  <p className="text-xs text-[#788078]">
                    Journey Date
                  </p>
                  <p className="font-bold text-[#28332D] mt-1">
                    {auto.journeyDate}
                  </p>
                </div>

                <div className="bg-[#F6F5F0] rounded-xl p-4">
                  <FaClock className="text-[#8FAF9A] mb-3" />
                  <p className="text-xs text-[#788078]">
                    Departure Time
                  </p>
                  <p className="font-bold text-[#28332D] mt-1">
                    {auto.departureTime}
                  </p>
                </div>

                <div className="bg-[#F6F5F0] rounded-xl p-4">
                  <FaBolt className="text-[#8FAF9A] mb-3" />
                  <p className="text-xs text-[#788078]">
                    Estimated Arrival
                  </p>
                  <p className="font-bold text-[#28332D] mt-1">
                    {auto.estimatedArrivalTime}
                  </p>
                </div>

                <div className="bg-[#F6F5F0] rounded-xl p-4">
                  <FaClock className="text-[#8FAF9A] mb-3" />
                  <p className="text-xs text-[#788078]">
                    Waiting Time
                  </p>
                  <p className="font-bold text-[#28332D] mt-1">
                    {auto.waitingTime} minutes
                  </p>
                </div>

              </div>

            </section>

          </div>


          {/* RIGHT SIDE - BOOKING PANEL */}

          <aside className="space-y-5 lg:sticky lg:top-6">

            {/* SEAT AVAILABILITY */}

            <section className="bg-white rounded-2xl border border-[#DCE3DC] p-6 shadow-sm">

              <h2 className="text-lg font-bold text-[#28332D] mb-5">
                Seat Availability
              </h2>

              <div className="grid grid-cols-3 gap-2 text-center">

                <div className="bg-[#F6F5F0] rounded-xl p-3">
                  <FaUsers className="mx-auto text-[#8FAF9A] mb-2" />
                  <p className="text-xl font-bold text-[#28332D]">
                    {auto.totalSeats}
                  </p>
                  <p className="text-[10px] text-[#788078]">
                    Total
                  </p>
                </div>

                <div className="bg-[#F6F5F0] rounded-xl p-3">
                  <FaTicketAlt className="mx-auto text-[#8FAF9A] mb-2" />
                  <p className="text-xl font-bold text-[#28332D]">
                    {reservedSeats}
                  </p>
                  <p className="text-[10px] text-[#788078]">
                    Reserved
                  </p>
                </div>

                <div className="bg-[#E5EDE6] rounded-xl p-3">
                  <FaChair className="mx-auto text-[#28332D] mb-2" />
                  <p className="text-xl font-bold text-[#28332D]">
                    {auto.availableSeats}
                  </p>
                  <p className="text-[10px] text-[#28332D]">
                    Available
                  </p>
                </div>

              </div>


              {/* SEAT SELECTION */}

              <div className="mt-6">

                <label className="block text-sm font-semibold text-[#28332D] mb-3">
                  Select Number of Seats
                </label>

                <div className="flex items-center justify-between border border-[#DCE3DC] rounded-xl p-3">

                  <div>
                    <p className="font-semibold text-[#28332D]">
                      Passengers
                    </p>
                    <p className="text-xs text-[#788078]">
                      Choose your seats
                    </p>
                  </div>

                  <div className="flex items-center gap-3">

                    <button
                      type="button"
                      disabled={requestedSeats <= 1}
                      onClick={() =>
                        setRequestedSeats((previous) => Math.max(1, previous - 1))
                      }
                      className="w-8 h-8 rounded-lg bg-[#E5EDE6] text-[#28332D] font-bold disabled:opacity-40"
                    >
                      −
                    </button>

                    <span className="font-bold text-[#28332D] w-4 text-center">
                      {requestedSeats}
                    </span>

                    <button
                      type="button"
                      disabled={requestedSeats >= auto.availableSeats}
                      onClick={() =>
                        setRequestedSeats((previous) =>
                          Math.min(auto.availableSeats, previous + 1)
                        )
                      }
                      className="w-8 h-8 rounded-lg bg-[#E5EDE6] text-[#28332D] font-bold disabled:opacity-40"
                    >
                      +
                    </button>

                  </div>

                </div>

                {auto.availableSeats < 1 && (
                  <p className="text-xs text-red-600 mt-2">
                    No seats are currently available.
                  </p>
                )}

              </div>

            </section>


            {/* FARE SUMMARY */}

            <section className="bg-white rounded-2xl border border-[#DCE3DC] p-6 shadow-sm">

              <h2 className="text-lg font-bold text-[#28332D] mb-5">
                Fare Summary
              </h2>

              <div className="space-y-4">

                <div className="flex justify-between text-sm">
                  <span className="text-[#788078]">
                    Fare per seat
                  </span>
                  <span className="font-semibold text-[#28332D]">
                    ₹{farePerSeat}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-[#788078]">
                    Number of seats
                  </span>
                  <span className="font-semibold text-[#28332D]">
                    × {requestedSeats}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-[#788078]">
                    Booking Mode
                  </span>
                  <span className="font-semibold text-[#28332D]">
                    Instant Booking
                  </span>
                </div>

                <div className="border-t border-dashed border-[#DCE3DC] pt-4 flex justify-between items-center">
                  <span className="font-bold text-[#28332D]">
                    Total Fare
                  </span>

                  <span className="text-2xl font-bold text-[#28332D]">
                    ₹{totalFare}
                  </span>
                </div>

              </div>


              {/* BOOKING BUTTON */}

              <button
                type="button"
                onClick={handleBooking}
                disabled={auto.availableSeats < 1}
                className="w-full mt-6 bg-[#28332D] text-white font-semibold py-3.5 rounded-xl hover:bg-[#1E2923] transition flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <FaCheck />
                {auto.availableSeats < 1 ? "No Seats Available" : "Confirm Booking"}
              </button>

              <div className="flex items-start gap-2 mt-4 text-xs text-[#788078]">
                <FaShieldAlt className="text-[#8FAF9A] mt-0.5 shrink-0" />
                <p>
                  Your booking will be saved in your account.
                  Review the ride details before confirming.
                </p>
              </div>

            </section>


            {/* BOOKING INFORMATION */}

            <div className="bg-[#E5EDE6] rounded-2xl p-5 flex gap-3">
              <FaInfoCircle className="text-[#28332D] mt-1 shrink-0" />

              <div>
                <h3 className="text-sm font-bold text-[#28332D]">
                  Before you book
                </h3>

                <p className="text-xs text-[#788078] leading-relaxed mt-2">
                  Check your pickup point, destination, departure time and available seats before confirming your shared-auto ride.
                </p>
              </div>
            </div>

          </aside>

        </div>

      </div>

    </div>
  );
}

export default RideDetails;
