
import React, { useState } from "react";

const passPlans = [
  {
    id: "weekly",
    name: "Weekly Pass",
    duration: "7 Days",
    price: 250,
    icon: "📅",
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
    icon: "🌟",
    description: "Best for frequent travellers",
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
    icon: "🏆",
    description: "Best for long-term travellers",
    benefits: [
      "Valid for 365 days",
      "Maximum travel savings",
      "Easy digital pass",
    ],
  },
];

const PassPage = () => {
  const [selectedPass, setSelectedPass] = useState("weekly");

  const [startDate, setStartDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const selectedPlan = passPlans.find(
    (plan) => plan.id === selectedPass
  );

  // Calculate Expiry Date
  const getExpiryDate = () => {
    const date = new Date(`${startDate}T00:00:00`);

    const days =
      selectedPlan.id === "weekly"
        ? 7
        : selectedPlan.id === "monthly"
        ? 30
        : 365;

    date.setDate(date.getDate() + days);

    return date.toLocaleDateString("en-IN");
  };

  // Payment Handler
  const handlePayment = () => {
    alert(
      `Selected: ${selectedPlan.name}\nAmount: ₹${selectedPlan.price}`
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 md:px-10">

      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">

          <p className="text-blue-600 font-semibold tracking-widest text-sm">
            VEYRAPASS
          </p>

          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mt-3">
            Choose Your Travel Pass
          </h1>

          <p className="text-slate-500 mt-3">
            Select a suitable pass and enjoy a comfortable journey.
          </p>

        </div>

        {/* Pass Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">

          {passPlans.map((plan) => (

            <div
              key={plan.id}
              onClick={() => setSelectedPass(plan.id)}
              className={`relative bg-white rounded-2xl p-6 border-2 cursor-pointer transition duration-300 hover:-translate-y-1 hover:shadow-xl
              ${
                selectedPass === plan.id
                  ? "border-blue-600 shadow-lg"
                  : "border-slate-200"
              }`}
            >

              {/* Popular Badge */}
              {plan.popular && (
                <span className="absolute -top-3 right-5 bg-blue-600 text-white text-xs px-4 py-1 rounded-full">
                  Most Popular
                </span>
              )}

              {/* Icon */}
              <div className="text-4xl mb-4">
                {plan.icon}
              </div>

              {/* Name */}
              <h2 className="text-xl font-bold text-slate-800">
                {plan.name}
              </h2>

              <p className="text-sm text-slate-500 mt-2">
                {plan.description}
              </p>

              {/* Price */}
              <div className="mt-6 mb-5">

                <span className="text-4xl font-bold text-slate-900">
                  ₹{plan.price}
                </span>

                <span className="text-slate-500 text-sm">
                  / {plan.duration}
                </span>

              </div>

              {/* Benefits */}
              <div className="space-y-3 mb-7">

                {plan.benefits.map((benefit, index) => (

                  <p
                    key={index}
                    className="text-sm text-slate-600 flex items-center gap-2"
                  >
                    <span className="text-green-600 font-bold">
                      ✓
                    </span>

                    {benefit}
                  </p>

                ))}

              </div>

              {/* Select Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedPass(plan.id);
                }}
                className={`w-full py-3 rounded-xl font-semibold transition
                ${
                  selectedPass === plan.id
                    ? "bg-blue-600 text-white"
                    : "bg-blue-50 text-blue-700 hover:bg-blue-100"
                }`}
              >
                {selectedPass === plan.id
                  ? "✓ Selected"
                  : "Choose Pass"}
              </button>

            </div>

          ))}

        </div>

        {/* Start Date */}
        <div className="bg-white rounded-2xl p-6 mt-10 shadow-sm">

          <h2 className="text-lg font-bold text-slate-800 mb-4">
            Select Pass Starting Date
          </h2>

          <input
            type="date"
            value={startDate}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full md:w-80 border border-slate-300 rounded-xl px-4 py-3 outline-none focus:border-blue-600"
          />

        </div>

        {/* Pass Summary */}
        <div className="bg-slate-900 text-white text-center rounded-2xl p-7 mt-8">

          <h2 className="text-xl font-bold mb-6">
            Pass Summary
          </h2>

          <div className="space-y-4 text-sm">

            <div className="flex justify-between">
              <span className="text-slate-400">
                Selected Pass
              </span>

              <span>{selectedPlan.name}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-400">
                Starting Date
              </span>

              <span>{startDate}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-400">
                Expiry Date
              </span>

              <span>{getExpiryDate()}</span>
            </div>

            <div className="border-t border-amber-400 pt-5 flex justify-between items-center">

              <span className="font-semibold">
                Total Amount
              </span>

              <span className="text-3xl font-bold text-blue-400">
                ₹{selectedPlan.price}
              </span>

            </div>

          </div>

          {/* Payment Button */}
          <button
            onClick={handlePayment}
            className="w-full mt-7 bg-blue-600 hover:bg-green-500 py-3 rounded-xl font-semibold transition"
          >
            Continue to Payment →
          </button>

        </div>

        {/* Footer */}
        <p className="text-center text-slate-400 text-sm mt-8">
          Secure Payments | Digital Pass | Easy Travel
        </p>

      </div>

    </div>
  );
};

export default PassPage;
