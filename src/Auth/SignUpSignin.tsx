import { Helmet } from "react-helmet-async";
import logo from "/images/BusierDesk_logo.png";
import nigerianman from "/images/nigerianman.jpg";
import { useState } from "react";

const SignUpSignin = () => {
  const [isScreen, setIsScreen] = useState("signin");
  return (
    <section className="w-full min-h-screen lg:h-screen flex flex-col lg:flex-row">
      <Helmet>
        <title>
          {`${isScreen === "signin" ? "Sign in" : "Create Account"} - BusierDesk`}
        </title>
      </Helmet>

      <div className="hidden lg:flex w-1/2 bg-[#0A0A0A] h-full items-center justify-center">
        <div className="w-full max-w-md px-6">
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

      <div className="w-full lg:w-1/2 bg-[#0E0E0E] min-h-screen lg:h-full flex items-center justify-center flex-col relative px-4 sm:px-0">
        <div className="w-full sm:w-112.5 mx-auto bg-[#201F1FB2] p-6 sm:p-8 rounded-md backdrop-blur-xl border border-[#3E4A4126]">
          <div className="flex lg:hidden items-center justify-center gap-2 w-fit mx-auto mb-6">
            <div>
              <img src={logo} alt="busier desk logo" width={45} />
            </div>
            <h2 className="font-manrope text-[#6BDC9F] font-bold text-2xl">
              BusierDesk
            </h2>
          </div>

          <div className="flex items-center gap-2 bg-[#0E0E0E] p-1 rounded-sm">
            <button
              className={`${isScreen === "signin" ? "bg-[#353534] text-[#6BDC9F]" : "text-[#BDCABF]"} font-manrope font-semibold text-sm w-1/2 rounded-md py-2 transition-all duration-300 ease-in-out`}
              onClick={() => {
                setIsScreen("signin");
              }}
            >
              Sign in
            </button>
            <button
              className={`${isScreen === "signup" ? "bg-[#353534] text-[#6BDC9F]" : "text-[#BDCABF]"} font-manrope font-semibold text-sm w-1/2 rounded-md py-2 transition-all duration-300 ease-in-out`}
              onClick={() => {
                setIsScreen("signup");
              }}
            >
              Create Account
            </button>
          </div>

          <form
            action="#"
            className={`font-inter mt-6 ${isScreen === "signin" ? "flex" : "hidden"} flex-col gap-4`}
          >
            <div className="flex flex-col gap-1">
              <label
                htmlFor="email"
                className="text-[#BDCABF] text-sm tracking-wide"
              >
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                name="email"
                className="bg-[#0E0E0E] placeholder:text-[#454747] py-3.5 pl-3.5 rounded-sm"
                placeholder="johndoe@example.com"
              />
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-[#BDCABF] text-sm tracking-wide"
                >
                  PASSWORD
                </label>
                <p className="text-[#6BDC9F] text-xs">FORGOT PASSWORD?</p>
              </div>
              <input
                type="password"
                name="password"
                className="bg-[#0E0E0E] placeholder:text-[#454747] py-3.5 pl-3.5 rounded-sm"
                placeholder="••••••••••••••"
              />
            </div>

            <button className="nav-btn-gradient mt-2 text-[#00311C] tracking-wider font-manrope font-semibold text-sm w-full py-3.5 rounded-sm">
              CONTINUE TO DASHBOARD
            </button>
          </form>

          <form
            action="#"
            className={`font-inter mt-6 ${isScreen === "signup" ? "flex" : "hidden"} flex-col gap-4`}
          >
            <div className="flex flex-col gap-1">
              <label
                htmlFor="name"
                className="text-[#BDCABF] text-sm tracking-wide"
              >
                BUSSINESS NAME
              </label>
              <input
                type="text"
                name="name"
                className="bg-[#0E0E0E] placeholder:text-[#454747] py-3.5 pl-3.5 rounded-sm"
                placeholder="e.g Above Enterprise"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="email"
                className="text-[#BDCABF] text-sm tracking-wide"
              >
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                name="email"
                className="bg-[#0E0E0E] placeholder:text-[#454747] py-3.5 pl-3.5 rounded-sm"
                placeholder="johndoe@example.com"
              />
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-[#BDCABF] text-sm tracking-wide"
                >
                  PASSWORD
                </label>
                <p className="text-[#6BDC9F] text-xs">FORGOT PASSWORD?</p>
              </div>
              <input
                type="password"
                name="password"
                className="bg-[#0E0E0E] placeholder:text-[#454747] py-3.5 pl-3.5 rounded-sm"
                placeholder="••••••••••••••"
              />
            </div>

            <button className="nav-btn-gradient mt-2 text-[#00311C] tracking-wider font-manrope font-semibold text-sm w-full py-3.5 rounded-sm">
              CONTINUE TO DASHBOARD
            </button>
          </form>
        </div>

        <div className="text-[#71717A] text-[10px] sm:text-xs font-inter flex flex-col sm:flex-row items-center justify-between w-full px-6 sm:px-10 absolute bottom-5 left-0 gap-3 sm:gap-0">
          <p className="tracking-wider">© 2026 BUSIERDESK</p>

          <ul className="flex items-center gap-3 sm:gap-4">
            <li className="tracking-wider">PRIVACY</li>
            <li className="tracking-wider">TERMS</li>
            <li className="tracking-wider">SECURITY</li>
          </ul>
        </div>
      </div>
    </section>
  );
};
export default SignUpSignin;
