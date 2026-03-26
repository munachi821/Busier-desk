import { ChevronLeft, ChevronRight, Loader2, UserPlus } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../lib/api";

const Leads = () => {
  const { data: leads, isLoading } = useQuery({
    queryKey: ["leads"],
    queryFn: async () => {
      const res = await api.get("/assistant/leads");
      return res.data;
    },
  });

  return (
    <div className="p-2 sm:p-6 pt-8">
      <Helmet>
        <title>Lead Management</title>
      </Helmet>
      <div className="flex justify-between items-center mb-10">
        <h2 className="font-manrope font-bold text-4xl text-[#E7E5E5]">
          Lead Management
        </h2>
        <button className="bg-[#008F5A] px-6 py-2.5 font-inter font-bold text-[12px] tracking-widest rounded-sm text-white flex items-center gap-2 hover:bg-[#007046] transition-colors">
          <UserPlus size={18} /> EXPORT LEADS
        </button>
      </div>

      <div className="mt-10 overflow-x-auto border border-[#262626] rounded-md bg-[#131313]">
        <table className="w-full text-left border-collapse whitespace-nowrap">
          <thead>
            <tr className="bg-[#1C1C1C] border-b border-[#262626] font-inter">
              <th className="px-6 py-4 text-[11px] font-semibold text-[#87948A] tracking-wider uppercase">
                Name
              </th>
              <th className="px-6 py-4 text-[11px] font-semibold text-[#87948A] tracking-wider uppercase">
                Phone Number
              </th>
              <th className="px-6 py-4 text-[11px] font-semibold text-[#87948A] tracking-wider uppercase">
                Intent / Interest
              </th>
              <th className="px-6 py-4 text-[11px] font-semibold text-[#87948A] tracking-wider uppercase">
                Captured On
              </th>
            </tr>
          </thead>
          <tbody className="font-inter">
            {isLoading ? (
              <tr>
                <td colSpan={4} className="px-6 py-10 text-center">
                  <div className="flex justify-center items-center gap-2 text-[#ACABAA]">
                    <Loader2 className="animate-spin" size={20} />
                    <span>Loading leads...</span>
                  </div>
                </td>
              </tr>
            ) : leads?.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-10 text-center text-[#ACABAA]">
                  No leads captured yet.
                </td>
              </tr>
            ) : (
              leads?.map((lead: any, index: number) => (
                <tr
                  key={lead.id || index}
                  className="border-b border-[#262626] bg-[#141414] hover:bg-[#1A1A1A] transition-colors"
                >
                  <td className="px-6 py-5 text-[#E7E5E5] text-sm font-medium tracking-wide">
                    {lead.name || "Anonymous Customer"}
                  </td>
                  <td className="px-6 py-5 text-[#ACABAA] text-sm tracking-wide">
                    {lead.phoneNumber}
                  </td>
                  <td className="px-6 py-5">
                    <span className="bg-[#008F5A]/10 text-[#6BDC9F] px-3 py-1 rounded-sm text-[10px] font-bold tracking-widest uppercase border border-[#008F5A]/20">
                      {lead.intent || "General Interest"}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-[#ACABAA] text-sm tracking-wide">
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="flex items-center justify-between px-6 py-4 bg-[#1C1C1C] rounded-b-md">
          <p className="font-inter text-[#87948A] text-[11px]">
            Showing {leads?.length || 0} entries
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
export default Leads;
