import { Bot, MessageCircleCheck, Phone, Wallet } from "lucide-react";
import logo from "/images/BusierDesk_logo.png";
import { useState } from "react";
import CallLogs from "./CallLogs";
import AgentConfiguration from "./AgentConfiguration";
import WalletBilling from "./WalletBilling";

const DashboardLayout = () => {
  const [activeTab, setActiveTab] = useState("call-logs");

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
  return (
    <div className="h-screen w-full flex">
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

      <div className="w-full bg-[#0E0E0E] p-4">{handleTabShow()}</div>
    </div>
  );
};
export default DashboardLayout;
