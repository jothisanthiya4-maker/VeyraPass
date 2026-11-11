
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuto } from "../../context/AutoContext";
import { getPassStatus } from "../../utils/passUtils";
import PassPlanDetails from "./PassPlanDetails";

import {
  FaCalendarAlt,
  FaCheck,
  FaStar,
  FaCrown,
  FaTicketAlt,
  FaShieldAlt,
  FaArrowRight,
  FaCheckCircle,
  FaTimes
} from "react-icons/fa";

const passPlans = [
  {
    id: "weekly",
    name: "Weekly Pass",
    duration: "7 Days",
    price: 250,
    icon: <FaCalendarAlt />,
    description: "Best for regular commuters",
    popular: true,
    benefits: [
      "Valid for 7 days",
      "Save on travel expenses",
      "Easy digital pass",
    ],
  },
  {
    id: "monthly",
    name: "Monthly Pass",
    duration: "30 Days",
    price: 900,
    icon: <FaStar />,
    description: "Best for frequent travellers",
    popular: false,
    benefits: [
      "Valid for 30 days",
      "More travel savings",
      "Easy digital pass",
    ],
  },
  {
    id: "yearly",
    name: "Yearly Pass",
    duration: "365 Days",
    price: 9000,
    icon: <FaCrown />,
    description: "Best for long-term travellers",
    popular: false,
    benefits: [
      "Valid for 365 days",
      "Maximum travel savings",
      "Easy digital pass",
    ],
  },
];

