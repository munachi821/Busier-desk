import { Bell, Search, UserCircle2 } from "lucide-react";

const CallLogs = () => {
  return (
    <div>
      <nav className="flex items-center justify-between">
        <div className="flex gap-6 items-center">
          <p className="font-manrope text-[#E5E2E1] text-2xl font-bold">
            Demo Auto Repair
          </p>

          <div className="text-[#6BDC9F] bg-[#00523133] flex items-center gap-2 font-manrope text-sm py-1 px-2 rounded-sm font-medium w-fit">
            <span className="size-2 rounded-xs bg-[#6BDC9F]"></span> ACTIVE
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex bg-[#1F2020] items-center gap-2">
            <Search className="text-white ml-2" size={20} />
            <input
              type="search"
              placeholder="Search Call Logs"
              className="w-50 py-2.5 bg-[#1F2020] text-[#ACABAA80] font-inter text-sm pl-1 outline-none"
            />
          </div>

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
    </div>
  );
};
export default CallLogs;
