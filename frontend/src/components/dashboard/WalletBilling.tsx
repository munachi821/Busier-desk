import {
  ArrowRight,
  Receipt,
  PhoneOutgoing,
  Landmark,
  Cog,
} from "lucide-react";
import { Helmet } from "react-helmet-async";

const WalletBilling = () => {
  return (
    <div className="p-6 pt-8">
      <Helmet>
        <title>Wallet & Billing</title>
      </Helmet>
      <div className="mb-10">
        <h2 className="font-manrope font-bold text-3xl md:text-4xl text-[#E7E5E5]">
          Wallet & Billing
        </h2>
        <p className="text-[#ACABAA] font-inter text-sm mt-1 max-w-160 leading-relaxed">
          Manage your enterprise credit, monitor real-time AI consumption, and
          top-up your operational wallet or manage your <b>monthly subscription</b> via Interswitch secure gateway.
        </p>
      </div>

      <div className="bg-black border-l-2 border-[#6BDC9F] p-4 sm:p-6 flex flex-col xl:flex-row xl:items-end items-start justify-between gap-8 xl:gap-4 mt-8">
        <div className="w-full">
          <div className="bg-[#6BDC9F1A] text-[#6BDC9F] px-2 py-0.5 text-[10px] w-fit font-semibold tracking-widest font-inter">
            <span>OPERATIONAL BALANCE</span>
          </div>
          <div className="font-manrope text-4xl sm:text-5xl mt-4 font-bold flex flex-col md:flex-row md:items-baseline gap-1 sm:gap-3">
            <h3 className="text-white">Current Balance:</h3>
            <p className="text-[#6BDC9F]">₦12,500</p>
          </div>
          <p className="text-xs sm:text-sm text-[#ACABAA] font-inter font-medium mt-3">
            Last recharge: 4 hours ago via Interswitch
          </p>
        </div>

        <div className="w-full xl:w-auto">
          <p className="text-[#ACABAA] font-inter font-medium text-sm mb-2">
            QUICK TOP-UP
          </p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center w-full gap-3 sm:gap-0">
            <input
              type="number"
              name="top-up"
              placeholder="₦ Amount"
              className="w-full sm:w-80 lg:w-100 py-3.5 sm:py-4 bg-[#252626] pl-4 placeholder:text-[#ACABAA80] font-inter outline-none text-white rounded-sm sm:rounded-r-none"
            />
            <button className="nav-btn-gradient text-sm text-[#004A2D] px-6 py-3.5 sm:py-4 font-inter font-semibold flex items-center justify-center gap-2 whitespace-nowrap rounded-sm sm:rounded-l-none shrink-0">
              FUND WALLET <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        <div className="bg-[#191A1A] border-[#191a1a] border-b-[3px] hover:border-b-[#008F5A] transition-colors duration-300 p-6 lg:p-8 rounded-sm">
          <p className="text-[#87948A] text-[10px] font-inter font-semibold tracking-widest uppercase mb-4">
            AVG DAILY SPEND
          </p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-white font-manrope font-bold text-3xl">
              ₦4,200
            </h3>
            <span className="text-[#E87A7A] text-xs font-semibold tracking-wide">
              +12%
            </span>
          </div>
        </div>

        <div className="bg-[#191A1A] border-[#191a1a] border-b-[3px] border-b-[#6BDC9F] p-6 lg:p-8 rounded-sm">
          <p className="text-[#6BDC9F] text-[10px] font-inter font-semibold tracking-widest uppercase mb-4">
            ACTIVE SUBSCRIPTION
          </p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-white font-manrope font-bold text-2xl uppercase">
              Enterprise
            </h3>
            <span className="text-[#6BDC9F] text-[10px] font-bold tracking-widest ml-2">
              Billed Monthly
            </span>
          </div>
        </div>

        <div className="bg-[#191A1A] border-[#191a1a] border-b-[3px] hover:border-b-[#008F5A] transition-colors duration-300 p-6 lg:p-8 rounded-sm">
          <p className="text-[#87948A] text-[10px] font-inter font-semibold tracking-widest uppercase mb-4">
            NEXT AUTO-REFILL
          </p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-white font-manrope font-bold text-3xl">
              ₦5,000
            </h3>
            <span className="text-[#87948A] text-[11px] font-medium tracking-wide">
              at &lt;1k balance
            </span>
          </div>
        </div>
      </div>

      <div className="mt-14 max-w-5xl">
        <div className="flex items-center gap-3 mb-6 px-1">
          <Receipt className="text-[#6BDC9F]" size={24} />
          <h2 className="text-white font-manrope font-bold text-xl tracking-wide">
            Transaction History
          </h2>
        </div>

        <div className="bg-[#131313] border border-[#262626] overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-[#1C1C1C] border-b border-[#262626] font-inter">
                <th className="px-6 py-5 text-[10px] font-semibold text-[#87948A] tracking-widest uppercase w-1/4">
                  DATE/TIME
                </th>
                <th className="px-6 py-5 text-[10px] font-semibold text-[#87948A] tracking-widest uppercase w-1/2">
                  DESCRIPTION
                </th>
                <th className="px-6 py-5 text-[10px] font-semibold text-[#87948A] tracking-widest uppercase text-right w-1/4">
                  AMOUNT
                </th>
              </tr>
            </thead>
            <tbody className="font-inter">
              <tr className="border-b border-[#262626] bg-[#141414] hover:bg-[#1A1A1A] transition-colors">
                <td className="px-6 py-6 text-[#ACABAA] text-xs font-medium tracking-wide">
                  Mar 23, 2024 <span className="mx-1 text-[#333]">|</span> 14:42
                </td>
                <td className="px-6 py-6">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-[#2a1b1b] rounded-sm text-[#E87A7A]">
                      <PhoneOutgoing size={17} />
                    </div>
                    <div>
                      <p className="text-[#E7E5E5] text-sm font-semibold tracking-wide">
                        AI Call (2 mins)
                      </p>
                      <p className="text-[#87948A] text-[11px] mt-1 tracking-wider">
                        Agent: Sales-Bot-01
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-6 text-right font-manrope font-bold text-[#E87A7A] tracking-wide text-sm">
                  -₦200
                </td>
              </tr>

              <tr className="border-b border-[#262626] bg-[#141414] hover:bg-[#1A1A1A] transition-colors">
                <td className="px-6 py-6 text-[#ACABAA] text-xs font-medium tracking-wide">
                  Mar 23, 2024 <span className="mx-1 text-[#333]">|</span> 09:15
                </td>
                <td className="px-6 py-6">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-[#1A2520] rounded-sm text-[#6BDC9F]">
                      <Landmark size={17} />
                    </div>
                    <div>
                      <p className="text-[#E7E5E5] text-sm font-semibold tracking-wide">
                        Interswitch Top-Up
                      </p>
                      <p className="text-[#87948A] text-[11px] mt-1 tracking-wider">
                        Ref: ISW-948275103
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-6 text-right font-manrope font-bold text-[#6BDC9F] tracking-wide text-sm">
                  +₦5,000
                </td>
              </tr>

              <tr className="border-b border-[#262626] bg-[#141414] hover:bg-[#1A1A1A] transition-colors">
                <td className="px-6 py-6 text-[#ACABAA] text-xs font-medium tracking-wide">
                  Mar 22, 2024 <span className="mx-1 text-[#333]">|</span> 22:10
                </td>
                <td className="px-6 py-6">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-[#2a1b1b] rounded-sm text-[#E87A7A]">
                      <PhoneOutgoing size={17} />
                    </div>
                    <div>
                      <p className="text-[#E7E5E5] text-sm font-semibold tracking-wide">
                        AI Call (12 mins)
                      </p>
                      <p className="text-[#87948A] text-[11px] mt-1 tracking-wider">
                        Agent: Support-Bot-B
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-6 text-right font-manrope font-bold text-[#E87A7A] tracking-wide text-sm">
                  -₦1,200
                </td>
              </tr>

              <tr className="bg-[#141414] hover:bg-[#1A1A1A] transition-colors">
                <td className="px-6 py-6 text-[#ACABAA] text-xs font-medium tracking-wide">
                  Mar 22, 2024 <span className="mx-1 text-[#333]">|</span> 10:05
                </td>
                <td className="px-6 py-6">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-[#1F2020] rounded-sm text-[#ACABAA]">
                      <Cog size={17} />
                    </div>
                    <div>
                      <p className="text-[#E7E5E5] text-sm font-semibold tracking-wide">
                        Platform Subscription
                      </p>
                      <p className="text-[#87948A] text-[11px] mt-1 tracking-wider">
                        Monthly Enterprise Tier
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-6 text-right font-manrope font-bold text-[#ACABAA] tracking-wide text-sm">
                  -₦25,000
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex justify-center mt-10 mb-4">
          <button className="px-8 py-3.5 rounded-sm bg-[#111111] hover:bg-[#1A1A1A] border border-[#262626] text-[#87948A] text-[10px] font-inter font-bold tracking-widest transition-colors uppercase">
            Load Older Transactions
          </button>
        </div>
      </div>
    </div>
  );
};
export default WalletBilling;
