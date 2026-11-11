import { useNavigate } from "react-router-dom";
import { FaArrowRight, FaCalendarAlt, FaCheck, FaCheckCircle, FaTicketAlt } from "react-icons/fa";
import { useAuto } from "../../context/AutoContext";

const MyPass = () => {
  const { myPass } = useAuto();
  const navigate = useNavigate();

  if (!myPass) {
    return (
      <div className="min-h-screen bg-[#F6F5F0] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl rounded-3xl border border-[#DCE3DC] bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E5EDE6] text-2xl text-[#28332D]">
            <FaTicketAlt />
          </div>
          <h1 className="mt-5 text-3xl font-bold text-[#28332D]">My Pass</h1>
          <p className="mt-3 text-[#788078]">You haven’t purchased a travel pass yet.</p>
          <button
            type="button"
            onClick={() => navigate("/pass")}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#28332D] px-6 py-3 font-semibold text-white transition hover:bg-[#1E2923]"
          >
            Browse Pass Plans <FaArrowRight />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F5F0] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8FAF9A]">ShareAuto Digital Pass</p>
          <h1 className="mt-2 text-3xl font-bold text-[#28332D] sm:text-4xl">My Pass</h1>
          <p className="mt-2 text-[#788078]">Your purchased travel pass and validity details.</p>
        </div>

        <section className="overflow-hidden rounded-3xl border border-[#DCE3DC] bg-white shadow-lg">
          <div className="flex flex-wrap items-start justify-between gap-4 bg-[#28332D] p-6 text-white sm:p-8">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#8FAF9A] text-2xl text-[#28332D]">
                <FaTicketAlt />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#C5D6C9]">
                  {myPass.status === "Expired" ? "Expired plan" : myPass.status === "Upcoming" ? "Upcoming plan" : "Active plan"}
                </p>
                <h2 className="mt-1 text-2xl font-bold">{myPass.name}</h2>
                <p className="mt-1 text-sm text-[#C5D6C9]">{myPass.description}</p>
              </div>
            </div>
            <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold ${myPass.status === "Expired" ? "bg-red-100 text-red-800" : "bg-[#8FAF9A] text-[#28332D]"}`}>
              <FaCheckCircle /> {myPass.status}
            </span>
          </div>

          <div className="grid gap-4 p-6 sm:grid-cols-2 sm:p-8">
            <div className="rounded-2xl bg-[#F6F5F0] p-5">
              <div className="flex items-center gap-2 text-sm text-[#788078]"><FaCalendarAlt className="text-[#8FAF9A]" /> Validity</div>
              <p className="mt-2 text-lg font-bold text-[#28332D]">{myPass.duration}</p>
            </div>
            <div className="rounded-2xl bg-[#F6F5F0] p-5">
              <div className="flex items-center gap-2 text-sm text-[#788078]"><FaCalendarAlt className="text-[#8FAF9A]" /> Pass price</div>
              <p className="mt-2 text-lg font-bold text-[#28332D]">₹{myPass.price.toLocaleString("en-IN")}</p>
            </div>
            <div className="rounded-2xl bg-[#F6F5F0] p-5">
              <p className="text-sm text-[#788078]">Starts on</p>
              <p className="mt-2 text-lg font-bold text-[#28332D]">{myPass.startDate}</p>
            </div>
            <div className="rounded-2xl bg-[#F6F5F0] p-5">
              <p className="text-sm text-[#788078]">Expires on</p>
              <p className="mt-2 text-lg font-bold text-[#28332D]">{myPass.expiryDate}</p>
            </div>
          </div>

          <div className="px-6 pb-6 sm:px-8 sm:pb-8">
            <div className="rounded-2xl border border-[#DCE3DC] p-5">
              <h3 className="font-bold text-[#28332D]">Pass benefits</h3>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {myPass.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3 text-sm text-[#526C59]">
                    <FaCheck className="mt-1 shrink-0 text-[#8FAF9A]" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4 flex flex-wrap justify-between gap-3 rounded-2xl bg-[#E5EDE6] p-5 text-sm">
              <p className="text-[#526C59]">Payment: <span className="font-semibold text-[#28332D]">{myPass.paymentStatus} via {myPass.paymentMethod}</span></p>
              <p className="text-[#526C59]">Pass ID: <span className="font-semibold text-[#28332D]">{myPass.planId}-{new Date(myPass.purchasedAt).getTime()}</span></p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MyPass;
