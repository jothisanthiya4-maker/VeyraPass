
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaCar,
  FaUser,
  FaRupeeSign,
  FaTicketAlt,
  FaArrowRight,
  FaTimes,
  FaCheckCircle,
  FaRoute,
  FaReceipt,
  FaStar,
  FaInfoCircle,
  FaFilter,
  FaBan,
} from "react-icons/fa";
import { useAuto } from "../../context/AutoContext";

const tabs = [
  { label: "Upcoming", value: "upcoming" },
  { label: "Ongoing", value: "ongoing" },
  { label: "Completed", value: "completed" },
  { label: "Cancelled", value: "cancelled" },
];

const statusStyles = {
  confirmed: "bg-green-100 text-green-700",
  ongoing: "bg-blue-100 text-blue-700",
  completed: "bg-gray-100 text-gray-700",
  cancelled: "bg-red-100 text-red-700",
  pending: "bg-yellow-100 text-yellow-700",
};

const getStatus = (booking) => {
  const status = String(
    booking.bookingStatus || booking.status || "Confirmed"
  ).toLowerCase();

  if (status.includes("cancel")) return "cancelled";
  if (status.includes("ongoing") || status.includes("progress")) {
    return "ongoing";
  }
  if (status.includes("complete") || status.includes("finished")) {
    return "completed";
  }
  if (status.includes("pending")) return "pending";

  return "confirmed";
};

const formatDate = (date) => {
  if (!date) return "Date not specified";

  const parsedDate = new Date(date);
  if (Number.isNaN(parsedDate.getTime())) return date;

  return parsedDate.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const formatTime = (time) => {
  if (!time) return "Time not specified";

  // Supports values such as "14:30" and "2:30 PM".
  if (String(time).toUpperCase().includes("AM") ||
      String(time).toUpperCase().includes("PM")) {
    return time;
  }

  const [hours, minutes] = String(time).split(":");
  if (hours === undefined || minutes === undefined) return time;

  const date = new Date();
  date.setHours(Number(hours), Number(minutes), 0, 0);

  return date.toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
  });
};

