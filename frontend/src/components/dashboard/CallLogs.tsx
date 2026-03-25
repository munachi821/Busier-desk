import { ChevronLeft, ChevronRight } from "lucide-react";

const CallLogs = () => {
  return (
    <div className="p-6 pt-8">
      <h2 className="font-manrope font-bold text-4xl text-[#E7E5E5]">
        Call Registry
      </h2>

      <div className="bg-[#191A1A] p-5 rounded-sm flex items-center mt-10">
        <div className="border-r border-[#48484833] pr-10 w-fit">
          <p className="font-inter text-[#ACABAA] text-sm tracking-widest">
            CALLS TODAY
          </p>
          <h3 className="font-manrope font-bold text-2xl text-white mt-1">
            142
          </h3>
        </div>

        <div className="border-r border-[#48484833] pr-10 w-fit ml-10">
          <p className="font-inter text-[#ACABAA] text-sm tracking-widest">
            MINUTES USED
          </p>
          <h3 className="font-manrope font-bold text-2xl text-white mt-1">
            845
          </h3>
        </div>

        <div className="w-fit ml-10">
          <p className="font-inter text-[#ACABAA] text-sm tracking-widest">
            RESOLVED
          </p>
          <h3 className="font-manrope font-bold text-2xl text-[#6BDC9F] mt-1">
            94%
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
                Duration
              </th>
              <th className="px-6 py-4 text-[11px] font-semibold text-[#87948A] tracking-wider uppercase">
                Cost
              </th>
              <th className="px-6 py-4 text-[11px] font-semibold text-[#87948A] tracking-wider uppercase text-right">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="font-inter">
            {[
              {
                status: "Resolved",
                caller: "+234 803 123 4567",
                duration: "12m 45s",
                cost: "-₦150",
                isMissed: false,
              },
              {
                status: "Missed",
                caller: "+234 701 987 6543",
                duration: "00m 00s",
                cost: "₦0",
                isMissed: true,
              },
              {
                status: "Resolved",
                caller: "+234 812 345 6789",
                duration: "05m 12s",
                cost: "-₦85",
                isMissed: false,
              },
              {
                status: "Resolved",
                caller: "+234 905 555 0192",
                duration: "22m 30s",
                cost: "-₦320",
                isMissed: false,
              },
              {
                status: "Resolved",
                caller: "+234 802 000 1122",
                duration: "02m 05s",
                cost: "-₦45",
                isMissed: false,
              },
            ].map((log, index) => (
              <tr
                key={index}
                className="border-b border-[#262626] bg-[#141414] hover:bg-[#1A1A1A] transition-colors"
              >
                <td className="px-6 py-5">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2.5 h-2.5 rounded-sm ${
                        log.isMissed ? "bg-[#555]" : "bg-[#6BDC9F]"
                      }`}
                    ></div>
                    <span className="text-[#ACABAA] text-sm">{log.status}</span>
                  </div>
                </td>
                <td className="px-6 py-5 text-[#E7E5E5] text-sm font-medium tracking-wide">
                  {log.caller}
                </td>
                <td className="px-6 py-5 text-[#ACABAA] text-sm tracking-wide">
                  {log.duration}
                </td>
                <td
                  className={`px-6 py-5 text-sm font-medium tracking-wide ${
                    log.isMissed ? "text-[#87948A]" : "text-[#E87A7A]"
                  }`}
                >
                  {log.cost}
                </td>
                <td className="px-6 py-5 text-right">
                  <button className="border border-[#333] text-[#E7E5E5] text-[10px] font-bold tracking-widest px-4 py-2.5 rounded hover:bg-[#222] transition-colors bg-[#111]">
                    VIEW TRANSCRIPT / WHATSAPP
                  </button>
                </td>
              </tr>
            ))}
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
