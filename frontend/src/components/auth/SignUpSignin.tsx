import { Helmet } from "react-helmet-async";
import logo from "/images/BusierDesk_logo.png";
import nigerianman from "/images/nigerianman.jpg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authClient } from "../../lib/auth-client";

const SignUpSignin = () => {
  const [isScreen, setIsScreen] = useState("signin");
  const navigate = useNavigate();

  // --- Sign In State ---
  const [signInData, setSignInData] = useState({ email: "", password: "" });
  const [signInError, setSignInError] = useState("");
  const [signInLoading, setSignInLoading] = useState(false);

  // --- Sign Up State ---
  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [signUpError, setSignUpError] = useState("");
  const [signUpLoading, setSignUpLoading] = useState(false);

  // --- Handlers ---
  const handleSignIn = async (e) => {
    e.preventDefault();
    setSignInError("");
    setSignInLoading(true);

    const { data, error } = await authClient.signIn.email({
      email: signInData.email,
      password: signInData.password,
    });

    setSignInLoading(false);

    if (error) {
      setSignInError(error.message || "Sign in failed. Please try again.");
      return;
    }

    navigate("/dashboard");
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setSignUpError("");
    setSignUpLoading(true);

    const { data, error } = await authClient.signUp.email({
      name: signUpData.name,
      email: signUpData.email,
      password: signUpData.password,
    });

    setSignUpLoading(false);

    if (error) {
      setSignUpError(error.message || "Sign up failed. Please try again.");
      return;
    }

    navigate("/dashboard");
  };

  return (
    <section className="w-full min-h-screen lg:h-screen flex flex-col lg:flex-row">
      <Helmet>
        <title>
          {`${isScreen === "signin" ? "Sign in" : "Create Account"} - BusierDesk`}
        </title>
      </Helmet>

      {/* Left Panel */}
      <div className="hidden lg:flex w-1/2 bg-[#0A0A0A] h-full items-center justify-center">
        <div className="w-full max-w-md px-6">
          <div className="flex items-center gap-2 w-fit mx-auto">
            <img src={logo} alt="busier desk logo" width={65} />
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

      {/* Right Panel */}
      <div className="w-full lg:w-1/2 bg-[#0E0E0E] min-h-screen lg:h-full flex items-center justify-center flex-col relative px-4 sm:px-0">
        <div className="w-full sm:w-112.5 mx-auto bg-[#201F1FB2] p-6 sm:p-8 rounded-md backdrop-blur-xl border border-[#3E4A4126]">

          {/* Mobile Logo */}
          <div className="flex lg:hidden items-center justify-center gap-2 w-fit mx-auto mb-6">
            <img src={logo} alt="busier desk logo" width={45} />
            <h2 className="font-manrope text-[#6BDC9F] font-bold text-2xl">
              BusierDesk
            </h2>
          </div>

          {/* Tab Toggle */}
          <div className="flex items-center gap-2 bg-[#0E0E0E] p-1 rounded-sm">
            <button
              type="button"
              className={`${isScreen === "signin" ? "bg-[#353534] text-[#6BDC9F]" : "text-[#BDCABF]"} font-manrope font-semibold text-sm w-1/2 rounded-md py-2 transition-all duration-300 ease-in-out`}
              onClick={() => {
                setIsScreen("signin");
                setSignInError("");
              }}
            >
              Sign in
            </button>
            <button
              type="button"
              className={`${isScreen === "signup" ? "bg-[#353534] text-[#6BDC9F]" : "text-[#BDCABF]"} font-manrope font-semibold text-sm w-1/2 rounded-md py-2 transition-all duration-300 ease-in-out`}
              onClick={() => {
                setIsScreen("signup");
                setSignUpError("");
              }}
            >
              Create Account
            </button>
          </div>

          {/* Sign In Form */}
          {isScreen === "signin" && (
            <form
              onSubmit={handleSignIn}
              className="font-inter mt-6 flex flex-col gap-4"
            >
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="signin-email"
                  className="text-[#BDCABF] text-sm tracking-wide"
                >
                  EMAIL ADDRESS
                </label>
                <input
                  id="signin-email"
                  type="email"
                  required
                  value={signInData.email}
                  onChange={(e) =>
                    setSignInData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  className="bg-[#0E0E0E] placeholder:text-[#454747] py-3.5 pl-3.5 rounded-sm text-white outline-none focus:ring-1 focus:ring-[#6BDC9F]"
                  placeholder="johndoe@example.com"
                />
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="signin-password"
                    className="text-[#BDCABF] text-sm tracking-wide"
                  >
                    PASSWORD
                  </label>
                  <button
                    type="button"
                    className="text-[#6BDC9F] text-xs"
                    onClick={() => {/* hook up forgot password later */}}
                  >
                    FORGOT PASSWORD?
                  </button>
                </div>
                <input
                  id="signin-password"
                  type="password"
                  required
                  value={signInData.password}
                  onChange={(e) =>
                    setSignInData((prev) => ({ ...prev, password: e.target.value }))
                  }
                  className="bg-[#0E0E0E] placeholder:text-[#454747] py-3.5 pl-3.5 rounded-sm text-white outline-none focus:ring-1 focus:ring-[#6BDC9F]"
                  placeholder="••••••••••••••"
                />
              </div>

              {signInError && (
                <p className="text-red-400 text-xs text-center -mt-1">
                  {signInError}
                </p>
              )}

              <button
                type="submit"
                disabled={signInLoading}
                className="nav-btn-gradient mt-2 text-[#00311C] tracking-wider font-manrope font-semibold text-sm w-full py-3.5 rounded-sm disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {signInLoading ? "SIGNING IN..." : "CONTINUE TO DASHBOARD"}
              </button>
            </form>
          )}

          {/* Sign Up Form */}
          {isScreen === "signup" && (
            <form
              onSubmit={handleSignUp}
              className="font-inter mt-6 flex flex-col gap-4"
            >
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="signup-name"
                  className="text-[#BDCABF] text-sm tracking-wide"
                >
                  BUSINESS NAME
                </label>
                <input
                  id="signup-name"
                  type="text"
                  required
                  value={signUpData.name}
                  onChange={(e) =>
                    setSignUpData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="bg-[#0E0E0E] placeholder:text-[#454747] py-3.5 pl-3.5 rounded-sm text-white outline-none focus:ring-1 focus:ring-[#6BDC9F]"
                  placeholder="e.g Above Enterprise"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label
                  htmlFor="signup-email"
                  className="text-[#BDCABF] text-sm tracking-wide"
                >
                  EMAIL ADDRESS
                </label>
                <input
                  id="signup-email"
                  type="email"
                  required
                  value={signUpData.email}
                  onChange={(e) =>
                    setSignUpData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  className="bg-[#0E0E0E] placeholder:text-[#454747] py-3.5 pl-3.5 rounded-sm text-white outline-none focus:ring-1 focus:ring-[#6BDC9F]"
                  placeholder="johndoe@example.com"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label
                  htmlFor="signup-password"
                  className="text-[#BDCABF] text-sm tracking-wide"
                >
                  PASSWORD
                </label>
                <input
                  id="signup-password"
                  type="password"
                  required
                  minLength={8}
                  value={signUpData.password}
                  onChange={(e) =>
                    setSignUpData((prev) => ({ ...prev, password: e.target.value }))
                  }
                  className="bg-[#0E0E0E] placeholder:text-[#454747] py-3.5 pl-3.5 rounded-sm text-white outline-none focus:ring-1 focus:ring-[#6BDC9F]"
                  placeholder="••••••••••••••"
                />
              </div>

              {signUpError && (
                <p className="text-red-400 text-xs text-center -mt-1">
                  {signUpError}
                </p>
              )}

              <button
                type="submit"
                disabled={signUpLoading}
                className="nav-btn-gradient mt-2 text-[#00311C] tracking-wider font-manrope font-semibold text-sm w-full py-3.5 rounded-sm disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {signUpLoading ? "CREATING ACCOUNT..." : "CONTINUE TO DASHBOARD"}
              </button>
            </form>
          )}
        </div>

        {/* Footer */}
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