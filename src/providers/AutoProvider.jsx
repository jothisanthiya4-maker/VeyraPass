
import { useEffect, useState } from "react";
import availableAutoData from "../data/availableAutoData";
import { AutoContext } from "../context/AutoContext";
import { getPassStatus } from "../utils/passUtils";

const AutoProvider = ({ children }) => {
  const [autos, setAutos] = useState(availableAutoData);

  const [selectedAuto, setSelectedAuto] = useState(null);

  const [bookings, setBookings] = useState(() => {
    try {
      const savedBookings = JSON.parse(
        localStorage.getItem("shareAuto-bookings") || "[]"
      );
      return Array.isArray(savedBookings) ? savedBookings : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("shareAuto-bookings", JSON.stringify(bookings));
  }, [bookings]);

  const [myPass, setMyPass] = useState(() => {
    try {
      const savedPass = JSON.parse(localStorage.getItem("shareAuto-myPass") || "null");
      return savedPass
        ? { ...savedPass, status: getPassStatus(savedPass) }
        : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (myPass) {
      localStorage.setItem("shareAuto-myPass", JSON.stringify(myPass));
    }
  }, [myPass]);

  useEffect(() => {
    const expiryCheck = setInterval(() => {
      setMyPass((currentPass) => {
        if (!currentPass) return currentPass;

        const status = getPassStatus(currentPass);
        return status === currentPass.status
          ? currentPass
          : { ...currentPass, status };
      });
    }, 60_000);

    return () => clearInterval(expiryCheck);
  }, []);

  const [comparedAutos, setComparedAutos] = useState([]);

  const [searchCriteria, setSearchCriteria] = useState({
    pickup: "",
    destination: "",
    passengers: 1,
    bookingMode: "All",
    journeyDate: "",
    departureTime: ""
  });

  // Add or remove an auto from comparison
  const toggleCompare = (auto) => {
    setComparedAutos((previous) => {
      const alreadyAdded = previous.some(
        (item) => item.id === auto.id
      );

      if (alreadyAdded) {
        return previous.filter((item) => item.id !== auto.id);
      }

      if (previous.length >= 3) {
        return previous;
      }

      return [...previous, auto];
    });
  };

  const selectAuto = (auto) => {
    setSelectedAuto(auto);
  };

  const contextValue = {
    autos,
    setAutos,

    // Alias names for compatibility with the Available Autos page
    availableAutos: autos,
    setAvailableAutos: setAutos,

    selectedAuto,
    setSelectedAuto,
    selectAuto,

    bookings,
    setBookings,

    myPass,
    setMyPass,

    comparedAutos,
    setComparedAutos,
    toggleCompare,

    searchCriteria,
    setSearchCriteria
  };

  return (
    <AutoContext.Provider value={contextValue}>
      {children}
    </AutoContext.Provider>
  );
};

export default AutoProvider;
