import {
  Bot,
  MessageCircleCheck,
  Phone,
  Wallet,
  UserCircle2,
  Copy,
  Check,
  Menu,
  X,
} from "lucide-react";
import logo from "/images/BusierDesk_logo.png";
import { useState } from "react";
import CallLogs from "./CallLogs";
import AgentConfiguration from "./AgentConfiguration";
import WalletBilling from "./WalletBilling";
import Leads from "./Leads";
import Profile from "./Profile";
import NotificationBell from "./NotificationBell";
import { authClient } from "../../lib/auth-client";

const DashboardLayout = () => {
  const [activeTab, setActiveTab] = useState("call-logs");
  const [copied, setCopied] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { data: sessionData, isPending } = authClient.useSession();
  const user = sessionData?.user;

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
    if (activeTab === "leads") {
      return <Leads />;
    }
    if (activeTab === "profile") {
      return <Profile />;
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
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 absolute md:relative w-64 z-50 bg-[#000000] h-full shrink-0`}
      >
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="md:hidden absolute top-6 right-4 text-[#ACABAA] hover:text-white"
        >
          <X size={24} />
        </button>

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
              onClick={() => {
                setActiveTab("call-logs");
                setIsSidebarOpen(false);
              }}
              className={`flex items-center gap-2.5 py-3 pl-3 rounded-l-sm tracking-wide cursor-pointer ${activeTab === "call-logs" ? "bg-[#131313] text-[#6BDC9F] font-semibold" : "text-[#ACABAA]"}`}
            >
              <Phone
                fill={activeTab === "call-logs" ? "#6BDC9F" : ""}
                strokeWidth={activeTab === "call-logs" ? "0.5" : "1.5"}
              />
              Call Registry
            </li>
            <li
              onClick={() => {
                setActiveTab("agent-configuration");
                setIsSidebarOpen(false);
              }}
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
              onClick={() => {
                setActiveTab("wallet-billing");
                setIsSidebarOpen(false);
              }}
              className={`flex items-center gap-2.5 py-3 pl-3 rounded-l-sm tracking-wide hover:bg-[#131313] transition-colors cursor-pointer ${activeTab === "wallet-billing" ? "bg-[#131313] text-[#6BDC9F] font-semibold" : "text-[#ACABAA]"}`}
            >
              <Wallet
                fill={activeTab === "wallet-billing" ? "#6BDC9F" : ""}
                strokeWidth={activeTab === "wallet-billing" ? "0.5" : "1.5"}
              />
              Wallet & Billing
            </li>
            <li
              onClick={() => {
                setActiveTab("leads");
                setIsSidebarOpen(false);
              }}
              className={`flex items-center gap-2.5 py-3 pl-3 rounded-l-sm tracking-wide hover:bg-[#131313] transition-colors cursor-pointer ${activeTab === "leads" ? "bg-[#131313] text-[#6BDC9F] font-semibold" : "text-[#ACABAA]"}`}
            >
              <UserCircle2
                fill={activeTab === "leads" ? "#6BDC9F" : ""}
                strokeWidth={activeTab === "leads" ? "0.5" : "1.5"}
              />
              Lead Management
            </li>
          </ul>
          <div className="absolute bottom-6 left-4 right-4 flex flex-col gap-4">
            <button
              onClick={() => authClient.signOut()}
              className="text-[#E87A7A] bg-[#2a1b1b] border border-[#E87A7A]/20 hover:bg-[#E87A7A] hover:text-white transition-colors w-full py-2.5 rounded-sm font-inter font-bold tracking-widest text-[11px] uppercase text-center"
            >
              Logout
            </button>

            <div className="flex items-center gap-2">
              <div className="p-3 bg-[#252626] rounded-sm text-[#ACABAA] hover:text-white transition-colors cursor-pointer w-fit">
                <MessageCircleCheck size={22} />
              </div>
              <div className="flex flex-col cursor-pointer group">
                <p className="text-[#E5E2E1] text-sm font-semibold group-hover:text-white transition-colors">
                  Support
                </p>
                <p className="text-[#87948A] font-inter text-xs font-medium">
                  24/7 Available
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <div className="w-full bg-[#0E0E0E] p-4 lg:p-6 overflow-y-auto overflow-x-hidden">
        <nav className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex flex-wrap items-center justify-between gap-4 sm:gap-6 w-full md:w-auto">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="md:hidden text-[#ACABAA] hover:text-white shrink-0"
              >
                <Menu size={26} />
              </button>
              {isPending ? (
                <div className="h-7 w-32 bg-[#262626] animate-pulse rounded-sm shrink-0"></div>
              ) : (
                <p className="font-manrope text-[#E5E2E1] text-[20px] sm:text-[22px] font-bold shrink-0">
                  {user?.name || "Your Workspace"}
                </p>
              )}
            </div>

            <div className="font-inter text-white font-semibold text-[11px] sm:text-sm bg-[#252626] border border-[#4848481A] px-3 py-2 flex items-center rounded-sm w-fit shrink-0">
              <span className="text-[#ACABAA] font-manrope font-normal hidden sm:inline">
                AGENT NUMBER:
              </span>
              {"  "}
              <p className="ml-2.5">+2348031234567</p>
              <button
                onClick={handleCopy}
                className={`ml-3 transition-all duration-200 ${
                  copied
                    ? "text-[#008F5A] bg-green-900/20"
                    : "text-gray-400 hover:text-white hover:bg-gray-800"
                }`}
              >
                {copied ? <Check size={20} /> : <Copy size={20} />}
              </button>
            </div>

            {/* Mobile Nav Icons & Balance */}
            <div className="w-full md:hidden flex justify-between items-center mt-2 border-t border-[#262626] pt-4">
              <div className="flex items-center gap-4 shrink-0">
                <NotificationBell />
                <div
                  className={`${activeTab === "profile" ? "text-[#6BDC9F]" : "text-[#ACABAA]"} hover:text-white cursor-pointer transition-colors mb-1`}
                  onClick={() => setActiveTab("profile")}
                >
                  <UserCircle2 size={24} className="sm:w-7 sm:h-7" />
                </div>
              </div>
              <div className="font-inter text-right shrink-0">
                <p className="text-[#ACABAA] text-[10px] tracking-wide">
                  AVAILABLE BALANCE
                </p>
                <p className="text-[#6BDC9F] font-semibold text-sm">₦12,500</p>
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6 shrink-0">
            <div className="font-inter text-right">
              <p className="text-[#ACABAA] text-[10px] sm:text-sm tracking-wide">
                AVAILABLE BALANCE
              </p>
              <p className="text-[#6BDC9F] font-semibold text-sm sm:text-base">
                ₦12,500
              </p>
            </div>

            <div className="flex items-center gap-4">
              <NotificationBell />

              <div
                onClick={() => setActiveTab("profile")}
                className={`${activeTab === "profile" ? "text-[#6BDC9F]" : "text-[#ACABAA]"} hover:text-white cursor-pointer transition-colors`}
              >
                <UserCircle2 size={24} className="sm:w-7 sm:h-7" />
              </div>
            </div>
          </div>
        </nav>
        <div className="mt-8">{handleTabShow()}</div>
      </div>
    </div>
  );
};
export default DashboardLayout;