const MyBookings = () => {
  const navigate = useNavigate();
  const { bookings = [], setBookings } = useAuto();

  const [activeTab, setActiveTab] = useState("upcoming");
  const [searchTerm, setSearchTerm] = useState("");
  const [bookingMode, setBookingMode] = useState("All");
  const [travelDate, setTravelDate] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [modalType, setModalType] = useState("");
  const [toast, setToast] = useState("");

  const getTabCategory = (status) => {
    if (status === "confirmed" || status === "pending") return "upcoming";
    return status;
  };

  const tabCounts = useMemo(() => {
    const counts = {
      upcoming: 0,
      ongoing: 0,
      completed: 0,
      cancelled: 0,
    };

    bookings.forEach((booking) => {
      const status = getStatus(booking);
      const category = getTabCategory(status);
      if (counts[category] !== undefined) counts[category] += 1;
    });

    return counts;
  }, [bookings]);

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const status = getStatus(booking);
      const category = getTabCategory(status);

      const matchesTab = category === activeTab;

      const bookingId = String(
        booking.bookingId || booking.id || ""
      ).toLowerCase();

      const matchesSearch = bookingId.includes(
        searchTerm.trim().toLowerCase()
      );

      const mode = String(booking.bookingMode || "Scheduled").toLowerCase();
      const matchesMode =
        bookingMode === "All" ||
        mode === bookingMode.toLowerCase();

      const date = booking.journeyDate || booking.travelDate || "";
      const matchesDate = !travelDate || date === travelDate;

      const matchesStatus =
        statusFilter === "All" ||
        status === statusFilter.toLowerCase();

      return (
        matchesTab &&
        matchesSearch &&
        matchesMode &&
        matchesDate &&
        matchesStatus
      );
    });
  }, [
    bookings,
    activeTab,
    searchTerm,
    bookingMode,
    travelDate,
    statusFilter,
  ]);

  const clearFilters = () => {
    setSearchTerm("");
    setBookingMode("All");
    setTravelDate("");
    setStatusFilter("All");
  };

  const showToast = (message) => {
    setToast(message);
  };

  const closeModal = () => {
    setSelectedBooking(null);
    setModalType("");
  };

  const openModal = (booking, type) => {
    setSelectedBooking(booking);
    setModalType(type);
  };

  const cancelBooking = (booking) => {
    const confirmed = window.confirm(
      `Are you sure you want to cancel booking ${
        booking.bookingId || booking.id
      }?`
    );

    if (!confirmed) return;

    setBookings((previous) =>
      previous.map((item) => {
        const sameBooking =
          String(item.bookingId || item.id) ===
          String(booking.bookingId || booking.id);

        return sameBooking
          ? { ...item, bookingStatus: "Cancelled" }
          : item;
      })
    );

    closeModal();
    showToast("Your booking has been cancelled.");
  };

  const handleAction = (booking, action) => {
    switch (action) {
      case "View Details":
        openModal(booking, "details");
        break;

      case "View Pass":
        openModal(booking, "pass");
        break;

      case "Cancel":
        cancelBooking(booking);
        break;

      case "View Journey":
        openModal(booking, "journey");
        break;

      case "Receipt":
        openModal(booking, "receipt");
        break;

      case "Rate Driver":
        openModal(booking, "rating");
        break;

      case "Refund Details":
        openModal(booking, "refund");
        break;

      default:
        break;
    }
  };

  const getActions = (status) => {
    switch (status) {
      case "confirmed":
      case "pending":
        return ["View Details", "View Pass", "Cancel"];

      case "ongoing":
        return ["View Journey", "View Pass"];

      case "completed":
        return ["View Details", "Receipt", "Rate Driver"];

      case "cancelled":
        return ["View Details", "Refund Details"];

      default:
        return ["View Details"];
    }
  };

  const getActionIcon = (action) => {
    const icons = {
      "View Details": <FaInfoCircle />,
      "View Pass": <FaTicketAlt />,
      Cancel: <FaBan />,
      "View Journey": <FaRoute />,
      Receipt: <FaReceipt />,
      "Rate Driver": <FaStar />,
      "Refund Details": <FaRupeeSign />,
    };

    return icons[action];
  };

  const getStatusLabel = (status) => {
    const labels = {
      confirmed: "Confirmed",
      pending: "Pending",
      ongoing: "Ongoing",
      completed: "Completed",
      cancelled: "Cancelled",
    };

    return labels[status] || status;
  };

  const getBookingId = (booking) =>
    booking.bookingId || booking.id || "N/A";

  const getFare = (booking) =>
    booking.totalFare ?? booking.fare ?? 0;

  const getDriverName = (booking) =>
    booking.driverName || booking.driver?.name || "Driver details pending";

  const getVehicleNumber = (booking) =>
    booking.vehicleNumber || booking.registrationNumber || "Not assigned";

  const getPickup = (booking) =>
    booking.pickup || booking.pickupPoint || "Pickup not specified";

  const getDestination = (booking) =>
    booking.destination || booking.dropPoint || "Destination not specified";

  const getDate = (booking) =>
    booking.journeyDate || booking.travelDate || "";

  const getTime = (booking) =>
    booking.departureTime || booking.travelTime || "";

  const getMode = (booking) => {
    const mode = booking.bookingMode || "Scheduled";
    return mode.charAt(0).toUpperCase() + mode.slice(1).toLowerCase();
  };

  const getEmptyMessage = () => {
    const messages = {
      upcoming: "You don't have any upcoming rides.",
      ongoing: "You don't have any rides in progress.",
      completed: "You haven't completed any rides yet.",
      cancelled: "You don't have any cancelled bookings.",
    };

    return messages[activeTab];
  };

  return (
    <div className="min-h-screen bg-[#F6F5F0] px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[2px] text-[#8FAF9A]">
              Passenger Dashboard
            </p>

            <h1 className="text-3xl font-bold text-[#28332D] sm:text-4xl">
              My Bookings
            </h1>

            <p className="mt-2 text-sm text-[#788078] sm:text-base">
              Manage your rides, track journeys and view your booking history.
            </p>
          </div>

          <button
            onClick={() => navigate("/user/available-autos")}
            className="flex items-center justify-center gap-2 rounded-xl bg-[#28332D] px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-[#1E2923]"
          >
            Find an Auto
            <FaArrowRight className="text-sm" />
          </button>
        </div>

        {/* Booking Summary */}
        <div className="mb-7 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {tabs.map((tab) => (
            <div
              key={tab.value}
              className="rounded-2xl border border-[#DCE3DC] bg-white p-4 shadow-sm"
            >
              <p className="text-sm text-[#788078]">{tab.label}</p>
              <p className="mt-1 text-2xl font-bold text-[#28332D]">
                {tabCounts[tab.value]}
              </p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="mb-6 overflow-x-auto">
          <div className="flex min-w-max gap-2 rounded-2xl border border-[#DCE3DC] bg-white p-2">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition ${
                  activeTab === tab.value
                    ? "bg-[#28332D] text-white shadow-sm"
                    : "text-[#788078] hover:bg-[#E5EDE6] hover:text-[#28332D]"
                }`}
              >
                {tab.label}
                <span
                  className={`rounded-full px-2 py-0.5 text-xs ${
                    activeTab === tab.value
                      ? "bg-white/20 text-white"
                      : "bg-[#E5EDE6] text-[#28332D]"
                  }`}
                >
                  {tabCounts[tab.value]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-7 rounded-2xl border border-[#DCE3DC] bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <FaFilter className="text-[#8FAF9A]" />
            <h2 className="font-bold text-[#28332D]">Search & Filter</h2>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Search */}
            <div>
              <label className="mb-2 block text-sm font-medium text-[#566158]">
                Search Booking ID
              </label>
              <div className="flex items-center gap-2 rounded-xl border border-[#DCE3DC] bg-[#F6F5F0] px-3 focus-within:border-[#8FAF9A]">
                <FaSearch className="text-sm text-[#8A958B]" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Enter booking ID"
                  className="w-full bg-transparent py-3 text-sm text-[#28332D] outline-none placeholder:text-[#A0A89F]"
                />
              </div>
            </div>

            {/* Booking Mode */}
            <div>
              <label className="mb-2 block text-sm font-medium text-[#566158]">
                Booking Type
              </label>
              <select
                value={bookingMode}
                onChange={(e) => setBookingMode(e.target.value)}
                className="w-full rounded-xl border border-[#DCE3DC] bg-[#F6F5F0] px-3 py-3 text-sm text-[#28332D] outline-none focus:border-[#8FAF9A]"
              >
                <option value="All">All Types</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Instant">Instant</option>
              </select>
            </div>

            {/* Travel Date */}
            <div>
              <label className="mb-2 block text-sm font-medium text-[#566158]">
                Travel Date
              </label>
              <input
                type="date"
                value={travelDate}
                onChange={(e) => setTravelDate(e.target.value)}
                className="w-full rounded-xl border border-[#DCE3DC] bg-[#F6F5F0] px-3 py-3 text-sm text-[#28332D] outline-none focus:border-[#8FAF9A]"
              />
            </div>

            {/* Status */}
            <div>
              <label className="mb-2 block text-sm font-medium text-[#566158]">
                Booking Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full rounded-xl border border-[#DCE3DC] bg-[#F6F5F0] px-3 py-3 text-sm text-[#28332D] outline-none focus:border-[#8FAF9A]"
              >
                <option value="All">All Statuses</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Pending">Pending</option>
                <option value="Ongoing">Ongoing</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <button
              onClick={clearFilters}
              className="text-sm font-semibold text-[#68776B] transition hover:text-[#28332D]"
            >
              Clear all filters
            </button>
          </div>
        </div>

        {/* Booking List */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#28332D]">
            {tabs.find((tab) => tab.value === activeTab)?.label} Rides
          </h2>

          <span className="text-sm text-[#788078]">
            {filteredBookings.length}{" "}
            {filteredBookings.length === 1 ? "booking" : "bookings"}
          </span>
        </div>

        {filteredBookings.length > 0 ? (
          <div className="space-y-5">
            {filteredBookings.map((booking) => {
              const status = getStatus(booking);
              const actions = getActions(status);

              return (
                <div
                  key={getBookingId(booking)}
                  className="overflow-hidden rounded-2xl border border-[#DCE3DC] bg-white shadow-sm transition hover:shadow-md"
                >
                  {/* Card Header */}
                  <div className="flex flex-col justify-between gap-3 border-b border-[#E9EDE8] bg-[#FBFCF9] px-5 py-4 sm:flex-row sm:items-center">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-[#89948A]">
                        Booking ID
                      </p>
                      <p className="mt-1 font-bold text-[#28332D]">
                        #{getBookingId(booking)}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <span
                        className={`rounded-full px-3 py-1.5 text-xs font-bold ${
                          statusStyles[status] || statusStyles.confirmed
                        }`}
                      >
                        {getStatusLabel(status)}
                      </span>

                      <span className="rounded-full bg-[#E5EDE6] px-3 py-1.5 text-xs font-semibold text-[#48614E]">
                        {getMode(booking)} Ride
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="grid grid-cols-1 gap-6 p-5 lg:grid-cols-[1fr_230px]">
                    <div>
                      {/* Route */}
                      <div className="mb-6 grid grid-cols-[24px_1fr] gap-x-3">
                        <div className="flex flex-col items-center">
                          <span className="mt-1 h-3 w-3 rounded-full border-[3px] border-[#8FAF9A] bg-white" />
                          <span className="my-1 h-10 border-l-2 border-dashed border-[#C5D6C9]" />
                          <span className="h-3 w-3 rounded-full bg-[#28332D]" />
                        </div>

                        <div className="space-y-5">
                          <div>
                            <p className="text-xs text-[#89948A]">PICKUP</p>
                            <p className="mt-1 font-semibold text-[#28332D]">
                              {getPickup(booking)}
                            </p>
                          </div>

                          <div>
                            <p className="text-xs text-[#89948A]">
                              DESTINATION
                            </p>
                            <p className="mt-1 font-semibold text-[#28332D]">
                              {getDestination(booking)}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Details */}
                      <div className="grid grid-cols-1 gap-4 border-t border-[#E9EDE8] pt-5 sm:grid-cols-2 xl:grid-cols-4">
                        <div className="flex items-start gap-3">
                          <div className="rounded-lg bg-[#E5EDE6] p-2 text-[#48614E]">
                            <FaCalendarAlt />
                          </div>
                          <div>
                            <p className="text-xs text-[#89948A]">Travel Date</p>
                            <p className="mt-1 text-sm font-semibold text-[#28332D]">
                              {formatDate(getDate(booking))}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="rounded-lg bg-[#E5EDE6] p-2 text-[#48614E]">
                            <FaClock />
                          </div>
                          <div>
                            <p className="text-xs text-[#89948A]">Departure</p>
                            <p className="mt-1 text-sm font-semibold text-[#28332D]">
                              {formatTime(getTime(booking))}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="rounded-lg bg-[#E5EDE6] p-2 text-[#48614E]">
                            <FaUser />
                          </div>
                          <div>
                            <p className="text-xs text-[#89948A]">Driver</p>
                            <p className="mt-1 text-sm font-semibold text-[#28332D]">
                              {getDriverName(booking)}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="rounded-lg bg-[#E5EDE6] p-2 text-[#48614E]">
                            <FaCar />
                          </div>
                          <div>
                            <p className="text-xs text-[#89948A]">Vehicle No.</p>
                            <p className="mt-1 text-sm font-semibold text-[#28332D]">
                              {getVehicleNumber(booking)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Fare and Actions */}
                    <div className="flex flex-col justify-between border-t border-[#E9EDE8] pt-5 lg:border-l lg:border-t-0 lg:pl-5 lg:pt-0">
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-[#89948A]">
                          Total Fare
                        </p>

                        <p className="mt-1 flex items-center text-2xl font-bold text-[#28332D]">
                          <FaRupeeSign className="mr-1 text-lg" />
                          {getFare(booking)}
                        </p>
                      </div>

                      <div className="mt-5 flex flex-wrap gap-2 lg:flex-col">
                        {actions.map((action) => (
                          <button
                            key={action}
                            onClick={() => handleAction(booking, action)}
                            className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-xs font-semibold transition lg:flex-none ${
                              action === "Cancel"
                                ? "border border-red-200 text-red-600 hover:bg-red-50"
                                : action === "View Details"
                                ? "bg-[#28332D] text-white hover:bg-[#1E2923]"
                                : "border border-[#C5D6C9] text-[#48614E] hover:bg-[#E5EDE6]"
                            }`}
                          >
                            {getActionIcon(action)}
                            {action}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="rounded-2xl border border-dashed border-[#C5D6C9] bg-white px-5 py-14 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#E5EDE6] text-2xl text-[#48614E]">
              <FaTicketAlt />
            </div>

            <h3 className="mt-5 text-xl font-bold text-[#28332D]">
              No bookings found
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#788078]">
              {searchTerm || bookingMode !== "All" || travelDate || statusFilter !== "All"
                ? "No bookings match your current search or filters. Try changing or clearing your filters."
                : getEmptyMessage()}
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {(searchTerm || bookingMode !== "All" || travelDate || statusFilter !== "All") && (
                <button
                  onClick={clearFilters}
                  className="rounded-xl border border-[#C5D6C9] px-5 py-3 text-sm font-semibold text-[#48614E] transition hover:bg-[#E5EDE6]"
                >
                  Clear Filters
                </button>
              )}

              <button
                onClick={() => navigate("/user/available-autos")}
                className="flex items-center gap-2 rounded-xl bg-[#28332D] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1E2923]"
              >
                Find an Auto
                <FaArrowRight />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Booking Action Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#E9EDE8] px-5 py-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#8FAF9A]">
                  Booking #{getBookingId(selectedBooking)}
                </p>
                <h3 className="mt-1 text-xl font-bold text-[#28332D]">
                  {modalType === "details" && "Booking Details"}
                  {modalType === "pass" && "Your Ride Pass"}
                  {modalType === "journey" && "Journey Information"}
                  {modalType === "receipt" && "Payment Receipt"}
                  {modalType === "rating" && "Rate Your Driver"}
                  {modalType === "refund" && "Refund Information"}
                </h3>
              </div>

              <button
                onClick={closeModal}
                className="rounded-full p-2 text-[#788078] transition hover:bg-[#E5EDE6] hover:text-[#28332D]"
              >
                <FaTimes />
              </button>
            </div>

            <div className="space-y-4 p-5">
              {modalType === "rating" ? (
                <RatingContent
                  driverName={getDriverName(selectedBooking)}
                  onSubmit={() => {
                    closeModal();
                    showToast("Thank you for rating your driver!");
                  }}
                />
              ) : (
                <>
                  <div className="rounded-xl bg-[#F6F5F0] p-4">
                    <p className="text-xs text-[#89948A]">ROUTE</p>
                    <p className="mt-2 font-semibold text-[#28332D]">
                      {getPickup(selectedBooking)}
                    </p>
                    <p className="my-1 text-xs text-[#8FAF9A]">TO</p>
                    <p className="font-semibold text-[#28332D]">
                      {getDestination(selectedBooking)}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Detail label="Travel Date" value={formatDate(getDate(selectedBooking))} />
                    <Detail label="Departure" value={formatTime(getTime(selectedBooking))} />
                    <Detail label="Driver" value={getDriverName(selectedBooking)} />
                    <Detail label="Vehicle" value={getVehicleNumber(selectedBooking)} />
                    <Detail label="Booking Type" value={getMode(selectedBooking)} />
                    <Detail label="Status" value={getStatusLabel(getStatus(selectedBooking))} />
                  </div>

                  <div className="flex items-center justify-between rounded-xl bg-[#E5EDE6] p-4">
                    <span className="font-semibold text-[#48614E]">Total Fare</span>
                    <span className="flex items-center text-xl font-bold text-[#28332D]">
                      <FaRupeeSign className="mr-1 text-sm" />
                      {getFare(selectedBooking)}
                    </span>
                  </div>

                  {modalType === "pass" && (
                    <p className="text-sm leading-6 text-[#788078]">
                      Keep your booking ID ready when boarding. This screen displays your ride booking information.
                    </p>
                  )}

                  {modalType === "receipt" && (
                    <p className="text-sm leading-6 text-[#788078]">
                      This is a booking fare summary for your completed ride. Online payment and downloadable receipts can be connected when payment functionality is implemented.
                    </p>
                  )}

                  {modalType === "refund" && (
                    <p className="text-sm leading-6 text-[#788078]">
                      Your booking is marked as cancelled. Actual refund amount and processing status will be available once refund processing is connected.
                    </p>
                  )}

                  {modalType === "journey" && (
                    <p className="text-sm leading-6 text-[#788078]">
                      Your journey details are shown above. Live location tracking can be connected to this section later.
                    </p>
                  )}
                </>
              )}
            </div>

            {modalType !== "rating" && (
              <div className="border-t border-[#E9EDE8] px-5 py-4">
                <button
                  onClick={closeModal}
                  className="w-full rounded-xl bg-[#28332D] py-3 font-semibold text-white transition hover:bg-[#1E2923]"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed right-5 top-5 z-[60] flex max-w-sm items-center gap-3 rounded-xl bg-[#28332D] px-5 py-4 text-sm font-medium text-white shadow-xl">
          <FaCheckCircle className="shrink-0 text-[#A9C8AE]" />
          <span>{toast}</span>
          <button
            onClick={() => setToast("")}
            className="ml-2 text-white/70 hover:text-white"
          >
            <FaTimes />
          </button>
        </div>
      )}
    </div>
  );
};

