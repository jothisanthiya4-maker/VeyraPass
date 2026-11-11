
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaMapMarkerAlt,
  FaUsers,
  FaCalendarAlt,
  FaClock,
  FaStar,
  FaCar,
  FaRoute,
  FaCheckCircle,
  FaExclamationCircle,
  FaSearch,
  FaExchangeAlt,
  FaEye,
  FaTimes,
  FaFilter,
  FaSortAmountDown,
  FaBolt,
  FaChair,
  FaRupeeSign
} from "react-icons/fa";

import { useAuto } from "../../context/AutoContext";


// --------------------------------------------------
// MAIN PAGE
// --------------------------------------------------

const AvailableAutos = () => {
  const navigate = useNavigate();

  const {
    autos,
    selectedAuto,
    selectAuto,
    comparedAutos,
    toggleCompare
  } = useAuto();

  // Only autos with seats available are displayed
  const availableList = useMemo(() => {
    return autos.filter(
      (auto) =>
        auto.status === "available" &&
        auto.availableSeats > 0
    );
  }, [autos]);


  // Get all pickup and drop locations from the auto routes
  const locationOptions = useMemo(() => {
    const locations = [];

    availableList.forEach((auto) => {
      auto.route.forEach((point) => {
        if (!locations.includes(point)) {
          locations.push(point);
        }
      });
    });

    return locations.sort();
  }, [availableList]);


  // Get maximum fare from available autos
  const maximumFare = useMemo(() => {
    return Math.max(
      ...availableList.map((auto) => auto.fare),
      100
    );
  }, [availableList]);


  // All filters start with default values.
  // Therefore, all available autos are displayed initially.
  const initialFilters = {
    pickup: "",
    destination: "",
    maxFare: maximumFare,
    minRating: "0",
    minSeats: "1",
    vehicleType: "All",
    bookingMode: "All",
    journeyDate: "",
    departurePeriod: "All"
  };

  const [filters, setFilters] = useState(initialFilters);

  const [sortBy, setSortBy] = useState("recommended");


  // Update one filter without changing the remaining filters
  const handleFilterChange = (name, value) => {
    setFilters((previous) => ({
      ...previous,
      [name]: value
    }));
  };


  // Reset all filters
  const clearFilters = () => {
    setFilters({
      pickup: "",
      destination: "",
      maxFare: maximumFare,
      minRating: "0",
      minSeats: "1",
      vehicleType: "All",
      bookingMode: "All",
      journeyDate: "",
      departurePeriod: "All"
    });

    setSortBy("recommended");
  };


  // --------------------------------------------------
  // FILTERING LOGIC
  // --------------------------------------------------

  const filteredAutos = useMemo(() => {
    let result = availableList.filter((auto) => {

      // 1. Pickup point
      const pickupIndex = filters.pickup
        ? auto.route.indexOf(filters.pickup)
        : -1;

      if (filters.pickup && pickupIndex === -1) {
        return false;
      }


      // 2. Drop point
      const destinationIndex = filters.destination
        ? auto.route.indexOf(filters.destination)
        : -1;

      if (filters.destination && destinationIndex === -1) {
        return false;
      }


      // 3. Route order compatibility
      if (
        filters.pickup &&
        filters.destination &&
        pickupIndex >= destinationIndex
      ) {
        return false;
      }


      // 4. Maximum fare
      if (auto.fare > Number(filters.maxFare)) {
        return false;
      }


      // 5. Minimum driver rating
      if (auto.rating < Number(filters.minRating)) {
        return false;
      }


      // 6. Minimum available seats
      if (auto.availableSeats < Number(filters.minSeats)) {
        return false;
      }


      // 7. Vehicle type
      if (
        filters.vehicleType !== "All" &&
        auto.vehicleType !== filters.vehicleType
      ) {
        return false;
      }


      // 8. Booking mode
      if (
        filters.bookingMode !== "All" &&
        auto.bookingMode !== filters.bookingMode
      ) {
        return false;
      }


      // 9. Journey date
      if (
        filters.journeyDate &&
        auto.journeyDate !== filters.journeyDate
      ) {
        return false;
      }


      // 10. Departure time
      const hour = Number(auto.departureTime.split(":")[0]);

      if (filters.departurePeriod === "Morning" && (hour < 5 || hour >= 12)) {
        return false;
      }

      if (filters.departurePeriod === "Afternoon" && (hour < 12 || hour >= 17)) {
        return false;
      }

      if (filters.departurePeriod === "Evening" && (hour < 17 || hour >= 22)) {
        return false;
      }

      if (filters.departurePeriod === "Night" && (hour < 22 && hour >= 5)) {
        return false;
      }

      return true;
    });


    // --------------------------------------------------
    // SORTING LOGIC
    // --------------------------------------------------

    if (sortBy === "lowestFare") {
      result.sort((a, b) => a.fare - b.fare);
    }

    else if (sortBy === "highestRating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    else if (sortBy === "earliestDeparture") {
      result.sort((a, b) => {
        const dateA = new Date(`${a.journeyDate}T${a.departureTime}`);
        const dateB = new Date(`${b.journeyDate}T${b.departureTime}`);

        return dateA - dateB;
      });
    }

    else if (sortBy === "shortestWaiting") {
      result.sort((a, b) => a.waitingTime - b.waitingTime);
    }

    return result;
  }, [availableList, filters, sortBy]);


  // --------------------------------------------------
  // ACTIONS
  // --------------------------------------------------

  const handleViewDetails = (auto) => {
    selectAuto(auto);
    navigate(`/user/auto-details/${auto.id}`);
  };


  const handleCompare = (auto) => {
    const alreadyAdded = comparedAutos.some(
      (item) => item.id === auto.id
    );

    if (!alreadyAdded && comparedAutos.length >= 3) {
      alert("You can compare a maximum of 3 autos.");
      return;
    }

    toggleCompare(auto);
  };


  // --------------------------------------------------
  // AVAILABILITY STATUS
  // --------------------------------------------------

  const getAvailability = (auto) => {
    if (auto.availableSeats === 1) {
      return {
        label: "Limited Seats",
        style: "bg-amber-50 text-amber-700",
        icon: <FaExclamationCircle />
      };
    }

    if (auto.waitingTime <= 15) {
      return {
        label: "Departing Soon",
        style: "bg-blue-50 text-blue-700",
        icon: <FaBolt />
      };
    }

    return {
      label: "Seats Available",
      style: "bg-green-50 text-green-700",
      icon: <FaCheckCircle />
    };
  };


  // --------------------------------------------------
  // FILTER PANEL
  // --------------------------------------------------

  const FilterPanel = () => {
    return (
      <div className="bg-white rounded-2xl border border-[#DCE3DC] p-5 shadow-sm sticky top-5">

        <div className="flex justify-between items-center mb-5">
          <div className="flex items-center gap-2">
            <FaFilter className="text-[#28332D]" />
            <h2 className="text-lg font-bold text-[#28332D]">
              Filters
            </h2>
          </div>

          <button
            onClick={clearFilters}
            className="text-sm font-semibold text-[#788078] hover:text-[#28332D]"
          >
            Clear all
          </button>
        </div>


        {/* PICKUP POINT */}

        <div className="mb-5">
          <label className="block text-sm font-semibold text-[#28332D] mb-2">
            <FaMapMarkerAlt className="inline mr-2 text-[#8FAF9A]" />
            Pickup Point
          </label>

          <select
            value={filters.pickup}
            onChange={(e) =>
              handleFilterChange("pickup", e.target.value)
            }
            className="w-full border border-[#DCE3DC] rounded-xl p-3 text-sm outline-none focus:border-[#8FAF9A] bg-white"
          >
            <option value="">All pickup points</option>

            {locationOptions.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>


        {/* DROP POINT */}

        <div className="mb-5">
          <label className="block text-sm font-semibold text-[#28332D] mb-2">
            <FaMapMarkerAlt className="inline mr-2 text-[#8FAF9A]" />
            Drop Point
          </label>

          <select
            value={filters.destination}
            onChange={(e) =>
              handleFilterChange("destination", e.target.value)
            }
            className="w-full border border-[#DCE3DC] rounded-xl p-3 text-sm outline-none focus:border-[#8FAF9A] bg-white"
          >
            <option value="">All drop points</option>

            {locationOptions.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>


        <div className="border-t border-[#E5EDE6] my-4" />


        {/* MAXIMUM FARE */}

        <div className="mb-5">
          <div className="flex justify-between mb-2">
            <label className="text-sm font-semibold text-[#28332D]">
              <FaRupeeSign className="inline mr-1 text-[#8FAF9A]" />
              Maximum Fare
            </label>

            <span className="text-sm font-bold text-[#28332D]">
              ₹{filters.maxFare}
            </span>
          </div>

          <input
            type="range"
            min="0"
            max={maximumFare}
            step="5"
            value={Math.min(filters.maxFare, maximumFare)}
            onChange={(e) =>
              handleFilterChange("maxFare", Number(e.target.value))
            }
            className="w-full accent-[#28332D]"
          />

          <div className="flex justify-between text-xs text-[#788078]">
            <span>₹0</span>
            <span>₹{maximumFare}</span>
          </div>
        </div>


        {/* DRIVER RATING */}

        <div className="mb-5">
          <label className="block text-sm font-semibold text-[#28332D] mb-2">
            <FaStar className="inline mr-2 text-amber-400" />
            Minimum Driver Rating
          </label>

          <select
            value={filters.minRating}
            onChange={(e) =>
              handleFilterChange("minRating", e.target.value)
            }
            className="w-full border border-[#DCE3DC] rounded-xl p-3 text-sm outline-none focus:border-[#8FAF9A] bg-white"
          >
            <option value="0">All ratings</option>
            <option value="3">3.0 and above</option>
            <option value="3.5">3.5 and above</option>
            <option value="4">4.0 and above</option>
            <option value="4.5">4.5 and above</option>
            <option value="4.8">4.8 and above</option>
          </select>
        </div>


        {/* AVAILABLE SEATS */}

        <div className="mb-5">
          <label className="block text-sm font-semibold text-[#28332D] mb-2">
            <FaChair className="inline mr-2 text-[#8FAF9A]" />
            Minimum Available Seats
          </label>

          <select
            value={filters.minSeats}
            onChange={(e) =>
              handleFilterChange("minSeats", e.target.value)
            }
            className="w-full border border-[#DCE3DC] rounded-xl p-3 text-sm outline-none focus:border-[#8FAF9A] bg-white"
          >
            <option value="1">1 or more seats</option>
            <option value="2">2 or more seats</option>
            <option value="3">3 seats</option>
          </select>
        </div>


        {/* VEHICLE TYPE */}

        <div className="mb-5">
          <label className="block text-sm font-semibold text-[#28332D] mb-2">
            <FaCar className="inline mr-2 text-[#8FAF9A]" />
            Vehicle Type
          </label>

          <select
            value={filters.vehicleType}
            onChange={(e) =>
              handleFilterChange("vehicleType", e.target.value)
            }
            className="w-full border border-[#DCE3DC] rounded-xl p-3 text-sm outline-none focus:border-[#8FAF9A] bg-white"
          >
            <option value="All">All vehicles</option>
            <option value="Auto">Auto</option>
          </select>
        </div>


        {/* BOOKING MODE */}

        <div className="mb-5">
          <label className="block text-sm font-semibold text-[#28332D] mb-2">
            Booking Mode
          </label>

          <select
            value={filters.bookingMode}
            onChange={(e) =>
              handleFilterChange("bookingMode", e.target.value)
            }
            className="w-full border border-[#DCE3DC] rounded-xl p-3 text-sm outline-none focus:border-[#8FAF9A] bg-white"
          >
            <option value="All">All booking modes</option>
            <option value="Instant">Instant Booking</option>
            <option value="Scheduled">Scheduled Booking</option>
          </select>
        </div>


        {/* JOURNEY DATE */}

        <div className="mb-5">
          <label className="block text-sm font-semibold text-[#28332D] mb-2">
            <FaCalendarAlt className="inline mr-2 text-[#8FAF9A]" />
            Journey Date
          </label>

          <input
            type="date"
            value={filters.journeyDate}
            onChange={(e) =>
              handleFilterChange("journeyDate", e.target.value)
            }
            className="w-full border border-[#DCE3DC] rounded-xl p-3 text-sm outline-none focus:border-[#8FAF9A]"
          />
        </div>


        {/* DEPARTURE TIME */}

        <div>
          <label className="block text-sm font-semibold text-[#28332D] mb-2">
            <FaClock className="inline mr-2 text-[#8FAF9A]" />
            Departure Time
          </label>

          <select
            value={filters.departurePeriod}
            onChange={(e) =>
              handleFilterChange("departurePeriod", e.target.value)
            }
            className="w-full border border-[#DCE3DC] rounded-xl p-3 text-sm outline-none focus:border-[#8FAF9A] bg-white"
          >
            <option value="All">Any time</option>
            <option value="Morning">Morning (5 AM - 12 PM)</option>
            <option value="Afternoon">Afternoon (12 PM - 5 PM)</option>
            <option value="Evening">Evening (5 PM - 10 PM)</option>
            <option value="Night">Night (10 PM - 5 AM)</option>
          </select>
        </div>

      </div>
    );
  };


  // --------------------------------------------------
  // AVAILABILITY BADGE
  // --------------------------------------------------

  const AvailabilityStatus = ({ auto }) => {
    const availability = getAvailability(auto);

    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${availability.style}`}>
        {availability.icon}
        {availability.label}
      </span>
    );
  };


  // --------------------------------------------------
  // AUTO CARD
  // --------------------------------------------------

  const AvailableAutoCard = ({ auto }) => {
    const isCompared = comparedAutos.some(
      (item) => item.id === auto.id
    );

    return (
      <div className="bg-white rounded-2xl border border-[#DCE3DC] shadow-sm hover:shadow-md transition p-5">

        {/* DRIVER AND STATUS */}

        <div className="flex flex-wrap justify-between gap-3">

          <div>
            <h3 className="text-lg font-bold text-[#28332D]">
              {auto.driverName}
            </h3>

            <div className="flex items-center gap-2 mt-1 text-sm text-[#788078]">
              <FaStar className="text-amber-400" />
              <span className="font-semibold text-[#28332D]">
                {auto.rating}
              </span>
              <span>({auto.totalTrips} trips)</span>
            </div>
          </div>

          <AvailabilityStatus auto={auto} />

        </div>


        {/* VEHICLE DETAILS */}

        <div className="mt-4 flex items-center gap-3 bg-[#F6F5F0] rounded-xl p-3">

          <div className="w-12 h-12 rounded-xl bg-[#E5EDE6] flex items-center justify-center">
            <FaCar className="text-2xl text-[#28332D]" />
          </div>

          <div>
            <p className="font-semibold text-[#28332D]">
              {auto.vehicleModel}
            </p>

            <p className="text-xs text-[#788078] mt-1">
              {auto.vehicleNumber} · {auto.vehicleType}
            </p>
          </div>

        </div>


        {/* ROUTE DETAILS */}

        <div className="mt-5">

          <div className="flex items-center gap-2 text-sm font-semibold text-[#28332D] mb-3">
            <FaRoute className="text-[#8FAF9A]" />
            Route Details
          </div>

          <div className="relative pl-6 space-y-4">

            <div className="absolute left-[7px] top-2 bottom-2 border-l-2 border-dashed border-[#C5D6C9]" />

            {auto.route.map((point, index) => (
              <div key={`${auto.id}-${point}`} className="relative flex items-center gap-3">

                <span
                  className={`absolute -left-6 w-4 h-4 rounded-full border-2 border-white ${
                    index === 0 || index === auto.route.length - 1
                      ? "bg-[#28332D]"
                      : "bg-[#8FAF9A]"
                  }`}
                />

                <span className={`text-sm ${
                  index === 0 || index === auto.route.length - 1
                    ? "font-semibold text-[#28332D]"
                    : "text-[#788078]"
                }`}>
                  {point}
                </span>

                {index === 0 && (
                  <span className="text-[10px] bg-[#E5EDE6] text-[#28332D] px-2 py-0.5 rounded-full">
                    START
                  </span>
                )}

                {index === auto.route.length - 1 && (
                  <span className="text-[10px] bg-[#E5EDE6] text-[#28332D] px-2 py-0.5 rounded-full">
                    END
                  </span>
                )}

              </div>
            ))}

          </div>

        </div>


        {/* RIDE INFORMATION */}

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-4 border-t border-[#E5EDE6]">

          <div>
            <p className="text-xs text-[#788078] mb-1">
              Departure
            </p>
            <p className="text-sm font-semibold text-[#28332D]">
              {auto.departureTime}
            </p>
            <p className="text-xs text-[#788078]">
              {auto.journeyDate}
            </p>
          </div>

          <div>
            <p className="text-xs text-[#788078] mb-1">
              Est. Arrival
            </p>
            <p className="text-sm font-semibold text-[#28332D]">
              {auto.estimatedArrivalTime}
            </p>
          </div>

          <div>
            <p className="text-xs text-[#788078] mb-1">
              Available Seats
            </p>
            <p className="text-sm font-semibold text-[#28332D]">
              {auto.availableSeats}/{auto.totalSeats}
            </p>
          </div>

          <div>
            <p className="text-xs text-[#788078] mb-1">
              Booking Type
            </p>
            <p className="text-sm font-semibold text-[#28332D]">
              {auto.bookingMode}
            </p>
          </div>

        </div>


        {/* FARE AND ACTIONS */}

        <div className="flex flex-wrap justify-between items-center gap-3 mt-5 pt-4 border-t border-[#E5EDE6]">

          <div>
            <p className="text-xs text-[#788078]">
              Fare per seat
            </p>

            <p className="text-2xl font-bold text-[#28332D]">
              ₹{auto.fare}
            </p>
          </div>


          <div className="flex flex-wrap gap-2">

            <button
              onClick={() => handleCompare(auto)}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-sm font-semibold transition ${
                isCompared
                  ? "bg-[#E5EDE6] border-[#8FAF9A] text-[#28332D]"
                  : "border-[#DCE3DC] text-[#788078] hover:bg-[#F6F5F0]"
              }`}
            >
              {isCompared ? <FaCheckCircle /> : <FaExchangeAlt />}
              {isCompared ? "Added" : "Compare"}
            </button>

            <button
              onClick={() => handleViewDetails(auto)}
              className="flex items-center gap-2 bg-[#28332D] text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-[#1E2923] transition"
            >
              <FaEye />
              View Details
            </button>

          </div>

        </div>

      </div>
    );
  };


  // --------------------------------------------------
  // EMPTY STATE
  // --------------------------------------------------

  const EmptyState = () => {
    return (
      <div className="bg-white rounded-2xl border border-[#DCE3DC] p-10 text-center">

        <div className="w-16 h-16 rounded-full bg-[#E5EDE6] flex items-center justify-center mx-auto mb-4">
          <FaSearch className="text-2xl text-[#28332D]" />
        </div>

        <h3 className="text-xl font-bold text-[#28332D]">
          No autos found
        </h3>

        <p className="text-sm text-[#788078] mt-2 max-w-md mx-auto">
          We couldn't find any autos matching your selected filters.
          Try changing your pickup point, drop point or other filters.
        </p>

        <button
          onClick={clearFilters}
          className="mt-5 bg-[#28332D] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#1E2923]"
        >
          Clear All Filters
        </button>

      </div>
    );
  };


  // --------------------------------------------------
  // PAGE UI
  // --------------------------------------------------

  return (
    <div className="min-h-screen bg-[#F6F5F0] px-4 sm:px-6 lg:px-8 py-8">

      <div className="max-w-[1500px] mx-auto">

        {/* PAGE HEADING */}

        <div className="mb-7">

          <p className="text-sm font-semibold text-[#8FAF9A] uppercase tracking-wider">
            ShareAuto Chennai
          </p>

          <div className="flex flex-wrap justify-between items-center gap-3 mt-2">

            <div>
              <h1 className="text-3xl font-bold text-[#28332D]">
                Available Autos
              </h1>

              <p className="text-sm text-[#788078] mt-2">
                Find and compare shared autos for your journey.
              </p>
            </div>

            <div className="bg-white border border-[#DCE3DC] rounded-xl px-4 py-3">
              <p className="text-xs text-[#788078]">
                Available rides
              </p>

              <p className="text-2xl font-bold text-[#28332D]">
                {filteredAutos.length}
                <span className="text-sm font-normal text-[#788078]">
                  {" "} / {availableList.length}
                </span>
              </p>
            </div>

          </div>

        </div>


        {/* MAIN CONTENT: AUTOS LEFT, FILTERS RIGHT */}

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_340px] gap-6 items-start">


          {/* LEFT SIDE - AUTO LIST */}

          <main className="min-w-0">

            {/* SORTING AND COMPARE */}

            <div className="bg-white rounded-2xl border border-[#DCE3DC] p-4 mb-5 flex flex-wrap justify-between items-center gap-3">

              <div>
                <h2 className="font-bold text-[#28332D]">
                  Explore available rides
                </h2>

                <p className="text-xs text-[#788078] mt-1">
                  {filteredAutos.length} matching autos
                </p>
              </div>


              <div className="flex flex-wrap items-center gap-3">

                {comparedAutos.length > 0 && (
                  <button
                    onClick={() => navigate("/user/compare-autos")}
                    className="flex items-center gap-2 text-sm font-semibold text-[#28332D] bg-[#E5EDE6] px-3 py-2 rounded-xl"
                  >
                    <FaExchangeAlt />
                    Compare ({comparedAutos.length})
                  </button>
                )}

                <div className="flex items-center gap-2">

                  <FaSortAmountDown className="text-[#8FAF9A]" />

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border border-[#DCE3DC] rounded-xl px-3 py-2 text-sm outline-none focus:border-[#8FAF9A] bg-white"
                  >
                    <option value="recommended">Recommended</option>
                    <option value="lowestFare">Lowest Fare</option>
                    <option value="earliestDeparture">Earliest Departure</option>
                    <option value="highestRating">Highest Rating</option>
                    <option value="shortestWaiting">Shortest Waiting Time</option>
                  </select>

                </div>

              </div>

            </div>


            {/* AUTO CARDS */}

            {filteredAutos.length > 0 ? (

              <div className="space-y-5">

                {filteredAutos.map((auto) => (
                  <AvailableAutoCard
                    key={auto.id}
                    auto={auto}
                  />
                ))}

              </div>

            ) : (

              <EmptyState />

            )}

          </main>


          {/* RIGHT SIDE - FILTERS */}

          <aside className="order-first lg:order-last">
            <FilterPanel />
          </aside>

        </div>

      </div>

    </div>
  );
};

export default AvailableAutos;
