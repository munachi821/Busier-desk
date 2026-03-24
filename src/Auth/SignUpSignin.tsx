import logo from "/images/BusierDesk_logo.png";
import nigerianman from "/images/nigerianman.jpg";

const SignUpSignin = () => {
  return (
    <section className="w-full h-screen">
      <div className="w-1/2 bg-[#0A0A0A] h-full flex items-center justify-center">
        <div className="w-md">
          <div className="flex items-center gap-2 w-fit mx-auto">
            <div>
              <img src={logo} alt="busier desk logo" width={65} />
            </div>
            <h2 className="font-manrope text-[#6BDC9F] font-bold text-3xl">
              BusierDesk
            </h2>
          </div>

          <div className="bg-[#0E0E0E80] mt-8 p-6 border-l-2 border-[#6BDC9F4D]">
            <p className="text-[#E5E2E1] font-manrope text-xl font-medium text-center">
              "BusierDesk saved us 20 hours a week and caught 50+ missed leads
              in our first month."
            </p>

            <div className="flex items-center gap-2 mt-8">
              <div className="size-10 rounded-md overflow-hidden">
                <img
                  src={nigerianman}
                  alt="placeholder img"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="font-inter leading-3">
                <p className="text-sm text-[#6BDC9F] font-semibold">
                  Emeka Okonkwo
                </p>
                <p className="text-[#BDCABF] uppercase text-sm">
                  CEO, KwikFix Auto
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/2"></div>
    </section>
  );
};
export default SignUpSignin;