/* Small reusable detail item */
const Detail = ({ label, value }) => (
  <div className="rounded-xl border border-[#E5EDE6] p-3">
    <p className="text-xs text-[#89948A]">{label}</p>
    <p className="mt-1 break-words text-sm font-semibold text-[#28332D]">
      {value || "Not available"}
    </p>
  </div>
);

/* Rating form */
const RatingContent = ({ driverName, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  return (
    <div>
      <p className="text-sm text-[#788078]">
        How was your experience with {driverName}?
      </p>

      <div className="my-5 flex justify-center gap-3">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => setRating(star)}
            className={`text-3xl transition ${
              rating >= star ? "text-yellow-400" : "text-gray-300"
            }`}
          >
            <FaStar />
          </button>
        ))}
      </div>

      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        rows="3"
        placeholder="Share your experience (optional)"
        className="w-full resize-none rounded-xl border border-[#DCE3DC] p-3 text-sm text-[#28332D] outline-none focus:border-[#8FAF9A]"
      />

      <button
        disabled={rating === 0}
        onClick={onSubmit}
        className="mt-4 w-full rounded-xl bg-[#28332D] py-3 font-semibold text-white transition hover:bg-[#1E2923] disabled:cursor-not-allowed disabled:opacity-40"
      >
        Submit Rating
      </button>
    </div>
  );
};

export default MyBookings;
