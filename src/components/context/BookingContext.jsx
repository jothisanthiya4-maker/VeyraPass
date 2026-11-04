import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";

// Create React Context for Booking and Commuter Pass data
const BookingContext = createContext(null);

export const BookingProvider = ({ children }) => {
  const navigate = useNavigate();

  // 1. Logged-in User Info from localStorage (useState)
  const [userName, setUserName] = useState(() => {
    return localStorage.getItem("userName") || "User";
  });
  const [userEmail, setUserEmail] = useState(() => {
    return localStorage.getItem("userEmail") || "user@veyrapass.com";
  });
  const [userPhone, setUserPhone] = useState(() => {
    return localStorage.getItem("userPhone") || "+91 98401 23456";
  });
  const [userProfilePic, setUserProfilePic] = useState(() => {
    return localStorage.getItem("userProfilePic") || "";
  });
  const [userHomeStand, setUserHomeStand] = useState(() => {
    return localStorage.getItem("userHomeStand") || "Velachery Vijayanagar Checkpost";
  });
  const [userOfficeStand, setUserOfficeStand] = useState(() => {
    return localStorage.getItem("userOfficeStand") || "Guindy Metro Station Stand";
  });
  const [userRoute, setUserRoute] = useState(() => {
    return localStorage.getItem("userRoute") || "Route 12B: Guindy ⇄ Velachery";
  });
  const [userEmergencyContact, setUserEmergencyContact] = useState(() => {
    return localStorage.getItem("userEmergencyContact") || "+91 98409 87654 (Spouse)";
  });
  const [userAddress, setUserAddress] = useState(() => {
    return (
      localStorage.getItem("userAddress") ||
      "No. 42, 2nd Main Road, Velachery, Chennai - 600042"
    );
  });
  const [notificationsEnabled, setNotificationsEnabled] = useState(() => {
    const saved = localStorage.getItem("notificationsEnabled");
    return saved !== null ? saved === "true" : true;
  });
  const [trackOnNotificationBar, setTrackOnNotificationBar] = useState(() => {
    const saved = localStorage.getItem("trackOnNotificationBar");
    return saved !== null ? saved === "true" : true;
  });

  // 2. Active Subscription Plan (null by default unless explicitly subscribed)
  const [activeSubscription, setActiveSubscription] = useState(() => {
    return localStorage.getItem("activeSubscription") || null;
  });

  // 3. Current Booked Auto State (useState)
  const [currentBooking, setCurrentBooking] = useState(() => {
    const saved = localStorage.getItem("activeBookedAuto");
    if (!saved) return null;
    try {
      return JSON.parse(saved);
    } catch {
      return null;
    }
  });

  // 4. Booking History List (useState)
  const [bookingHistory, setBookingHistory] = useState(() => {
    const saved = localStorage.getItem("bookingHistory");
    if (!saved) return [];
    try {
      return JSON.parse(saved);
    } catch {
      return [];
    }
  });

  // Keep state synced with localStorage (useEffect)
  useEffect(() => {
    if (activeSubscription) {
      localStorage.setItem("activeSubscription", activeSubscription);
    } else {
      localStorage.removeItem("activeSubscription");
    }
  }, [activeSubscription]);

  useEffect(() => {
    if (currentBooking) {
      localStorage.setItem("activeBookedAuto", JSON.stringify(currentBooking));
    } else {
      localStorage.removeItem("activeBookedAuto");
    }
  }, [currentBooking]);

  useEffect(() => {
    localStorage.setItem("bookingHistory", JSON.stringify(bookingHistory));
  }, [bookingHistory]);

  // Memoized Action Handlers (useCallback)
  const handleSubscribe = useCallback((plan) => {
    setActiveSubscription(plan);
    alert(
      plan === "monthly"
        ? "Subscribed to Monthly E-Pass successfully!"
        : "Subscribed to Yearly Early Bird Subscription successfully!"
    );
  }, []);

  const handleConfirmBooking = useCallback((auto, startLoc, destLoc) => {
    const newBooking = {
      id: "BK-" + Math.floor(1000 + Math.random() * 9000),
      driver: auto.driver,
      autoNumber: auto.autoNumber,
      rating: auto.rating,
      phone: auto.phone,
      startLocation: startLoc,
      destination: destLoc,
      fare: auto.passCovered ? "Free (Monthly Pass)" : auto.baseFare,
      eta: auto.eta,
      otp: Math.floor(1000 + Math.random() * 9000).toString(),
      bookedAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      latitude: auto.latitude,
      longitude: auto.longitude,
    };
    setCurrentBooking(newBooking);
    return newBooking;
  }, []);

  const handleCancelBooking = useCallback(() => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      setCurrentBooking(null);
    }
  }, []);

  const handleCompleteRide = useCallback(() => {
    if (!currentBooking) return;
    setBookingHistory((prev) => [currentBooking, ...prev]);
    setCurrentBooking(null);
  }, [currentBooking]);

  const handleClearHistory = useCallback(() => {
    if (window.confirm("Clear all trip history?")) {
      setBookingHistory([]);
    }
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userPhone");
    localStorage.removeItem("userProfilePic");
    localStorage.removeItem("userHomeStand");
    localStorage.removeItem("userOfficeStand");
    localStorage.removeItem("userRoute");
    localStorage.removeItem("userEmergencyContact");
    localStorage.removeItem("userAddress");
    localStorage.removeItem("notificationsEnabled");
    localStorage.removeItem("trackOnNotificationBar");
    navigate("/login");
  }, [navigate]);

  const updateUserProfile = useCallback((updatedFields) => {
    if (updatedFields.name !== undefined) {
      setUserName(updatedFields.name);
      localStorage.setItem("userName", updatedFields.name);
    }
    if (updatedFields.email !== undefined) {
      setUserEmail(updatedFields.email);
      localStorage.setItem("userEmail", updatedFields.email);
    }
    if (updatedFields.phone !== undefined) {
      setUserPhone(updatedFields.phone);
      localStorage.setItem("userPhone", updatedFields.phone);
    }
    if (updatedFields.profilePic !== undefined) {
      setUserProfilePic(updatedFields.profilePic);
      localStorage.setItem("userProfilePic", updatedFields.profilePic);
    }
    if (updatedFields.address !== undefined) {
      setUserAddress(updatedFields.address);
      localStorage.setItem("userAddress", updatedFields.address);
    }
    if (updatedFields.homeStand !== undefined) {
      setUserHomeStand(updatedFields.homeStand);
      localStorage.setItem("userHomeStand", updatedFields.homeStand);
    }
    if (updatedFields.officeStand !== undefined) {
      setUserOfficeStand(updatedFields.officeStand);
      localStorage.setItem("userOfficeStand", updatedFields.officeStand);
    }
    if (updatedFields.route !== undefined) {
      setUserRoute(updatedFields.route);
      localStorage.setItem("userRoute", updatedFields.route);
    }
    if (updatedFields.emergencyContact !== undefined) {
      setUserEmergencyContact(updatedFields.emergencyContact);
      localStorage.setItem("userEmergencyContact", updatedFields.emergencyContact);
    }
    if (updatedFields.notificationsEnabled !== undefined) {
      setNotificationsEnabled(updatedFields.notificationsEnabled);
      localStorage.setItem("notificationsEnabled", String(updatedFields.notificationsEnabled));
    }
    if (updatedFields.trackOnNotificationBar !== undefined) {
      setTrackOnNotificationBar(updatedFields.trackOnNotificationBar);
      localStorage.setItem("trackOnNotificationBar", String(updatedFields.trackOnNotificationBar));
    }
  }, []);

  const handleTrackAuto = useCallback((booking) => {
    const target = booking || currentBooking;
    if (!target) return;
    const originLat = target.latitude || 13.0067;
    const originLng = target.longitude || 80.2052;
    const gmapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${originLat},${originLng}&destination=${encodeURIComponent(
      target.destination || "Velachery Vijayanagar"
    )}&travelmode=driving`;
    window.open(gmapsUrl, "_blank", "noopener,noreferrer");
  }, [currentBooking]);

  // Compute User Initials and Profile Data (useMemo)
  const user = useMemo(() => {
    const getInitials = (name) => {
      if (!name || name === "User") return "U";
      const parts = name.trim().split(" ");
      if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    };

    return {
      name: userName,
      email: userEmail,
      phone: userPhone,
      profilePic: userProfilePic,
      address: userAddress,
      homeStand: userHomeStand,
      officeStand: userOfficeStand,
      route: userRoute,
      emergencyContact: userEmergencyContact,
      notificationsEnabled,
      trackOnNotificationBar,
      initials: getInitials(userName),
      passId: "VP-2026-8891",
      passType: activeSubscription
        ? activeSubscription === "monthly"
          ? "Monthly Unlimited"
          : "Yearly Unlimited"
        : "No Active Pass",
      validUntil: activeSubscription ? "25 Nov 2026" : "Not Subscribed",
      daysRemaining: activeSubscription ? 18 : 0,
      ridesThisMonth: 34,
      walletBalance: 450,
    };
  }, [
    userName,
    userEmail,
    userPhone,
    userProfilePic,
    userAddress,
    userHomeStand,
    userOfficeStand,
    userRoute,
    userEmergencyContact,
    notificationsEnabled,
    trackOnNotificationBar,
    activeSubscription,
  ]);

  // Memoized context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      user,
      activeSubscription,
      currentBooking,
      bookingHistory,
      notificationsEnabled,
      trackOnNotificationBar,
      handleSubscribe,
      handleConfirmBooking,
      handleCancelBooking,
      handleCompleteRide,
      handleClearHistory,
      handleLogout,
      handleTrackAuto,
      updateUserProfile,
    }),
    [
      user,
      activeSubscription,
      currentBooking,
      bookingHistory,
      notificationsEnabled,
      trackOnNotificationBar,
      handleSubscribe,
      handleConfirmBooking,
      handleCancelBooking,
      handleCompleteRide,
      handleClearHistory,
      handleLogout,
      handleTrackAuto,
      updateUserProfile,
    ]
  );

  return (
    <BookingContext.Provider value={contextValue}>
      {children}
    </BookingContext.Provider>
  );
};

// Custom Hook to consume BookingContext (useContext)
export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
};

export default BookingContext;
