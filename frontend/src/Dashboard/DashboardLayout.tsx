import {
  Bot,
  MessageCircleCheck,
  Phone,
  Wallet,
  Bell,
  Search,
  UserCircle2,
  Copy,
  Check,
} from "lucide-react";
import logo from "/images/BusierDesk_logo.png";
import { useState } from "react";
import CallLogs from "./CallLogs";
import AgentConfiguration from "./AgentConfiguration";
import WalletBilling from "./WalletBilling";

const DashboardLayout = () => {
  const [activeTab, setActiveTab] = useState("call-logs");
  const [copied, setCopied] = useState(false);

  const handleTabShow = () => {
    if (activeTab === "call-logs") {
      return <CallLogs />;
    }
    if (activeTab === "agent-configuration") {
      return <AgentConfiguration />;
    }
    if (activeTab === "wallet-billing") {
      return <WalletBilling />;
    }
  };

  const agentNumber = "+2348031234567";
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(agentNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.log("Failed to copy text", error);
    }
  };
  return (
    <div className="h-screen w-full flex overflow-hidden">
      <aside className="bg-[#000000] h-full w-60 relative shrink-0">
        <div className="flex items-center gap-2 px-4 py-6">
          <div>
            <img src={logo} alt="busier desk logo" width={50} />
          </div>
          <h2 className="font-manrope text-[#6BDC9F] font-bold text-xl">
            BusierDesk
          </h2>
        </div>

        <div className="pl-4 font-manrope mt-2">
          <ul className="space-y-3">
            <li
              onClick={() => setActiveTab("call-logs")}
              className={`flex items-center gap-2.5 py-3 pl-3 rounded-l-sm tracking-wide cursor-pointer ${activeTab === "call-logs" ? "bg-[#131313] text-[#6BDC9F] font-semibold" : "text-[#ACABAA]"}`}
            >
              <Phone
                fill={activeTab === "call-logs" ? "#6BDC9F" : ""}
                strokeWidth={activeTab === "call-logs" ? "0.5" : "1.5"}
              />
              Call Logs
            </li>
            <li
              onClick={() => setActiveTab("agent-configuration")}
              className={`flex items-center gap-2.5 py-3 pl-3 rounded-l-sm tracking-wide hover:bg-[#131313] transition-colors cursor-pointer ${activeTab === "agent-configuration" ? "bg-[#131313] text-[#6BDC9F] font-semibold" : "text-[#ACABAA]"}`}
            >
              <Bot
                fill={activeTab === "agent-configuration" ? "#6BDC9F" : ""}
                strokeWidth={
                  activeTab === "agent-configuration" ? "0.5" : "1.5"
                }
              />
              Agent Configuration
            </li>
            <li
              onClick={() => setActiveTab("wallet-billing")}
              className={`flex items-center gap-2.5 py-3 pl-3 rounded-l-sm tracking-wide hover:bg-[#131313] transition-colors cursor-pointer ${activeTab === "wallet-billing" ? "bg-[#131313] text-[#6BDC9F] font-semibold" : "text-[#ACABAA]"}`}
            >
              <Wallet
                fill={activeTab === "wallet-billing" ? "#6BDC9F" : ""}
                strokeWidth={activeTab === "wallet-billing" ? "0.5" : "1.5"}
              />
              Wallet & Billing
            </li>
          </ul>
        </div>
        <div className="flex items-center gap-2 absolute bottom-4 left-4">
          <div className="p-3 bg-[#252626] rounded-sm text-white w-fit">
            <MessageCircleCheck size={22} />
          </div>
          <div className="flex flex-col">
            <p className="text-[#E5E2E1] text-sm font-semibold">Support</p>
            <p className="text-[#87948A] font-inter text-xs font-medium">
              24/7 Available
            </p>
          </div>
        </div>
      </aside>

      <div className="w-full bg-[#0E0E0E] p-4 overflow-y-auto">
        <nav className="flex items-center justify-between">
          <div className="flex gap-6 items-center">
            <p className="font-manrope text-[#E5E2E1] text-[22px] font-bold">
              Demo Auto Repair
            </p>

            <div className="font-inter text-white font-semibold text-sm bg-[#252626] border border-[#4848481A] p-2 flex items-center">
              <span className="text-[#ACABAA] font-manrope font-normal">
                AGENT NUMBER:
              </span>
              {"  "}
              <p className="ml-2.5">+2348031234567</p>
              <button
                onClick={handleCopy}
                className={`ml-3 transition-all duration-200 ${
                  copied
                    ? "text-[#008F5A] bg-green-900/20" // Success state (Emerald)
                    : "text-gray-400 hover:text-white hover:bg-gray-800" // Default state
                }`}
              >
                {copied ? <Check size={20} /> : <Copy size={20} />}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {activeTab === "call-logs" && (
              <div className="flex bg-[#1F2020] items-center gap-2">
                <Search className="text-white ml-2" size={20} />
                <input
                  type="search"
                  placeholder="Search Call Logs"
                  className="w-50 py-2.5 bg-[#1F2020] text-[#ACABAA80] font-inter text-sm pl-1 outline-none"
                />
              </div>
            )}

            <div className="font-inter text-right">
              <p className="text-[#ACABAA] text-sm tracking-wide">
                AVAILABLE BALANCE
              </p>
              <p className="text-[#6BDC9F] font-semibold">₦12,500</p>
            </div>

            <div className="text-[#ACABAA]">
              <Bell size={25} />
            </div>

            <div className="text-[#ACABAA]">
              <UserCircle2 size={25} />
            </div>
          </div>
        </nav>
        {handleTabShow()}
      </div>
    </div>
  );
};
export default DashboardLayout;
