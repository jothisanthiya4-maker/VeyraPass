import React, {
  useState,
  useRef,
  useCallback,
  useMemo,
  useEffect
} from "react";
import { useNavigate, useLocation, useSearchParams, Link } from "react-router-dom";
import { useBooking } from "../../components/context/BookingContext";

const Dashboard = () => {
  // 1. React Router DOM Hooks (useNavigate, useLocation, useSearchParams)
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  // Active Tab state synced with URL query parameter (?tab=...) via react-router-dom
  const activeTab = searchParams.get("tab") || "dashboard";
  const setActiveTab = useCallback(
    (tab) => {
      setSearchParams({ tab }, { replace: true });
    },
    [setSearchParams]
  );

  // 2. React Context Hook (useContext via useBooking)
  const {
    user,
    activeSubscription,
    currentBooking,
    bookingHistory,
    handleSubscribe,
    handleConfirmBooking,
    handleCancelBooking,
    handleCompleteRide,
    handleClearHistory,
    handleLogout,
    handleTrackAuto,
    updateUserProfile,
  } = useBooking();

  // 3. Local Component UI States (useState)
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [isAnimatingAuto, setIsAnimatingAuto] = useState(false);
  const [startLocation, setStartLocation] = useState("Guindy Metro Station (Race Course Stand)");
  const [destination, setDestination] = useState("Velachery Vijayanagar (Checkpost Stand)");
  const [selectedAuto, setSelectedAuto] = useState(null);
  const [bookingSuccessModal, setBookingSuccessModal] = useState(null);
  const [copiedOtp, setCopiedOtp] = useState(false);

  // Profile Settings Form State (useState)
  const [profileForm, setProfileForm] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone || "+91 98401 23456",
    address: user.address || "No. 42, 2nd Main Road, Velachery, Chennai - 600042",
    profilePic: user.profilePic || "",
    notificationsEnabled: user.notificationsEnabled ?? true,
    trackOnNotificationBar: user.trackOnNotificationBar ?? true,
  });
  const [saveSuccessMsg, setSaveSuccessMsg] = useState("");

  // 4. React DOM & Timer References (useRef)
  const animationTimerRef = useRef(null);
  const mainContentRef = useRef(null);
  const qrModalRef = useRef(null);
  const fileInputRef = useRef(null);

  // Sync profile form state whenever user context updates (useEffect)
  useEffect(() => {
    setProfileForm({
      name: user.name,
      email: user.email,
      phone: user.phone || "+91 98401 23456",
      address: user.address || "No. 42, 2nd Main Road, Velachery, Chennai - 600042",
      profilePic: user.profilePic || "",
      notificationsEnabled: user.notificationsEnabled ?? true,
      trackOnNotificationBar: user.trackOnNotificationBar ?? true,
    });
  }, [user]);

  // Photo upload handler using FileReader (useCallback)
  const handlePhotoUpload = useCallback((e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("Please choose an image file under 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const base64Data = reader.result;
      setProfileForm((prev) => ({ ...prev, profilePic: base64Data }));
    };
    reader.readAsDataURL(file);
  }, []);

  // Remove photo and reset input (useCallback)
  const handleRemovePhoto = useCallback(() => {
    setProfileForm((prev) => ({ ...prev, profilePic: "" }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, []);

  // Notification toggles handlers (useCallback)
  const handleToggleNotifications = useCallback(() => {
    setProfileForm((prev) => {
      const next = !prev.notificationsEnabled;
      if (next && "Notification" in window && Notification.permission !== "granted") {
        Notification.requestPermission().catch(() => {});
      }
      return { ...prev, notificationsEnabled: next };
    });
  }, []);

  const handleToggleTrackOnNotificationBar = useCallback(() => {
    setProfileForm((prev) => {
      const next = !prev.trackOnNotificationBar;
      if (next && "Notification" in window && Notification.permission !== "granted") {
        Notification.requestPermission().catch(() => {});
      }
      return { ...prev, trackOnNotificationBar: next };
    });
  }, []);

  // Background auto tracking in device notification bar when tab/app is hidden or closed (useEffect)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && profileForm.trackOnNotificationBar && currentBooking) {
        if ("Notification" in window && Notification.permission === "granted") {
          try {
            new Notification(`🛺 ${currentBooking.driver} is on the way!`, {
              body: `Live Commute: ${currentBooking.startLocation} ➔ ${currentBooking.destination} | Boarding OTP: ${currentBooking.otp}`,
              icon: "/favicon.ico",
              tag: "veyrapass-ride-tracking",
            });
          } catch (err) {
            // Notification handler fallback
          }
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [profileForm.trackOnNotificationBar, currentBooking]);

  // Save profile changes to Context & localStorage (useCallback)
  const handleSaveProfile = useCallback(
    (e) => {
      e.preventDefault();
      updateUserProfile(profileForm);
      setSaveSuccessMsg("Settings updated successfully! ✓");
      setTimeout(() => {
        setSaveSuccessMsg("");
      }, 3000);
    },
    [profileForm, updateUserProfile]
  );

  // Clean up animation timeout on component unmount (useRef + useEffect)
  useEffect(() => {
    return () => {
      if (animationTimerRef.current) {
        clearTimeout(animationTimerRef.current);
      }
    };
  }, []);

  // Smooth scroll main container to top when changing tabs (useRef + useEffect)
  useEffect(() => {
    if (mainContentRef.current) {
      mainContentRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [activeTab]);

  // 5. Memoized Event Handlers (useCallback)
  const handleOpenBooking = useCallback(() => {
    setSidebarOpen(false);
    setIsAnimatingAuto(true);
    if (animationTimerRef.current) {
      clearTimeout(animationTimerRef.current);
    }
    animationTimerRef.current = setTimeout(() => {
      setIsAnimatingAuto(false);
      setActiveTab("booking");
    }, 3800); // 3.8s slow realistic animation
  }, [setActiveTab]);

  const handleConfirmBookingAction = useCallback(
    (auto) => {
      const booking = handleConfirmBooking(auto, startLocation, destination);
      setSelectedAuto(auto);
      setBookingSuccessModal(booking);
    },
    [handleConfirmBooking, startLocation, destination]
  );

  // 6. Memoized Available Autos List with realistic Chennai driver details (useMemo)
  const availableAutos = useMemo(
    () => [
      {
        id: "AUTO-1",
        driver: "Selvam M.",
        badge: "Chennai Auto Union #1042",
        rating: "4.9",
        autoNumber: "TN 09 AZ 4421",
        model: "Bajaj Compact 4S (Yellow-Top)",
        fcValid: "FC Valid till Oct 2027",
        eta: "2 mins away",
        distance: "350 meters from Stand",
        seatsAvailable: 2,
        seatLayout: "2 back bench seats open",
        baseFare: "₹ 25.00",
        passCovered: !!activeSubscription,
        phone: "+91 98840 11223",
        latitude: 13.0067,
        longitude: 80.2052,
      },
      {
        id: "AUTO-2",
        driver: "Kumaravel P.",
        badge: "Corridor Specialist (8 yrs)",
        rating: "4.8",
        autoNumber: "TN 01 BX 8812",
        model: "Piaggio Ape City Plus",
        fcValid: "FC Valid till Jan 2028",
        eta: "4 mins away",
        distance: "800 meters from Stand",
        seatsAvailable: 3,
        seatLayout: "1 front + 2 rear seats open",
        baseFare: "₹ 25.00",
        passCovered: !!activeSubscription,
        phone: "+91 98410 44556",
        latitude: 13.0089,
        longitude: 80.2105,
      },
      {
        id: "AUTO-3",
        driver: "Murugan S.",
        badge: "Green Permit Certified",
        rating: "4.7",
        autoNumber: "TN 02 CE 1290",
        model: "Bajaj RE Maxima",
        fcValid: "FC Valid till Dec 2026",
        eta: "6 mins away",
        distance: "1.2 km from Stand",
        seatsAvailable: 1,
        seatLayout: "1 rear window seat open",
        baseFare: "₹ 20.00",
        passCovered: false,
        phone: "+91 94440 99881",
        latitude: 12.9815,
        longitude: 80.218,
      },
    ],
    [activeSubscription]
  );

  const initials = user.initials;

  return (
    <div className="min-h-screen flex bg-[#F7F5EF] text-[#29332E] font-sans antialiased relative">
      {/* ================= INLINE KEYFRAME ANIMATIONS & RETRO FUNKY DISPLAY FONTS ================= */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Shrikhand&family=Righteous&family=Space+Grotesk:wght@500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        .font-woop {
          font-family: 'Shrikhand', cursive, serif;
          letter-spacing: 0.02em;
        }

        .font-retro {
          font-family: 'Righteous', cursive, sans-serif;
          letter-spacing: 0.04em;
        }

        .font-grotesk {
          font-family: 'Space Grotesk', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .retro-oval-badge {
          background-color: #29332E;
          color: #F7F5EF;
          border-radius: 9999px;
          font-family: 'Righteous', sans-serif;
          font-size: 0.68rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.28rem 0.85rem;
          box-shadow: 0 4px 10px rgba(41, 51, 46, 0.25);
          border: 1px solid rgba(247, 245, 239, 0.2);
        }

        .retro-oval-badge-light {
          background-color: #F7F5EF;
          color: #29332E;
          border-radius: 9999px;
          font-family: 'Righteous', sans-serif;
          font-size: 0.68rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.28rem 0.85rem;
          box-shadow: 0 2px 8px rgba(41, 51, 46, 0.15);
          border: 1.5px solid #29332E;
        }

        .retro-oval-badge-sage {
          background-color: #8FAF9A;
          color: #29332E;
          border-radius: 9999px;
          font-family: 'Righteous', sans-serif;
          font-size: 0.68rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.28rem 0.85rem;
          box-shadow: 0 2px 8px rgba(41, 51, 46, 0.15);
        }

        @keyframes autoDriveSlow {
          0% {
            transform: translateX(-120vw);
          }
          100% {
            transform: translateX(115vw);
          }
        }

        @keyframes chassisVibration {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-2.5px) rotate(0.4deg); }
          50% { transform: translateY(1.5px) rotate(-0.3deg); }
          75% { transform: translateY(-1px) rotate(0.2deg); }
        }

        @keyframes cloudBillow1 {
          0% {
            opacity: 0;
            transform: translate(0, 0) scale(0.25) rotate(0deg);
          }
          12% {
            opacity: 0.95;
            transform: translate(-18px, -8px) scale(0.65) rotate(12deg);
          }
          45% {
            opacity: 0.8;
            transform: translate(-55px, -20px) scale(1.4) rotate(28deg);
          }
          80% {
            opacity: 0.4;
            transform: translate(-100px, -35px) scale(2.2) rotate(48deg);
          }
          100% {
            opacity: 0;
            transform: translate(-140px, -45px) scale(2.8) rotate(65deg);
          }
        }

        @keyframes cloudBillow2 {
          0% {
            opacity: 0;
            transform: translate(0, 0) scale(0.2) rotate(0deg);
          }
          12% {
            opacity: 0.9;
            transform: translate(-15px, -5px) scale(0.6) rotate(-10deg);
          }
          45% {
            opacity: 0.75;
            transform: translate(-50px, -15px) scale(1.3) rotate(-22deg);
          }
          80% {
            opacity: 0.35;
            transform: translate(-90px, -25px) scale(2.0) rotate(-38deg);
          }
          100% {
            opacity: 0;
            transform: translate(-130px, -35px) scale(2.5) rotate(-52deg);
          }
        }

        @keyframes wheelSpinSlow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes roadDashesSlow {
          0% { background-position: 0 0; }
          100% { background-position: -500px 0; }
        }

        /* React Bits Inspired Avatar & Card Animations */
        @keyframes spinConic {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes avatarHaloGlow {
          0%, 100% {
            box-shadow: 0 0 25px rgba(143, 175, 154, 0.45), 0 0 50px rgba(143, 175, 154, 0.2);
          }
          50% {
            box-shadow: 0 0 45px rgba(143, 175, 154, 0.8), 0 0 80px rgba(143, 175, 154, 0.4);
          }
        }

        @keyframes textShimmer {
          0% { background-position: 100% center; }
          100% { background-position: -100% center; }
        }

        @keyframes shineSweep {
          0% { transform: translateX(-150%) skewX(-25deg); }
          100% { transform: translateX(250%) skewX(-25deg); }
        }

        @keyframes borderBeamRotate {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .react-bits-avatar-wrap {
          position: relative;
          padding: 5px;
          border-radius: 2rem;
          background: conic-gradient(from 0deg, #8FAF9A, #29332E, #DCE8DD, #8FAF9A);
          animation: avatarHaloGlow 3.5s ease-in-out infinite;
        }

        .react-bits-avatar-wrap::before {
          content: '';
          position: absolute;
          inset: -4px;
          border-radius: 2.25rem;
          background: conic-gradient(from 0deg, transparent 0 320deg, #8FAF9A 360deg);
          animation: spinConic 3.2s linear infinite;
          z-index: 0;
        }

        .react-bits-avatar-inner {
          position: relative;
          z-index: 1;
          border-radius: 1.85rem;
          overflow: hidden;
          background: #29332E;
        }

        .react-bits-shine-layer {
          position: absolute;
          top: 0;
          left: 0;
          width: 50%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.45),
            transparent
          );
          transform: translateX(-150%) skewX(-25deg);
          animation: shineSweep 4s infinite ease-in-out;
          pointer-events: none;
          z-index: 2;
        }

        .react-bits-shimmer-title {
          background: linear-gradient(90deg, #29332E 0%, #8FAF9A 40%, #29332E 80%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: textShimmer 4s linear infinite;
        }

        .react-bits-spotlight-card {
          background: radial-gradient(circle at 50% 0%, rgba(143, 175, 154, 0.15) 0%, rgba(255, 255, 255, 0.98) 75%);
          transition: all 0.35s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .react-bits-spotlight-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 32px -8px rgba(41, 51, 46, 0.12), 0 0 28px rgba(143, 175, 154, 0.25);
        }

        .react-bits-hologram-strip {
          background: linear-gradient(
            90deg,
            rgba(143, 175, 154, 0.2) 0%,
            rgba(220, 232, 221, 0.6) 25%,
            rgba(143, 175, 154, 0.8) 50%,
            rgba(220, 232, 221, 0.6) 75%,
            rgba(143, 175, 154, 0.2) 100%
          );
          background-size: 200% 100%;
          animation: borderBeamRotate 5s linear infinite;
        }
      `}</style>

      {/* ================= FULLSCREEN 3D AUTO WITH PUFFY CLOUD SMOKE (NO TEXT) ================= */}
      {isAnimatingAuto && (
        <div className="fixed inset-0 z-50 bg-[#18201b] flex flex-col justify-center items-center overflow-hidden">
          {/* Road Strip Across Full Screen */}
          <div className="w-full h-36 bg-[#1e2521] border-y-4 border-[#8FAF9A]/60 relative flex items-center shadow-2xl">
            {/* Animated white dashed road marking */}
            <div
              className="absolute inset-0 w-full h-2.5 top-1/2 -translate-y-1/2"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(90deg, #F7F5EF 0px, #F7F5EF 45px, transparent 45px, transparent 90px)",
                animation: "roadDashesSlow 0.7s linear infinite",
              }}
            />

            {/* Slow 3D Auto Rickshaw moving with realistic Cloud Smoke Puffs */}
            <div
              className="absolute left-0"
              style={{
                animation: "autoDriveSlow 3.8s cubic-bezier(0.42, 0, 0.58, 1) forwards",
              }}
            >
              <div
                className="relative w-64 h-40 flex items-center justify-center"
                style={{ animation: "chassisVibration 0.35s infinite ease-in-out" }}
              >
                {/* Cloud-Like Fluffy Smoke Puffs Behind Auto Exhaust (PUGAI LIKE CLOUDS) */}
                <div className="absolute left-3 bottom-5 pointer-events-none">
                  {/* Cloud puff 1 */}
                  <div
                    className="absolute -left-6 -top-2"
                    style={{ animation: "cloudBillow1 1.1s infinite linear" }}
                  >
                    <svg viewBox="0 0 100 65" className="w-14 h-10 drop-shadow-md">
                      <circle cx="28" cy="38" r="16" fill="#f1f5f9" fillOpacity="0.85" />
                      <circle cx="48" cy="24" r="20" fill="#ffffff" fillOpacity="0.95" />
                      <circle cx="70" cy="36" r="15" fill="#e2e8f0" fillOpacity="0.85" />
                      <ellipse cx="50" cy="42" rx="35" ry="14" fill="#cbd5e1" fillOpacity="0.9" />
                    </svg>
                  </div>

                  {/* Cloud puff 2 */}
                  <div
                    className="absolute -left-10 -top-4"
                    style={{ animation: "cloudBillow2 1.1s infinite linear 0.22s" }}
                  >
                    <svg viewBox="0 0 100 65" className="w-16 h-11 drop-shadow-md">
                      <circle cx="30" cy="36" r="17" fill="#e2e8f0" fillOpacity="0.8" />
                      <circle cx="52" cy="22" r="22" fill="#ffffff" fillOpacity="0.9" />
                      <circle cx="74" cy="34" r="16" fill="#cbd5e1" fillOpacity="0.8" />
                      <ellipse cx="52" cy="42" rx="38" ry="15" fill="#94a3b8" fillOpacity="0.75" />
                    </svg>
                  </div>

                  {/* Cloud puff 3 */}
                  <div
                    className="absolute -left-14 -top-6"
                    style={{ animation: "cloudBillow1 1.2s infinite linear 0.45s" }}
                  >
                    <svg viewBox="0 0 100 65" className="w-18 h-12 drop-shadow-lg">
                      <circle cx="28" cy="38" r="18" fill="#cbd5e1" fillOpacity="0.85" />
                      <circle cx="50" cy="24" r="24" fill="#f8fafc" fillOpacity="0.95" />
                      <circle cx="72" cy="36" r="17" fill="#e2e8f0" fillOpacity="0.85" />
                      <ellipse cx="50" cy="42" rx="40" ry="16" fill="#cbd5e1" fillOpacity="0.9" />
                    </svg>
                  </div>

                  {/* Cloud puff 4 */}
                  <div
                    className="absolute -left-18 -top-8"
                    style={{ animation: "cloudBillow2 1.2s infinite linear 0.68s" }}
                  >
                    <svg viewBox="0 0 100 65" className="w-20 h-13 drop-shadow-xl">
                      <circle cx="30" cy="36" r="19" fill="#94a3b8" fillOpacity="0.8" />
                      <circle cx="54" cy="20" r="25" fill="#ffffff" fillOpacity="0.9" />
                      <circle cx="76" cy="34" r="18" fill="#cbd5e1" fillOpacity="0.8" />
                      <ellipse cx="54" cy="42" rx="42" ry="17" fill="#64748b" fillOpacity="0.75" />
                    </svg>
                  </div>

                  {/* Cloud puff 5 */}
                  <div
                    className="absolute -left-22 -top-10"
                    style={{ animation: "cloudBillow1 1.3s infinite linear 0.9s" }}
                  >
                    <svg viewBox="0 0 100 65" className="w-22 h-14 drop-shadow-2xl">
                      <circle cx="32" cy="38" r="20" fill="#cbd5e1" fillOpacity="0.8" />
                      <circle cx="56" cy="22" r="26" fill="#f1f5f9" fillOpacity="0.9" />
                      <circle cx="78" cy="36" r="19" fill="#94a3b8" fillOpacity="0.8" />
                      <ellipse cx="56" cy="44" rx="44" ry="18" fill="#94a3b8" fillOpacity="0.7" />
                    </svg>
                  </div>
                </div>

                {/* Headlight Volumetric Light Beam Forward */}
                <div
                  className="absolute right-0 top-14 w-56 h-24 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(254, 240, 138, 0.55) 0%, rgba(254, 240, 138, 0.0) 100%)",
                    clipPath: "polygon(0% 42%, 100% 0%, 100% 100%, 0% 58%)",
                  }}
                />

                {/* 3D Angled Realistic Auto Rickshaw SVG */}
                <svg
                  className="w-56 h-36 drop-shadow-2xl"
                  viewBox="0 0 220 135"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="roofGrad" x1="40" y1="20" x2="180" y2="55" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#a3c9b2" />
                      <stop offset="50%" stopColor="#8FAF9A" />
                      <stop offset="100%" stopColor="#6b8f78" />
                    </linearGradient>
                    <linearGradient id="bodyYellow" x1="30" y1="50" x2="190" y2="95" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#facc15" />
                      <stop offset="60%" stopColor="#eab308" />
                      <stop offset="100%" stopColor="#ca8a04" />
                    </linearGradient>
                    <linearGradient id="chassisDark" x1="25" y1="75" x2="195" y2="105" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#374151" />
                      <stop offset="100%" stopColor="#1f2937" />
                    </linearGradient>
                    <linearGradient id="glassShine" x1="140" y1="25" x2="180" y2="75" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
                      <stop offset="35%" stopColor="#DCE8DD" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#8FAF9A" stopOpacity="0.3" />
                    </linearGradient>
                  </defs>

                  {/* Ground Shadow underneath the Auto */}
                  <ellipse cx="115" cy="116" rx="80" ry="8" fill="#000000" fillOpacity="0.45" />

                  {/* 3D Curved Roof (Sage Green Metallic) */}
                  <path
                    d="M38 32 Q70 18 142 22 Q178 24 190 48 L185 55 L32 55 Z"
                    fill="url(#roofGrad)"
                  />
                  {/* Roof Top Ridge Highlight */}
                  <path
                    d="M40 34 Q70 22 140 24 Q172 26 184 48 L178 50 L38 50 Z"
                    fill="#c2decb"
                    fillOpacity="0.6"
                  />

                  {/* Windshield & Front Pillar (Tinted 3D Curved Glass) */}
                  <path
                    d="M142 24 L180 48 L170 78 L136 78 Z"
                    fill="url(#glassShine)"
                  />
                  {/* Glass Diagonal Reflection Stripe */}
                  <line
                    x1="148"
                    y1="28"
                    x2="168"
                    y2="74"
                    stroke="#ffffff"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeOpacity="0.75"
                  />

                  {/* Front Chrome Mirror */}
                  <circle cx="178" cy="46" r="3.5" fill="#e5e7eb" stroke="#4b5563" strokeWidth="1" />

                  {/* Main Cabin Body (Golden Yellow with Depth) */}
                  <path
                    d="M26 55 L185 55 L196 90 L160 98 L26 95 Z"
                    fill="url(#bodyYellow)"
                  />

                  {/* Lower Chassis & Side Footstep (Deep Charcoal) */}
                  <path d="M22 80 L195 82 L188 102 L22 100 Z" fill="url(#chassisDark)" />

                  {/* Passenger Entry Opening (Shadowed Interior) */}
                  <path d="M68 56 L128 56 L124 88 L65 88 Z" fill="#1e2521" />

                  {/* Driver (Silhouette with Headgear) */}
                  <circle cx="132" cy="62" r="9.5" fill="#1f2937" />
                  <path d="M122 86 Q132 72 142 86 Z" fill="#8FAF9A" />
                  {/* Handlebars */}
                  <line x1="140" y1="74" x2="152" y2="76" stroke="#d1d5db" strokeWidth="2.5" strokeLinecap="round" />

                  {/* Front Bumper & Headlight Housing */}
                  <path d="M190 74 Q198 84 194 94 L188 94 Z" fill="#4b5563" />
                  {/* Glowing 3D Headlight */}
                  <circle cx="196" cy="80" r="6" fill="#fef08a" stroke="#ffffff" strokeWidth="1.5" />
                  <circle cx="196" cy="80" r="3.5" fill="#ffffff" />

                  {/* Rear Metallic Exhaust Pipe with Dark Opening */}
                  <rect x="14" y="93" width="16" height="6.5" rx="2.5" fill="#9ca3af" stroke="#4b5563" strokeWidth="1" />
                  <ellipse cx="14" cy="96.25" rx="2" ry="3.25" fill="#1f2937" />

                  {/* Rear Wheel (Spinning 3D Alloy Rim) */}
                  <g style={{ transformOrigin: "56px 104px", animation: "wheelSpinSlow 0.4s linear infinite" }}>
                    <circle cx="56" cy="104" r="18" fill="#111827" stroke="#374151" strokeWidth="2" />
                    <circle cx="56" cy="104" r="10.5" fill="#9ca3af" />
                    <circle cx="56" cy="104" r="3.5" fill="#1f2937" />
                    <line x1="56" y1="94" x2="56" y2="114" stroke="#f3f4f6" strokeWidth="2" />
                    <line x1="46" y1="104" x2="66" y2="104" stroke="#f3f4f6" strokeWidth="2" />
                    <line x1="49" y1="97" x2="63" y2="111" stroke="#f3f4f6" strokeWidth="1.5" />
                    <line x1="49" y1="111" x2="63" y2="97" stroke="#f3f4f6" strokeWidth="1.5" />
                  </g>

                  {/* Front Wheel (Spinning 3D Alloy Rim) */}
                  <g style={{ transformOrigin: "172px 104px", animation: "wheelSpinSlow 0.4s linear infinite" }}>
                    <circle cx="172" cy="104" r="18" fill="#111827" stroke="#374151" strokeWidth="2" />
                    <circle cx="172" cy="104" r="10.5" fill="#9ca3af" />
                    <circle cx="172" cy="104" r="3.5" fill="#1f2937" />
                    <line x1="172" y1="94" x2="172" y2="114" stroke="#f3f4f6" strokeWidth="2" />
                    <line x1="162" y1="104" x2="182" y2="104" stroke="#f3f4f6" strokeWidth="2" />
                    <line x1="165" y1="97" x2="179" y2="111" stroke="#f3f4f6" strokeWidth="1.5" />
                    <line x1="165" y1="111" x2="179" y2="97" stroke="#f3f4f6" strokeWidth="1.5" />
                  </g>

                  {/* VeyraPass Embossed Brand Plate */}
                  <rect x="68" y="66" width="52" height="15" rx="3.5" fill="#1f2937" stroke="#8FAF9A" strokeWidth="1" />
                  <text
                    x="73"
                    y="77"
                    fill="#8FAF9A"
                    fontSize="7.5"
                    fontWeight="bold"
                    fontFamily="sans-serif"
                    letterSpacing="0.8"
                  >
                    VEYRAPASS
                  </text>
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-[#29332E]/50 z-40 lg:hidden backdrop-blur-xs"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#29332E] text-[#F7F5EF] flex flex-col justify-between transition-transform duration-300 ease-in-out shrink-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div>
          {/* Logo & Brand Header */}
          <div className="flex items-center justify-between p-5 border-b border-[#8FAF9A]/20">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-2xl bg-white p-1 flex items-center justify-center shadow-sm shrink-0">
                <img
                  src="/logo.png"
                  alt="ShareAuto Logo"
                  className="h-full w-full object-contain"
                />
              </div>
              <div>
                <h1 className="text-xl font-woop tracking-wide text-[#F7F5EF] leading-tight">
                  ShareAuto
                </h1>
                <p className="text-[10px] text-[#8FAF9A] font-retro tracking-widest uppercase">
                  Share • Ride • Go
                </p>
              </div>
            </div>

            {/* Mobile close button */}
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-[#DCE8DD] hover:text-white"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Navigation Links with Icons */}
          <nav className="p-4 space-y-1.5">
            {/* 1. Dashboard Tab */}
            <button
              onClick={() => {
                setActiveTab("dashboard");
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === "dashboard"
                  ? "bg-[#8FAF9A] text-[#29332E] font-semibold shadow-sm"
                  : "text-[#DCE8DD] hover:bg-[#8FAF9A]/15 hover:text-white"
              }`}
            >
              <svg
                className="w-5 h-5 shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
              <span>Dashboard</span>
            </button>

            {/* 2. Booking Auto Tab (With 3D Animation Trigger) */}
            <button
              onClick={handleOpenBooking}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === "booking"
                  ? "bg-[#8FAF9A] text-[#29332E] font-semibold shadow-sm"
                  : "text-[#DCE8DD] hover:bg-[#8FAF9A]/15 hover:text-white"
              }`}
            >
              <svg
                className="w-5 h-5 shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                />
              </svg>
              <span>Booking Auto</span>
            </button>

            {/* 3. E-Book (Subscription) Tab */}
            <button
              onClick={() => {
                setActiveTab("ebook");
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === "ebook"
                  ? "bg-[#8FAF9A] text-[#29332E] font-semibold shadow-sm"
                  : "text-[#DCE8DD] hover:bg-[#8FAF9A]/15 hover:text-white"
              }`}
            >
              <svg
                className="w-5 h-5 shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              <span>E-Book (Plans)</span>
            </button>

            {/* 4. Profile Tab */}
            <button
              onClick={() => {
                setActiveTab("profile");
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === "profile"
                  ? "bg-[#8FAF9A] text-[#29332E] font-semibold shadow-sm"
                  : "text-[#DCE8DD] hover:bg-[#8FAF9A]/15 hover:text-white"
              }`}
            >
              <svg
                className="w-5 h-5 shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span>Profile</span>
            </button>

            {/* 5. Settings Tab */}
            <button
              onClick={() => {
                setActiveTab("settings");
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === "settings"
                  ? "bg-[#8FAF9A] text-[#29332E] font-semibold shadow-sm"
                  : "text-[#DCE8DD] hover:bg-[#8FAF9A]/15 hover:text-white"
              }`}
            >
              <svg
                className="w-5 h-5 shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span>Settings</span>
            </button>
          </nav>
        </div>

        {/* ================= SIDEBAR BOTTOM LOGOUT BAR ================= */}
        <div className="p-4 border-t border-[#8FAF9A]/20 bg-[#222a26]">
          {/* User mini info */}
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-xl bg-[#8FAF9A] text-[#29332E] font-bold flex items-center justify-center shrink-0 text-sm overflow-hidden border border-[#DCE8DD]/30 shadow-xs">
              {user.profilePic ? (
                <img src={user.profilePic} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                initials
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[#F7F5EF] truncate">
                {user.name}
              </p>
              <p className="text-xs text-[#8FAF9A] truncate">
                {user.name !== "User" ? "Passholder" : "Guest"}
              </p>
            </div>
          </div>

          {/* DEDICATED LOG OUT BAR */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-xl bg-red-950/40 border border-red-700/40 text-red-300 hover:bg-red-900/60 hover:text-white transition font-medium text-sm shadow-xs"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* ================= MAIN CONTENT AREA ================= */}
      <div ref={mainContentRef} className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* ================= NAVBAR WITH ICONS ================= */}
        <header className="sticky top-0 z-30 bg-[#F7F5EF] border-b border-[#DCE8DD] px-4 sm:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Mobile Sidebar Toggle Button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg bg-white border border-[#DCE8DD] text-[#29332E] hover:bg-[#DCE8DD]/30"
              aria-label="Open Sidebar"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            {/* Navbar Title / Breadcrumb */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-woop text-[#29332E] capitalize tracking-wide">
                {activeTab === "booking"
                  ? "Book An Auto"
                  : activeTab === "ebook"
                  ? "E-Book Subscription"
                  : activeTab === "profile"
                  ? "Passenger Profile"
                  : activeTab === "settings"
                  ? "Settings"
                  : "Dashboard"}
              </h2>
              <p className="text-xs text-[#29332E]/70 hidden sm:block font-grotesk font-medium">
                Welcome back, {user.name}
              </p>
            </div>
          </div>
        </header>

        {/* ================= TAB 1: MAIN DASHBOARD VIEW ================= */}
        {activeTab === "dashboard" && (
          <main className="p-4 sm:p-8 space-y-6 max-w-5xl w-full mx-auto">
            {/* 1. CURRENT ACTIVE BOOKED AUTO DETAILS */}
            {currentBooking && (
              <div className="bg-[#29332E] rounded-3xl p-6 sm:p-8 text-[#F7F5EF] border border-[#8FAF9A]/40 shadow-md relative overflow-hidden">
                <div className="flex items-center justify-between pb-3 border-b border-[#8FAF9A]/20">
                  <div className="retro-oval-badge-sage text-[10px] px-3.5 py-1">
                    CONFIRMED COMMUTE
                  </div>
                  <div
                    onClick={() => {
                      navigator.clipboard?.writeText(currentBooking.otp);
                      setCopiedOtp(true);
                      setTimeout(() => setCopiedOtp(false), 2000);
                    }}
                    title="Click to copy boarding OTP"
                    className="retro-oval-badge-light text-xs font-grotesk font-bold cursor-pointer hover:bg-white transition"
                  >
                    {copiedOtp ? "OTP COPIED ✓" : `Boarding OTP: ${currentBooking.otp}`}
                  </div>
                </div>

                {/* Route Header */}
                <div className="mt-5 space-y-1">
                  <span className="text-xs text-[#8FAF9A] font-retro tracking-wider uppercase">Live Commute Corridor</span>
                  <h3 className="text-2xl sm:text-3xl font-woop text-[#F7F5EF] tracking-wide">
                    {currentBooking.startLocation} ➔ {currentBooking.destination}
                  </h3>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-5 border-t border-[#8FAF9A]/20 text-xs">
                  <div>
                    <span className="text-[#DCE8DD]/70 block font-retro uppercase text-[10px] tracking-wider">Driver</span>
                    <span className="text-base font-bold text-[#F7F5EF] block mt-0.5">
                      {currentBooking.driver}
                    </span>
                    <span className="text-[11px] text-[#8FAF9A] font-semibold">★ {currentBooking.rating} • Verified</span>
                  </div>

                  <div>
                    <span className="text-[#DCE8DD]/70 block font-retro uppercase text-[10px] tracking-wider">Vehicle Plate</span>
                    <span className="text-base font-grotesk font-extrabold text-[#8FAF9A] block mt-0.5 tracking-wider">
                      {currentBooking.autoNumber}
                    </span>
                  </div>

                  <div>
                    <span className="text-[#DCE8DD]/70 block font-retro uppercase text-[10px] tracking-wider">Arrival Stand</span>
                    <span className="text-base font-bold text-[#F7F5EF] block mt-0.5 font-grotesk">
                      {currentBooking.eta}
                    </span>
                    <span className="text-[11px] text-[#DCE8DD]/60">Booked at {currentBooking.bookedAt}</span>
                  </div>

                  <div>
                    <span className="text-[#DCE8DD]/70 block font-retro uppercase text-[10px] tracking-wider">Fare Payable</span>
                    <span className="text-xl font-woop text-[#8FAF9A] block mt-0.5">
                      {currentBooking.fare}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 pt-5 border-t border-[#8FAF9A]/20 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs text-[#DCE8DD]">
                    <span className="font-retro uppercase text-[10px] tracking-wider">📞 Driver Contact:</span>
                    <a href={`tel:${currentBooking.phone}`} className="font-grotesk font-bold text-[#F7F5EF] hover:underline">
                      {currentBooking.phone}
                    </a>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleTrackAuto}
                      className="px-4 py-2 rounded-xl text-xs font-retro tracking-wider text-[#29332E] bg-[#DCE8DD] hover:bg-white transition shadow-xs flex items-center gap-1.5"
                      title="Track on Google Maps"
                    >
                      <span>📍 Track on GMap</span>
                      <svg className="w-3.5 h-3.5 text-[#29332E]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </button>
                    <button
                      onClick={handleCancelBooking}
                      className="px-4 py-2 rounded-xl text-xs font-semibold text-red-300 hover:text-white bg-red-950/40 border border-red-700/40 transition"
                    >
                      Cancel Booking
                    </button>
                    <button
                      onClick={handleCompleteRide}
                      className="px-5 py-2 rounded-xl text-xs font-retro tracking-wide text-[#29332E] bg-[#8FAF9A] hover:bg-[#7fa38e] transition shadow-xs"
                    >
                      ✔ Complete Ride
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 2. PREVIOUS HISTORY SECTION */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between px-1">
                <h4 className="text-xl font-woop text-[#29332E] tracking-wide">
                  Previous History
                </h4>
                {bookingHistory.length > 0 && (
                  <button
                    onClick={handleClearHistory}
                    className="text-xs text-[#29332E]/60 hover:text-red-600 transition font-medium"
                  >
                    Clear History
                  </button>
                )}
              </div>

              {bookingHistory.length === 0 ? (
                /* EXACT MESSAGE WHEN NO PREVIOUS HISTORY */
                <div className="bg-white rounded-3xl p-8 border border-[#DCE8DD] text-center shadow-xs">
                  <div className="w-12 h-12 rounded-2xl bg-[#F7F5EF] border border-[#DCE8DD] text-[#29332E] flex items-center justify-center mx-auto mb-3 text-lg">
                    🕒
                  </div>
                  <h5 className="text-xl font-woop text-[#29332E] tracking-wide">
                    No previous history
                  </h5>
                  <p className="text-xs text-[#29332E]/60 mt-1">
                    Your completed share auto bookings will appear here.
                  </p>
                </div>
              ) : (
                /* PREVIOUS HISTORY LIST */
                <div className="bg-white rounded-3xl border border-[#DCE8DD] shadow-xs divide-y divide-[#DCE8DD] overflow-hidden">
                  {bookingHistory.map((trip, index) => (
                    <div
                      key={trip.id || index}
                      className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#F7F5EF]/60 transition"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-xl bg-[#DCE8DD] text-[#29332E] flex items-center justify-center shrink-0 mt-0.5 text-sm">
                          🛺
                        </div>
                        <div>
                          <h5 className="text-sm font-bold text-[#29332E]">
                            {trip.startLocation} ➔ {trip.destination}
                          </h5>
                          <p className="text-xs text-[#29332E]/60 mt-0.5 font-grotesk">
                            Auto: <span className="font-bold text-[#29332E]">{trip.autoNumber}</span> • Driver: {trip.driver} • {trip.date} at {trip.bookedAt}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-3 self-end sm:self-center">
                        <span className="text-sm font-woop text-[#29332E]">
                          {trip.fare}
                        </span>
                        <span className="retro-oval-badge-sage text-[10px] px-2.5 py-0.5">
                          Completed
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </main>
        )}

        {/* ================= TAB 2: BOOKING AUTO VIEW ================= */}
        {activeTab === "booking" && (
          <main className="p-4 sm:p-8 space-y-8 max-w-7xl w-full mx-auto">
            {/* Header banner */}
            <div className="bg-[#29332E] rounded-3xl p-6 text-[#F7F5EF] flex items-center justify-between border border-[#8FAF9A]/30">
              <div>
                <span className="retro-oval-badge-sage text-[10px] px-3.5 py-1 mb-2 inline-flex">
                  LIVE DISPATCH
                </span>
                <h3 className="text-2xl sm:text-3xl font-woop mt-2 text-[#F7F5EF] tracking-wide">
                  Share Auto Booking
                </h3>
                <p className="text-xs text-[#DCE8DD] mt-1 font-grotesk">
                  Choose your start & destination stand to view nearby verified autos
                </p>
              </div>
              <button
                onClick={() => setActiveTab("dashboard")}
                className="text-xs text-[#DCE8DD] hover:text-white px-3 py-1.5 rounded-lg border border-[#8FAF9A]/40 font-retro tracking-wide"
              >
                Back to Dashboard
              </button>
            </div>

            {/* Route Selection Box */}
            <div className="bg-white rounded-3xl p-6 border border-[#DCE8DD] shadow-xs">
              <h4 className="font-woop text-lg text-[#29332E] mb-4 tracking-wide">
                1. Select Route Locations
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Start Location */}
                <div>
                  <label className="block text-xs font-retro tracking-wider uppercase text-[#29332E]/70 mb-2">
                    📍 Pick-up Stand (Chennai Transit Corridor)
                  </label>
                  <select
                    value={startLocation}
                    onChange={(e) => setStartLocation(e.target.value)}
                    className="w-full p-3 rounded-xl border border-[#DCE8DD] bg-[#F7F5EF] text-[#29332E] font-medium outline-none focus:border-[#8FAF9A]"
                  >
                    <option value="Guindy Metro Station (Race Course Stand)">Guindy Metro Station (Race Course Stand)</option>
                    <option value="Saidapet Court Stand (Anna Salai)">Saidapet Court Stand (Anna Salai)</option>
                    <option value="T. Nagar Bus Terminus (Panagal Park)">T. Nagar Bus Terminus (Panagal Park)</option>
                    <option value="Velachery Vijayanagar (Checkpost Stand)">Velachery Vijayanagar (Checkpost Stand)</option>
                    <option value="Tambaram Sanatorium (GST Road Bay)">Tambaram Sanatorium (GST Road Bay)</option>
                  </select>
                </div>

                {/* Destination */}
                <div>
                  <label className="block text-xs font-retro tracking-wider uppercase text-[#29332E]/70 mb-2">
                    🏁 Drop Stand (Destination Stage)
                  </label>
                  <select
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full p-3 rounded-xl border border-[#DCE8DD] bg-[#F7F5EF] text-[#29332E] font-medium outline-none focus:border-[#8FAF9A]"
                  >
                    <option value="Velachery Vijayanagar (Checkpost Stand)">Velachery Vijayanagar (Checkpost Stand)</option>
                    <option value="Guindy Metro Station (Race Course Stand)">Guindy Metro Station (Race Course Stand)</option>
                    <option value="Phoenix Marketcity (Main Road Bay)">Phoenix Marketcity (Main Road Bay)</option>
                    <option value="T. Nagar Ranganathan St (Station Junction)">T. Nagar Ranganathan St (Station Junction)</option>
                    <option value="Saidapet Anna Salai Stand">Saidapet Anna Salai Stand</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Available Autos Section (Shown dynamically when locations chosen) */}
            <div className="space-y-4">
              <div>
                <h4 className="font-woop text-xl text-[#29332E] tracking-wide">
                  2. Available Autos on Route ({startLocation} ➔ {destination})
                </h4>
                <p className="text-xs text-[#29332E]/60 font-grotesk">
                  3 verified autos ready for boarding right now
                </p>
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {availableAutos.map((auto) => (
                  <div
                    key={auto.id}
                    className="bg-white rounded-2xl p-5 border border-[#DCE8DD] hover:border-[#8FAF9A] shadow-xs flex flex-col justify-between transition group"
                  >
                    <div>
                      {/* Driver info & rating */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-[#29332E] text-[#8FAF9A] font-bold flex items-center justify-center text-sm">
                            🛺
                          </div>
                          <div>
                            <h5 className="font-bold text-sm text-[#29332E]">
                              {auto.driver}
                            </h5>
                            <span className="text-xs text-[#8FAF9A] font-semibold">
                              ★ {auto.rating} • {auto.badge}
                            </span>
                          </div>
                        </div>
                        <span className="retro-oval-badge-light text-[10px] px-2.5 py-0.5 font-grotesk font-bold">
                          {auto.autoNumber}
                        </span>
                      </div>

                      {/* Vehicle Model & FC */}
                      <div className="mb-2 text-[11px] text-[#29332E]/70 flex items-center justify-between">
                        <span>{auto.model}</span>
                        <span className="text-green-700 font-semibold font-grotesk">{auto.fcValid}</span>
                      </div>

                      {/* ETA & Seats */}
                      <div className="space-y-1.5 py-3 border-y border-[#DCE8DD] text-xs">
                        <div className="flex justify-between">
                          <span className="text-[#29332E]/70 font-retro text-[10px] uppercase">ETA:</span>
                          <span className="font-bold text-[#29332E] font-grotesk">
                            {auto.eta} ({auto.distance})
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#29332E]/70 font-retro text-[10px] uppercase">Seats Open:</span>
                          <span className="font-semibold text-green-700 font-grotesk">
                            {auto.seatLayout}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-[#29332E]/70 font-retro text-[10px] uppercase">Fare:</span>
                          <span className="font-woop text-base text-[#29332E]">
                            {auto.passCovered ? (
                              <span className="text-[#8FAF9A] font-woop">
                                Free (Pass Applied)
                              </span>
                            ) : (
                              auto.baseFare
                            )}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Book button */}
                    <button
                      onClick={() => handleConfirmBookingAction(auto)}
                      className="mt-4 w-full py-2.5 rounded-xl bg-[#8FAF9A] hover:bg-[#7fa38e] text-[#29332E] font-retro tracking-wider text-xs transition shadow-xs"
                    >
                      Book Seat in this Auto
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </main>
        )}

        {/* ================= TAB 3: E-BOOK (SUBSCRIPTIONS) VIEW ================= */}
        {activeTab === "ebook" && (
          <main className="p-4 sm:p-8 space-y-8 max-w-7xl w-full mx-auto">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="retro-oval-badge text-[11px] px-4 py-1.5 mb-2 inline-flex">
                VEYRAPASS E-BOOK
              </span>
              <h3 className="text-3xl sm:text-4xl font-woop text-[#29332E] tracking-wide">
                Travel Subscription Passes
              </h3>
              <p className="text-sm text-[#29332E]/70 font-grotesk">
                Choose between flexible Monthly passes or save big with an Early Bird Yearly Subscription!
              </p>
            </div>

            {/* Plans Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {/* Plan 1: Monthly Pass */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#8FAF9A] shadow-sm relative flex flex-col justify-between">
                {activeSubscription === "monthly" && (
                  <span className="absolute -top-3.5 right-6 retro-oval-badge text-[10px] px-3.5 py-1">
                    ACTIVE PASS
                  </span>
                )}
                <div>
                  <h4 className="text-2xl font-woop text-[#29332E] tracking-wide">
                    Monthly E-Pass
                  </h4>
                  <p className="text-xs text-[#29332E]/60 mt-1">
                    Ideal for daily commuters traveling fixed share auto routes.
                  </p>

                  <div className="my-6">
                    <span className="text-4xl sm:text-5xl font-woop text-[#29332E]">
                      ₹ 499
                    </span>
                    <span className="text-xs text-[#29332E]/60 font-retro ml-1">
                      / MONTH
                    </span>
                  </div>

                  <ul className="space-y-3 text-xs text-[#29332E] mb-6">
                    <li className="flex items-center gap-2">
                      <span className="text-[#8FAF9A] font-bold">✔</span> Unlimited trips on Route 12B
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#8FAF9A] font-bold">✔</span> Instant Digital QR Boarding
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#8FAF9A] font-bold">✔</span> 10% emergency wallet buffer
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#8FAF9A] font-bold">✔</span> 24/7 Commuter Helpline
                    </li>
                  </ul>
                </div>

                <button
                  onClick={() => handleSubscribe("monthly")}
                  className={`w-full py-3 rounded-xl font-retro tracking-wider text-sm transition ${
                    activeSubscription === "monthly"
                      ? "bg-[#DCE8DD] text-[#29332E] cursor-default"
                      : "bg-[#8FAF9A] hover:bg-[#7fa38e] text-[#29332E] shadow-sm cursor-pointer"
                  }`}
                >
                  {activeSubscription === "monthly"
                    ? "✔ PLAN ACTIVE"
                    : "SUBSCRIBE TO MONTHLY PASS"}
                </button>
              </div>

              {/* Plan 2: Yearly (Early Bird) Pass */}
              <div className="bg-[#29332E] text-[#F7F5EF] rounded-3xl p-6 sm:p-8 border-2 border-[#8FAF9A] shadow-md relative flex flex-col justify-between">
                <span className="absolute -top-3.5 right-6 retro-oval-badge-light text-[10px] px-3.5 py-1">
                  {activeSubscription === "yearly" ? "ACTIVE PASS" : "SAVE 17% • EARLY BIRD"}
                </span>
                <div>
                  <h4 className="text-2xl font-woop text-[#F7F5EF] tracking-wide">
                    Yearly / Early Subscription
                  </h4>
                  <p className="text-xs text-[#DCE8DD]/70 mt-1">
                    Complete peace of mind for the entire year across the city.
                  </p>

                  <div className="my-6">
                    <span className="text-4xl sm:text-5xl font-woop text-[#F7F5EF]">
                      ₹ 4,999
                    </span>
                    <span className="text-xs text-[#DCE8DD] font-retro ml-1">
                      / YEAR
                    </span>
                    <p className="text-xs text-[#8FAF9A] font-grotesk font-semibold mt-1">
                      (Equivalent to just ₹ 416/month!)
                    </p>
                  </div>

                  <ul className="space-y-3 text-xs text-[#DCE8DD] mb-6">
                    <li className="flex items-center gap-2">
                      <span className="text-[#8FAF9A] font-bold">✔</span> Unlimited rides across ALL city routes
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#8FAF9A] font-bold">✔</span> Priority Auto Allocation during peak hours
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#8FAF9A] font-bold">✔</span> 1 Family Member add-on pass included
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#8FAF9A] font-bold">✔</span> Free ₹ 500 wallet bonus on signup
                    </li>
                  </ul>
                </div>

                <button
                  onClick={() => handleSubscribe("yearly")}
                  className={`w-full py-3 rounded-xl font-retro tracking-wider text-sm transition ${
                    activeSubscription === "yearly"
                      ? "bg-[#DCE8DD] text-[#29332E] cursor-default"
                      : "bg-[#8FAF9A] hover:bg-[#7fa38e] text-[#29332E] shadow-sm cursor-pointer"
                  }`}
                >
                  {activeSubscription === "yearly"
                    ? "✔ PLAN ACTIVE"
                    : "SUBSCRIBE TO YEARLY PASS"}
                </button>
              </div>
            </div>
          </main>
        )}

        {/* ================= TAB 4: PASSENGER PROFILE (SIMPLE & CLEAN) ================= */}
        {activeTab === "profile" && (
          <main className="p-4 sm:p-8 space-y-6 max-w-xl w-full mx-auto">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DCE8DD] shadow-xs text-center sm:text-left space-y-6">
              {/* Profile Photo & Name */}
              <div className="flex flex-col sm:flex-row items-center gap-5 pb-6 border-b border-[#DCE8DD]">
                <div className="w-24 h-24 rounded-2xl bg-[#29332E] text-[#8FAF9A] text-3xl font-bold flex items-center justify-center border-2 border-[#8FAF9A]/40 overflow-hidden shadow-xs shrink-0">
                  {user.profilePic ? (
                    <img
                      src={user.profilePic}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    initials
                  )}
                </div>

                <div className="space-y-1">
                  <h3 className="text-2xl sm:text-3xl font-woop text-[#29332E] tracking-wide">
                    {user.name}
                  </h3>
                  <p className="text-xs text-[#29332E]/60 font-grotesk">
                    Passenger Profile
                  </p>
                </div>
              </div>

              {/* User Details (Name, Email, Phone, Permanent Home Address) */}
              <div className="space-y-4 text-sm">
                <div>
                  <span className="text-xs font-retro text-[#29332E]/60 uppercase tracking-wider block">
                    Full Name
                  </span>
                  <p className="font-semibold text-[#29332E] mt-0.5">
                    {user.name}
                  </p>
                </div>

                <div>
                  <span className="text-xs font-retro text-[#29332E]/60 uppercase tracking-wider block">
                    Email Address
                  </span>
                  <p className="font-semibold text-[#29332E] mt-0.5">
                    {user.email}
                  </p>
                </div>

                <div>
                  <span className="text-xs font-retro text-[#29332E]/60 uppercase tracking-wider block">
                    Phone Number
                  </span>
                  <p className="font-semibold text-[#29332E] mt-0.5 font-grotesk">
                    {user.phone}
                  </p>
                </div>

                <div>
                  <span className="text-xs font-retro text-[#29332E]/60 uppercase tracking-wider block">
                    Permanent Home Address
                  </span>
                  <p className="font-semibold text-[#29332E] mt-0.5 leading-relaxed">
                    {user.address || "No address provided"}
                  </p>
                </div>
              </div>

              {/* Edit Details Action Button */}
              <div className="pt-4 border-t border-[#DCE8DD]">
                <button
                  onClick={() => setActiveTab("settings")}
                  className="w-full py-3.5 rounded-xl bg-[#8FAF9A] hover:bg-[#7fa38e] text-[#29332E] font-retro tracking-wider text-xs shadow-xs transition cursor-pointer"
                >
                  EDIT PROFILE DETAILS
                </button>
              </div>
            </div>
          </main>
        )}

        {/* ================= TAB 5: SETTINGS VIEW (PROFILE PIC & USER DETAILS ONLY) ================= */}
        {activeTab === "settings" && (
          <main className="p-4 sm:p-8 space-y-6 max-w-xl w-full mx-auto">
            {saveSuccessMsg && (
              <div className="p-4 rounded-2xl bg-[#DCE8DD] border border-[#8FAF9A] text-[#29332E] flex items-center justify-between text-sm font-medium">
                <span>✓ {saveSuccessMsg}</span>
                <button
                  type="button"
                  onClick={() => setSaveSuccessMsg("")}
                  className="font-bold cursor-pointer text-xs"
                >
                  ✕
                </button>
              </div>
            )}

            <form
              onSubmit={handleSaveProfile}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DCE8DD] shadow-xs space-y-6"
            >
              {/* Profile Picture Setting */}
              <div className="flex flex-col sm:flex-row items-center gap-5 pb-6 border-b border-[#DCE8DD]">
                <div className="w-24 h-24 rounded-2xl bg-[#29332E] text-[#8FAF9A] text-3xl font-bold flex items-center justify-center border-2 border-[#8FAF9A]/30 overflow-hidden shrink-0 shadow-xs">
                  {profileForm.profilePic ? (
                    <img
                      src={profileForm.profilePic}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    initials
                  )}
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="retro-oval-badge-sage px-4 py-2.5 text-xs font-retro cursor-pointer hover:opacity-90 transition"
                  >
                    Set Profile Pic
                  </button>
                  {profileForm.profilePic && (
                    <button
                      type="button"
                      onClick={handleRemovePhoto}
                      className="px-4 py-2 text-xs font-retro text-red-600 hover:text-red-700 bg-red-50 border border-red-200 rounded-full cursor-pointer"
                    >
                      Remove Pic
                    </button>
                  )}
                </div>
              </div>

              {/* User Details Edit */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-retro text-[#29332E]/80 uppercase tracking-wider mb-1.5">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={profileForm.name}
                    onChange={(e) =>
                      setProfileForm((prev) => ({ ...prev, name: e.target.value }))
                    }
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 rounded-xl bg-[#F7F5EF] border border-[#DCE8DD] text-sm text-[#29332E] font-medium focus:outline-none focus:border-[#8FAF9A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-retro text-[#29332E]/80 uppercase tracking-wider mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={profileForm.email}
                    onChange={(e) =>
                      setProfileForm((prev) => ({ ...prev, email: e.target.value }))
                    }
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-xl bg-[#F7F5EF] border border-[#DCE8DD] text-sm text-[#29332E] font-medium focus:outline-none focus:border-[#8FAF9A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-retro text-[#29332E]/80 uppercase tracking-wider mb-1.5">
                    Phone
                  </label>
                  <input
                    type="tel"
                    required
                    value={profileForm.phone}
                    onChange={(e) =>
                      setProfileForm((prev) => ({ ...prev, phone: e.target.value }))
                    }
                    placeholder="Enter your phone number"
                    className="w-full px-4 py-3 rounded-xl bg-[#F7F5EF] border border-[#DCE8DD] text-sm text-[#29332E] font-grotesk font-medium focus:outline-none focus:border-[#8FAF9A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-retro text-[#29332E]/80 uppercase tracking-wider mb-1.5">
                    Permanent Home Address
                  </label>
                  <input
                    type="text"
                    required
                    value={profileForm.address}
                    onChange={(e) =>
                      setProfileForm((prev) => ({ ...prev, address: e.target.value }))
                    }
                    placeholder="Enter your permanent home address"
                    className="w-full px-4 py-3 rounded-xl bg-[#F7F5EF] border border-[#DCE8DD] text-sm text-[#29332E] font-medium focus:outline-none focus:border-[#8FAF9A]"
                  />
                </div>
              </div>

              {/* Notification On / Off */}
              <div className="flex items-center justify-between py-3 border-t border-[#DCE8DD]">
                <div>
                  <span className="block text-xs font-retro text-[#29332E] uppercase tracking-wider">
                    Notifications
                  </span>
                  <span className="text-[11px] text-[#29332E]/60 font-grotesk">
                    {profileForm.notificationsEnabled ? "Notifications are ON" : "Notifications are OFF"}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleToggleNotifications}
                  className={`relative inline-flex h-6 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    profileForm.notificationsEnabled ? "bg-[#8FAF9A]" : "bg-gray-300"
                  }`}
                  aria-label="Toggle notifications"
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      profileForm.notificationsEnabled ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Track auto on notification bar if you close the app */}
              <div className="flex items-center justify-between py-3 border-t border-[#DCE8DD]">
                <div className="pr-4">
                  <span className="block text-xs font-retro text-[#29332E] uppercase tracking-wider">
                    Track auto on notification bar if you close the app
                  </span>
                  <span className="text-[11px] text-[#29332E]/60 font-grotesk">
                    {profileForm.trackOnNotificationBar ? "Tracking active when minimized" : "Disabled"}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleToggleTrackOnNotificationBar}
                  className={`relative inline-flex h-6 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    profileForm.trackOnNotificationBar ? "bg-[#8FAF9A]" : "bg-gray-300"
                  }`}
                  aria-label="Toggle auto tracking on notification bar"
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      profileForm.trackOnNotificationBar ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Save Details Button */}
              <div className="pt-4 border-t border-[#DCE8DD]">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#8FAF9A] hover:bg-[#7fa38e] text-[#29332E] font-retro tracking-wider text-sm shadow-sm transition cursor-pointer"
                >
                  SAVE DETAILS
                </button>
              </div>
            </form>
          </main>
        )}
      </div>

      {/* ================= FULLSCREEN QR MODAL ================= */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#29332E]/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full border border-[#DCE8DD] shadow-xl text-center">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-woop text-xl text-[#29332E] tracking-wide">Digital Boarding Pass</h4>
              <button
                onClick={() => setShowQrModal(false)}
                className="text-gray-400 hover:text-[#29332E]"
              >
                ✕
              </button>
            </div>

            <div className="bg-[#F7F5EF] p-4 rounded-2xl border border-[#DCE8DD] my-4 flex flex-col items-center">
              <svg
                className="w-48 h-48 text-[#29332E]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M3 3h6v6H3zM15 3h6v6h-6zM3 15h6v6H3zM14 14h2v2h-2zM18 14h3v3h-3zM14 18h3v3h-3zM19 19h2v2h-2zM6 6h.01M18 6h.01M6 18h.01" />
              </svg>
              <p className="text-sm font-grotesk font-extrabold text-[#29332E] mt-2 tracking-wider">
                {user.passId}
              </p>
            </div>

            <p className="text-xs text-[#29332E]/70">
              {user.route}
            </p>
            <p className="text-xs text-[#8FAF9A] font-semibold mt-1">
              Valid until {user.validUntil}
            </p>

            <button
              onClick={() => setShowQrModal(false)}
              className="mt-6 w-full py-2.5 bg-[#8FAF9A] text-[#29332E] font-retro tracking-wider rounded-xl hover:opacity-90 transition text-sm"
            >
              DONE
            </button>
          </div>
        </div>
      )}

      {/* ================= BOOKING SUCCESS CONFIRMATION MODAL ================= */}
      {bookingSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#29332E]/75 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full border border-[#DCE8DD] shadow-2xl text-center">
            <div className="w-16 h-16 rounded-full bg-[#DCE8DD] text-[#29332E] text-2xl flex items-center justify-center mx-auto mb-3">
              ✅
            </div>
            <h4 className="font-woop text-2xl text-[#29332E] tracking-wide">
              Share Auto Booked!
            </h4>
            <p className="text-xs text-[#29332E]/70 mt-1">
              Driver <strong className="text-[#29332E]">{bookingSuccessModal.driver}</strong> ({bookingSuccessModal.autoNumber}) is arriving at {startLocation}.
            </p>

            <div className="my-4 p-4 rounded-2xl bg-[#F7F5EF] border border-[#DCE8DD] text-xs text-left space-y-1.5">
              <div className="flex justify-between">
                <span className="text-[#29332E]/70 font-retro text-[10px] uppercase">ETA:</span>
                <span className="font-bold text-[#29332E] font-grotesk">{bookingSuccessModal.eta}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#29332E]/70 font-retro text-[10px] uppercase">Fare:</span>
                <span className="font-woop text-base text-[#8FAF9A]">
                  {bookingSuccessModal.passCovered ? "Free (Monthly Pass)" : bookingSuccessModal.baseFare}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#29332E]/70 font-retro text-[10px] uppercase">Driver Phone:</span>
                <span className="font-bold text-[#29332E] font-grotesk">{bookingSuccessModal.phone}</span>
              </div>
            </div>

            <div className="space-y-2 mt-4">
              <button
                onClick={() => {
                  handleTrackAuto();
                }}
                className="w-full py-2.5 bg-[#DCE8DD] hover:bg-[#cfe0d1] text-[#29332E] font-retro tracking-wider rounded-xl transition text-xs shadow-xs flex items-center justify-center gap-2"
              >
                <span>📍 Track Auto on Google Maps</span>
                <span className="text-xs">↗</span>
              </button>

              <button
                onClick={() => {
                  setBookingSuccessModal(null);
                  setActiveTab("dashboard");
                }}
                className="w-full py-2.5 bg-[#8FAF9A] text-[#29332E] font-retro tracking-wider rounded-xl hover:opacity-90 transition text-sm shadow-xs"
              >
                VIEW IN DASHBOARD
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
