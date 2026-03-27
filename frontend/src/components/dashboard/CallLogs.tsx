import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../lib/api";

const CallLogs = () => {
  const { data: calls, isLoading } = useQuery({
    queryKey: ["calls"],
    queryFn: async () => {
      const res = await api.get("/assistant/calls");
      return res.data;
    },
  });

  const stats = {
    today: calls?.length || 0,
    minutes: Math.ceil((calls?.length || 0) * 5.2), // Mocked for now
    resolved: "94%",
  };

  return (
    <div className="p-2 sm:p-6 pt-8">
      <Helmet>
        <title>Call Registry</title>
      </Helmet>
      <h2 className="font-manrope font-bold text-4xl text-[#E7E5E5]">
        Call Registry
      </h2>

      <div className="bg-[#191A1A] p-5 rounded-sm flex flex-col sm:flex-row items-start sm:items-center mt-10 gap-6 sm:gap-0">
        <div className="sm:border-r border-[#48484833] sm:pr-10 w-full sm:w-fit">
          <p className="font-inter text-[#ACABAA] text-sm tracking-widest">
            CALLS TODAY
          </p>
          <h3 className="font-manrope font-bold text-2xl text-white mt-1">
            {stats.today}
          </h3>
        </div>

        <div className="sm:border-r border-[#48484833] sm:pr-10 w-full sm:w-fit sm:ml-10">
          <p className="font-inter text-[#ACABAA] text-sm tracking-widest">
            MINUTES USED
          </p>
          <h3 className="font-manrope font-bold text-2xl text-white mt-1">
            {stats.minutes}
          </h3>
        </div>

        <div className="w-full sm:w-fit sm:ml-10">
          <p className="font-inter text-[#ACABAA] text-sm tracking-widest">
            RESOLVED
          </p>
          <h3 className="font-manrope font-bold text-2xl text-[#6BDC9F] mt-1">
            {stats.resolved}
          </h3>
        </div>
      </div>

      <div className="mt-10 overflow-x-auto border border-[#262626] rounded-md bg-[#131313]">
        <table className="w-full text-left border-collapse whitespace-nowrap">
          <thead>
            <tr className="bg-[#1C1C1C] border-b border-[#262626] font-inter">
              <th className="px-6 py-4 text-[11px] font-semibold text-[#87948A] tracking-wider uppercase">
                Status
              </th>
              <th className="px-6 py-4 text-[11px] font-semibold text-[#87948A] tracking-wider uppercase">
                Caller ID
              </th>
              <th className="px-6 py-4 text-[11px] font-semibold text-[#87948A] tracking-wider uppercase">
                Intent
              </th>
              <th className="px-6 py-4 text-[11px] font-semibold text-[#87948A] tracking-wider uppercase text-right">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="font-inter">
            {isLoading ? (
              <tr>
                <td colSpan={4} className="px-6 py-10 text-center">
                  <div className="flex justify-center items-center gap-2 text-[#ACABAA]">
                    <Loader2 className="animate-spin" size={20} />
                    <span>Loading call logs...</span>
                  </div>
                </td>
              </tr>
            ) : calls?.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-10 text-center text-[#ACABAA]">
                  No calls recorded yet.
                </td>
              </tr>
            ) : (
              calls?.map((call: any, index: number) => (
                <tr
                  key={call.id || index}
                  className="border-b border-[#262626] bg-[#141414] hover:bg-[#1A1A1A] transition-colors"
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2.5 h-2.5 rounded-sm ${
                          call.status === "failed" ? "bg-[#E87A7A]" : "bg-[#6BDC9F]"
                        }`}
                      ></div>
                      <span className="text-[#ACABAA] text-sm capitalize">{call.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-[#E7E5E5] text-sm font-medium tracking-wide">
                    {call.customerNumber}
                  </td>
                  <td className="px-6 py-5 text-[#ACABAA] text-sm tracking-wide italic">
                    {call.intent || "Unknown"}
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button className="border border-[#333] text-[#E7E5E5] text-[10px] font-bold tracking-widest px-4 py-2.5 rounded hover:bg-[#222] transition-colors bg-[#111]">
                      VIEW TRANSCRIPT / WHATSAPP
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="flex items-center justify-between px-6 py-4 bg-[#1C1C1C] rounded-b-md">
          <p className="font-inter text-[#87948A] text-[11px]">
            Showing 1-5 of 1,420 entries
          </p>
          <div className="flex items-center gap-2">
            <button className="p-1.5 border border-[#333] rounded bg-[#111] hover:bg-[#222] text-[#ACABAA]">
              <ChevronLeft size={16} />
            </button>
            <button className="p-1.5 border border-[#333] rounded bg-[#111] hover:bg-[#222] text-[#E7E5E5]">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CallLogs;
