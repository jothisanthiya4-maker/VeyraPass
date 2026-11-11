import { FaCalendarAlt, FaCheck, FaClock, FaTimes } from "react-icons/fa";

const PassPlanDetails = ({ plan, onClose }) => {
  const durationDays = Number.parseInt(plan.duration, 10);
  const dailyCost = plan.price / durationDays;

  return (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-[#28332D]/75 p-4 backdrop-blur-sm"
    onClick={onClose}
  >
    <section
      role="dialog"
      aria-modal="true"
      aria-labelledby="pass-plan-title"
      className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-[#C5D6C9] bg-[#F6F5F0] p-6 shadow-2xl sm:p-8"
      onClick={(event) => event.stopPropagation()}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E5EDE6] text-2xl text-[#28332D]">
            {plan.icon}
          </div>
          <p className="text-xs font-bold uppercase tracking-widest text-[#526C59]">
            Pass plan details
          </p>
          <h2 id="pass-plan-title" className="mt-2 text-2xl font-bold text-[#28332D]">
            {plan.name}
          </h2>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close plan details"
          className="rounded-lg p-2 text-[#788078] hover:bg-[#E5EDE6] hover:text-[#28332D]"
        >
          <FaTimes />
        </button>
      </div>

      <p className="mt-5 leading-7 text-[#788078]">{plan.description}. This pass is designed to make regular shared-auto travel easier to plan and budget.</p>

      <div className="mt-6 grid gap-4 rounded-2xl bg-[#E5EDE6] p-5 sm:grid-cols-3">
        <div>
          <p className="text-sm text-[#526C59]">Plan duration</p>
          <p className="mt-1 font-semibold text-[#28332D]">{plan.duration}</p>
        </div>
        <div>
          <p className="text-sm text-[#526C59]">Pass price</p>
          <p className="mt-1 text-xl font-bold text-[#28332D]">
            ₹{plan.price.toLocaleString("en-IN")}
          </p>
        </div>
        <div>
          <p className="text-sm text-[#526C59]">Approx. daily cost</p>
          <p className="mt-1 font-semibold text-[#28332D]">
            ₹{dailyCost.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
          </p>
        </div>
      </div>

      {plan.popular && (
        <p className="mt-5 inline-flex rounded-full bg-[#C5D6C9] px-3 py-1.5 text-xs font-bold text-[#28332D]">
          Most Popular
        </p>
      )}

      <div className="mt-7 grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-[#DCE3DC] bg-white p-5">
          <h3 className="font-bold text-[#28332D]">Plan benefits</h3>
          <ul className="mt-4 space-y-3">
            {plan.benefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-3 text-sm text-[#526C59]">
                <FaCheck className="mt-1 shrink-0 text-[#8FAF9A]" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-[#DCE3DC] bg-white p-5">
          <h3 className="font-bold text-[#28332D]">How to get started</h3>
          <ol className="mt-4 space-y-4 text-sm text-[#788078]">
            <li className="flex gap-3"><FaCalendarAlt className="mt-1 shrink-0 text-[#8FAF9A]" /><span>Choose this plan and set the date you want it to begin.</span></li>
            <li className="flex gap-3"><FaClock className="mt-1 shrink-0 text-[#8FAF9A]" /><span>Your pass stays valid for {plan.duration} from its start date.</span></li>
            <li className="flex gap-3"><FaCheck className="mt-1 shrink-0 text-[#8FAF9A]" /><span>Review the pass summary and continue to payment.</span></li>
          </ol>
        </div>
      </div>

      <p className="mt-6 rounded-xl border border-[#DCE3DC] bg-white px-4 py-3 text-xs leading-5 text-[#788078]">
        The daily cost is an estimate calculated from the plan price and duration. Your selected start and expiry dates are shown in the pass summary.
      </p>

      <button
        type="button"
        onClick={onClose}
        className="mt-8 w-full rounded-xl bg-[#28332D] py-3 font-semibold text-white transition hover:bg-[#1E2923]"
      >
        Close Details
      </button>
    </section>
  </div>
  );
};

export default PassPlanDetails;