const PassPage = () => {
  const today = new Date().toLocaleDateString("en-CA");

  const [selectedPass, setSelectedPass] = useState("weekly");
  const [startDate, setStartDate] = useState(today);
  const [viewPlan, setViewPlan] = useState(null);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [notice, setNotice] = useState("");
  const { myPass, setMyPass } = useAuto();
  const navigate = useNavigate();

  const selectedPlan = passPlans.find(
    (plan) => plan.id === selectedPass
  );

  const getPlanDurationDays = () =>
    selectedPlan.id === "weekly"
      ? 7
      : selectedPlan.id === "monthly"
      ? 30
      : 365;

  const getExpiryDateValue = () => {
    const date = new Date(`${startDate}T00:00:00`);
    date.setDate(date.getDate() + getPlanDurationDays());
    return date;
  };

  const getExpiryDate = () =>
    getExpiryDateValue().toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const getExpiryDateISO = () => {
    const date = getExpiryDateValue();
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  };

  const formattedStartDate = new Date(
    `${startDate}T00:00:00`
  ).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  // Open payment confirmation
  const handlePayment = () => {
    if (getPassStatus(myPass) === "Active") {
      setNotice("You already have an existing plan.");
      return;
    }

    setNotice("");
    setPaymentOpen(true);
  };

  const handleConfirmPayment = () => {
    if (getPassStatus(myPass) === "Active") {
      setPaymentOpen(false);
      setNotice("You already have an existing plan.");
      return;
    }

    const purchasedPass = {
      planId: selectedPlan.id,
      name: selectedPlan.name,
      duration: selectedPlan.duration,
      price: selectedPlan.price,
      description: selectedPlan.description,
      benefits: selectedPlan.benefits,
      startDate: formattedStartDate,
      expiryDate: getExpiryDate(),
      startDateISO: startDate,
      expiryDateISO: getExpiryDateISO(),
      paymentMethod,
      paymentStatus: "Paid",
      status: getPassStatus({ startDateISO: startDate, expiryDateISO: getExpiryDateISO() }),
      purchasedAt: new Date().toISOString(),
    };

    setMyPass(purchasedPass);
    localStorage.setItem("shareAuto-myPass", JSON.stringify(purchasedPass));
    setPaymentOpen(false);
    navigate("/my-pass");
  };

  return (
    <div className="min-h-screen bg-[#F6F5F0] px-4 py-10 sm:px-6 lg:px-8">

      {notice && (
        <div role="alert" className="fixed top-5 right-5 z-[70] flex max-w-sm items-center gap-3 rounded-xl bg-[#28332D] px-5 py-4 text-white shadow-xl">
          <FaCheckCircle className="shrink-0 text-lg text-[#8FAF9A]" />
          <p className="flex-1 text-sm">{notice}</p>
          <button
            type="button"
            onClick={() => setNotice("")}
            aria-label="Dismiss notification"
            className="text-white/70 hover:text-white"
          >
            <FaTimes />
          </button>
        </div>
      )}

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}

        <div className="text-center mb-12">

          <div className="inline-flex items-center gap-2 bg-[#E5EDE6] text-[#28332D] px-4 py-2 rounded-full text-xs font-bold tracking-widest mb-5">
            <FaTicketAlt />
            SHAREAUTO PASSES
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#28332D]">
            Choose Your Travel Pass
          </h1>

          <p className="text-[#788078] mt-4 max-w-xl mx-auto leading-relaxed">
            Travel smarter and save more with our flexible
            travel passes designed for your everyday commute.
          </p>

        </div>

        {/* PASS CARDS */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">

          {passPlans.map((plan) => {

            const isSelected = selectedPass === plan.id;

            return (
              <div
                key={plan.id}
                onClick={() => setSelectedPass(plan.id)}
                className={`relative bg-white rounded-2xl p-6 border-2 cursor-pointer transition duration-300 hover:-translate-y-1 hover:shadow-xl ${
                  isSelected
                    ? "border-[#28332D] shadow-lg"
                    : "border-[#DCE3DC] shadow-sm"
                }`}
              >

                {/* POPULAR BADGE */}

                {plan.popular && (
                  <span className="absolute -top-3 right-5 bg-[#28332D] text-white text-xs font-semibold px-4 py-1.5 rounded-full">
                    Most Popular
                  </span>
                )}


                {/* SELECTED INDICATOR */}

                {isSelected && (
                  <div className="absolute top-5 left-5 w-6 h-6 rounded-full bg-[#28332D] text-white flex items-center justify-center text-xs">
                    <FaCheck />
                  </div>
                )}


                {/* ICON */}

                <div className="w-16 h-16 rounded-2xl bg-[#E5EDE6] text-[#28332D] flex items-center justify-center text-2xl mt-6 mb-5">
                  {plan.icon}
                </div>


                {/* PLAN DETAILS */}

                <h2 className="text-xl font-bold text-[#28332D]">
                  {plan.name}
                </h2>

                <p className="text-sm text-[#788078] mt-2">
                  {plan.description}
                </p>


                {/* PRICE */}

                <div className="mt-7 mb-6">

                  <span className="text-4xl font-bold text-[#28332D]">
                    ₹{plan.price.toLocaleString("en-IN")}
                  </span>

                  <span className="text-[#788078] text-sm ml-2">
                    / {plan.duration}
                  </span>

                </div>


                {/* DIVIDER */}

                <div className="border-t border-[#E5EDE6] mb-6" />


                {/* BENEFITS */}

                <div className="space-y-4 mb-8">

                  {plan.benefits.map((benefit, index) => (

                    <div
                      key={index}
                      className="text-sm text-[#788078] flex items-center gap-3"
                    >
                      <span className="w-5 h-5 rounded-full bg-[#E5EDE6] text-[#28332D] flex items-center justify-center text-[10px] shrink-0">
                        <FaCheck />
                      </span>

                      {benefit}
                    </div>

                  ))}

                </div>


                {/* VIEW DETAILS BUTTON */}

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setViewPlan(plan);
                  }}
                  className="w-full mb-3 py-3 rounded-xl border border-[#8FAF9A] text-[#28332D] font-semibold transition hover:bg-[#E5EDE6]"
                >
                  View Details
                </button>

                {/* SELECT BUTTON */}

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPass(plan.id);
                  }}
                  className={`w-full py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2 ${
                    isSelected
                      ? "bg-[#28332D] text-white hover:bg-[#1E2923]"
                      : "bg-[#E5EDE6] text-[#28332D] hover:bg-[#C5D6C9]"
                  }`}
                >
                  {isSelected ? (
                    <>
                      <FaCheckCircle />
                      Selected
                    </>
                  ) : (
                    "Choose Pass"
                  )}
                </button>

              </div>
            );
          })}

        </div>


        {/* START DATE */}

        <div className="bg-white rounded-2xl border border-[#DCE3DC] p-6 sm:p-8 mt-10 shadow-sm">

          <div className="flex items-center gap-3 mb-6">

            <div className="w-11 h-11 bg-[#E5EDE6] rounded-xl flex items-center justify-center">
              <FaCalendarAlt className="text-[#28332D] text-lg" />
            </div>

            <div>
              <h2 className="text-lg font-bold text-[#28332D]">
                Pass Starting Date
              </h2>

              <p className="text-sm text-[#788078] mt-1">
                Choose when you want your pass to become active.
              </p>
            </div>

          </div>

          <input
            type="date"
            value={startDate}
            min={today}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full sm:w-80 border border-[#DCE3DC] rounded-xl px-4 py-3 text-[#28332D] outline-none focus:border-[#8FAF9A] focus:ring-2 focus:ring-[#E5EDE6] transition"
          />

        </div>


        {/* PASS SUMMARY */}

        <div className="bg-[#28332D] text-white rounded-2xl p-6 sm:p-8 mt-8 shadow-lg">

          <div className="flex items-center gap-3 mb-7">

            <div className="w-11 h-11 bg-white/10 rounded-xl flex items-center justify-center">
              <FaTicketAlt className="text-[#8FAF9A] text-lg" />
            </div>

            <div>
              <h2 className="text-xl font-bold">
                Pass Summary
              </h2>

              <p className="text-sm text-[#C5D6C9] mt-1">
                Review your selected travel pass.
              </p>
            </div>

          </div>


          {/* SUMMARY DETAILS */}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-7">

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <p className="text-xs text-[#C5D6C9] mb-2">
                Selected Pass
              </p>

              <p className="font-bold">
                {selectedPlan.name}
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <p className="text-xs text-[#C5D6C9] mb-2">
                Starting Date
              </p>

              <p className="font-bold">
                {formattedStartDate}
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <p className="text-xs text-[#C5D6C9] mb-2">
                Expiry Date
              </p>

              <p className="font-bold">
                {getExpiryDate()}
              </p>
            </div>

          </div>


          {/* TOTAL */}

          <div className="border-t border-white/20 pt-6 flex flex-wrap justify-between items-center gap-4">

            <div>
              <p className="text-sm text-[#C5D6C9]">
                Total Amount
              </p>

              <p className="text-3xl font-bold mt-1">
                ₹{selectedPlan.price.toLocaleString("en-IN")}
              </p>
            </div>

            <button
              type="button"
              onClick={handlePayment}
              className="bg-[#8FAF9A] hover:bg-[#C5D6C9] text-[#28332D] px-7 py-3.5 rounded-xl font-bold transition flex items-center justify-center gap-3"
            >
              Continue to Payment
              <FaArrowRight />
            </button>

          </div>

          <div className="flex items-center gap-2 text-xs text-[#C5D6C9] mt-6">
            <FaShieldAlt />
            Secure Payments · Digital Pass · Easy Travel
          </div>

        </div>


        {/* FOOTER */}

        <p className="text-center text-[#788078] text-sm mt-8">
          Travel together. Save together. Enjoy every journey.
        </p>

      </div>

      {viewPlan && (
        <PassPlanDetails plan={viewPlan} onClose={() => setViewPlan(null)} />
      )}

      {paymentOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-[#28332D]/75 p-4 backdrop-blur-sm"
          onClick={() => setPaymentOpen(false)}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="payment-title"
            className="w-full max-w-lg rounded-3xl border border-[#C5D6C9] bg-[#F6F5F0] p-6 shadow-2xl sm:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#526C59]">Secure Payment</p>
                <h2 id="payment-title" className="mt-2 text-2xl font-bold text-[#28332D]">Confirm Your Pass</h2>
              </div>
              <button type="button" onClick={() => setPaymentOpen(false)} aria-label="Close payment details" className="rounded-lg p-2 text-[#788078] hover:bg-[#E5EDE6]">
                <FaTimes />
              </button>
            </div>

            <div className="mt-6 space-y-4 rounded-2xl border border-[#DCE3DC] bg-white p-5">
              <div className="flex justify-between gap-4 text-sm">
                <span className="text-[#788078]">Pass plan</span>
                <span className="font-semibold text-[#28332D]">{selectedPlan.name}</span>
              </div>
              <div className="flex justify-between gap-4 text-sm">
                <span className="text-[#788078]">Validity</span>
                <span className="font-semibold text-[#28332D]">{selectedPlan.duration}</span>
              </div>
              <div className="flex justify-between gap-4 text-sm">
                <span className="text-[#788078]">Starts</span>
                <span className="font-semibold text-[#28332D]">{formattedStartDate}</span>
              </div>
              <div className="flex justify-between gap-4 text-sm">
                <span className="text-[#788078]">Expires</span>
                <span className="font-semibold text-[#28332D]">{getExpiryDate()}</span>
              </div>
              <div className="flex justify-between border-t border-dashed border-[#DCE3DC] pt-4">
                <span className="font-bold text-[#28332D]">Amount due</span>
                <span className="text-xl font-bold text-[#28332D]">₹{selectedPlan.price.toLocaleString("en-IN")}</span>
              </div>
            </div>

            <fieldset className="mt-6">
              <legend className="mb-3 text-sm font-semibold text-[#28332D]">Payment method</legend>
              <div className="grid grid-cols-2 gap-3">
                {["UPI", "Card"].map((method) => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setPaymentMethod(method)}
                    className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${paymentMethod === method ? "border-[#8FAF9A] bg-[#E5EDE6] text-[#28332D]" : "border-[#DCE3DC] bg-white text-[#788078]"}`}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </fieldset>

            <p className="mt-4 text-xs leading-5 text-[#788078]">This is a demo payment confirmation. No payment provider is connected.</p>
            <button type="button" onClick={handleConfirmPayment} className="mt-6 w-full rounded-xl bg-[#28332D] py-3.5 font-bold text-white transition hover:bg-[#1E2923]">
              Confirm Payment · ₹{selectedPlan.price.toLocaleString("en-IN")}
            </button>
          </section>
        </div>
      )}

    </div>
  );
};

export default PassPage;
