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

        <div>
          <div>
            <input
              type="search"
              placeholder="Search Call Logs"
              className="w-40 py-2 border border-white"
            />
          </div>
        </div>
      </nav>
    </div>
  );
};
export default CallLogs;
