import { Bot, MessageCircleCheck, Phone, Wallet } from "lucide-react";
import logo from "/images/BusierDesk_logo.png";
const DashboardLayout = () => {
  return (
    <div className="h-screen w-full">
      <aside className="bg-[#000000] h-full w-60 relative">
        <div className="px-4 py-6">
          <div className="flex items-center gap-2">
            <div>
              <img src={logo} alt="busier desk logo" width={50} />
            </div>
            <h2 className="font-manrope text-[#6BDC9F] font-bold text-xl">
              BusierDesk
            </h2>
          </div>

          <p className="font-manrope text-[#ACABAA] mt-1 tracking-wider">
            ENTERPRISE <br /> DASHBOARD
          </p>
        </div>

        <div className="pl-4 font-manrope">
          <ul className="space-y-3">
            <li className="bg-[#131313] text-[#6BDC9F] flex items-center gap-2.5 py-3 pl-3 rounded-l-sm font-semibold tracking-wide">
              <Phone fill="#6BDC9F" strokeWidth={0.5} /> Call Logs
            </li>
            <li className="text-[#ACABAA] flex items-center gap-2.5 py-3 pl-3 rounded-l-sm tracking-wide">
              <Bot /> Agent Configuration
            </li>
            <li className="text-[#ACABAA] flex items-center gap-2.5 py-3 pl-3 rounded-l-sm tracking-wide">
              <Wallet /> Wallet & Billing
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
    </div>
  );
};
export default DashboardLayout;
