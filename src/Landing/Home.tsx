import { useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  Bot,
  ClipboardList,
  MessageSquareText,
  MessagesSquare,
  Phone,
  Rocket,
  SquareArrowOutDownLeftIcon,
  Timer,
  UserCheck,
} from "lucide-react";
import logo from "/images/BusierDesk_logo.png";
import { Link } from "react-router-dom";
const Home = () => {
  const [callDuration, setCallDuration] = useState(1);

  return (
    <main className="min-h-screen bg-[#131313]">
      <nav className="flex justify-between items-center px-6 md:px-10 py-4 border-b border-[#171919] bg-[#131313B2]">
        <div className="flex items-center gap-2">
          <div>
            <img src={logo} alt="busier desk logo" width={50} />
          </div>
          <h2 className="font-manrope text-[#008F5A] font-bold text-xl">
            BusierDesk
          </h2>
        </div>

        <ul className="hidden md:flex items-center gap-10 text-[#E5E2E1]">
          <li className="text-[#6BDC9F] font-semibold">Product</li>
          <li>Pricing</li>
          <li>Login</li>
          <Link
            to="/authentication"
            className="bg-[#008F5A] px-7 py-2 font-semibold rounded-sm text-[#00311C] nav-btn-gradient"
          >
            Get Started
          </Link>
        </ul>
      </nav>

      <section className="flex flex-col xl:flex-row items-center px-6 md:px-16 justify-between h-auto xl:h-[calc(100vh-5rem)] py-16 xl:py-0 gap-16 xl:gap-0">
        <div className="space-y-6 w-full xl:w-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold font-manrope text-[#E5E2E1] w-full xl:w-md">
            Never Miss a Customer.
            <span className="text-[#6BDC9F] block">Never Overpay.</span>
          </h1>

          <p className="text-[#BDCABF] w-full xl:w-125 text-lg md:text-xl">
            The world's first AI voice-to-text handoff. Save your balances with
            intelligent call capping and instant WhatsApp transitions.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 font-inter">
            <Link
              to="/authentication"
              className="bg-[#008F5A] w-full sm:w-auto justify-center px-7 py-3.5 font-semibold rounded-sm text-[#00311C] nav-btn-gradient flex items-center gap-2"
            >
              Deploy Your Agent <ArrowRight size={20} />
            </Link>

            <button className="w-full sm:w-auto px-9 py-3.5 font-semibold rounded-sm border border-[#87948A]/20 text-[#6BDC9F]">
              View Demo
            </button>
          </div>
        </div>

        <div className="w-full sm:w-135 border border-[#3E4A414D] bg-[#141313B2] backdrop-blur-2xl rounded-md p-4 sm:p-5">
          <div className="border border-[#6BDC9F33] bg-[#0E0E0E] p-4 flex items-center justify-between rounded-sm">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl w-fit text-[#00311C] call-icon-gradient">
                <Phone />
              </div>
              <div>
                <p className="font-inter text-[#6BDC9F] tracking-wider font-light">
                  ACTIVE CALL
                </p>
                <p className="font-manrope text-[#E5E2E1]">Inbound Customer</p>
              </div>
            </div>

            <p className="text-[#6BDC9F]">00:45 / 01:00</p>
          </div>

          <div className="text-[#87948A] w-fit mx-auto my-10">
            <ArrowDown />
          </div>

          <div className="bg-[#0E0E0E] p-5 pb-4 rounded-lg flex flex-col justify-between">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquareText className="text-[#25D366]" size={20} />
              <span className="text-[#87948A] font-medium text-[15px]">
                WhatsApp Business
              </span>
            </div>

            <div className="bg-[#201F1F] p-4 rounded-sm">
              <p className="text-[#E5E2E1] font-manrope text-[15px] leading-relaxed">
                "Your call has been reached the time limit. I've sent the
                details of your inquiry to our team via this chat..."
              </p>
            </div>

            <div className="flex justify-end mt-3">
              <span className="text-[#647168] text-xs font-inter">
                14:02 Delivered
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#0E0E0E] w-full py-16 md:py-20 px-6 md:px-16">
        <div className="mb-10 md:mb-20">
          <p className="text-[#E5E2E1] font-manrope text-2xl md:text-3xl font-bold">
            THE SMART HANDOFF
          </p>
          <div className="bg-[#6BDC9F] h-1 w-27 mt-1.5"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[#2A2A2A] border border-[#3E4A4133] w-fit rounded-sm">
                <UserCheck className="text-[#6BDC9F]" size={22} />
              </div>
              <p className="font-inter text-xs text-[#87948A]">STEP 01</p>
            </div>

            <p className="font-manrope text-[#E5E2E1] text-xl">
              Instant Answer
            </p>

            <div>
              <p className="font-inter text-[#87948A]">
                AI agent picks up instantly with zero latency, greeting
                customers with your custom brand persona.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[#2A2A2A] border border-[#3E4A4133] w-fit rounded-sm">
                <Timer className="text-[#6BDC9F]" size={22} />
              </div>
              <p className="font-inter text-xs text-[#87948A]">STEP 02</p>
            </div>

            <p className="font-manrope text-[#E5E2E1] text-xl">Smart Cap</p>

            <div>
              <p className="font-inter text-[#87948A]">
                Protect your wallet. Set hard limits on call duration. Our AI
                summarizes and closes the loop before the cap hits.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[#2A2A2A] border border-[#3E4A4133] w-fit rounded-sm">
                <MessagesSquare className="text-[#6BDC9F]" size={22} />
              </div>
              <p className="font-inter text-xs text-[#87948A]">STEP 03</p>
            </div>

            <p className="font-manrope text-[#E5E2E1] text-xl">
              Whatsapp Handoff
            </p>

            <div>
              <p className="font-inter text-[#87948A]">
                Automatically continues complex conversations on WhatsApp,
                reducing voice costs by up to 80% per lead.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 px-6 md:px-16">
        <div className="text-center mb-10 md:mb-15">
          <h2 className="font-manrope text-[#E5E2E1] text-2xl md:text-3xl font-bold">
            Build Your Agent
          </h2>
          <p className="font-inter text-[#87948A] text-base md:text-lg mt-1">
            Pay only for the hardware and brains you actually use.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-7 gap-10">
          <div className="col-span-1 lg:col-span-4 bg-[#2A2A2A] border border-[#3E4A4133] p-5 md:p-6 rounded-sm h-fit">
            <div className="flex items-center justify-between">
              <div>
                <span className="bg-[#2CA46D33] text-[#6BDC9F] text-xs font-inter font-semibold px-2.5 py-1.5 rounded-xs mb-1 block w-fit">
                  REQUIRED
                </span>
                <p className="font-manrope text-xl text-[#E5E2E1] font-bold">
                  Inbound Calls (Base)
                </p>
              </div>

              <div className="text-right">
                <p className="text-[#6BDC9F] text-xl font-semibold font-inter">
                  $0.15
                </p>
                <p className="text-[#87948A] text-sm font-inter">Per Minute</p>
              </div>
            </div>

            <div className="flex items-center justify-between mt-8">
              <p className="text-[#E5E2E1] font-semibold font-inter text-xs sm:text-sm">
                SET MAX CALL DURATION
              </p>
              <p className="text-[#6BDC9F] font-inter text-sm">
                {callDuration}:00 Minute{callDuration !== 1 ? "s" : ""}
              </p>
            </div>

            <div className="mt-5 w-full relative flex items-center">
              <input
                type="range"
                min="1"
                max="5"
                step="1"
                value={callDuration}
                onChange={(e) => setCallDuration(parseInt(e.target.value))}
                style={
                  {
                    "--val": `${((callDuration - 1) / 4) * 100}%`,
                  } as React.CSSProperties
                }
                className="w-full appearance-none bg-transparent [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:h-1 [&::-webkit-slider-runnable-track]:bg-[linear-gradient(to_right,#6BDC9F_var(--val),#0E0E0E_var(--val))] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#6BDC9F] [&::-webkit-slider-thumb]:-mt-1.25 cursor-pointer"
              />
            </div>
            <div className="flex items-center justify-between mt-2">
              <p className="text-[#87948A] font-inter text-[10px]">
                SHORT LEAD GEN
              </p>
              <p className="text-[#87948A] font-inter text-[10px]">
                DEEP SUPPORT
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 font-inter gap-3 mt-5">
              <div className="bg-[#0E0E0E] border border-[#3E4A411A] p-5 rounded-sm">
                <p className="text-[#87948A] font-inter text-[10px]">
                  ESTIMATED SAVINGS
                </p>
                <p className="text-[#6BDC9F] font-semibold mt-1">~ $420/mo</p>
              </div>
              <div className="bg-[#0E0E0E] border border-[#3E4A411A] p-5 rounded-sm">
                <p className="text-[#87948A] font-inter text-[10px]">
                  LEAD CAPTURE RATE
                </p>
                <p className="text-[#6BDC9F] font-semibold mt-1">99.8%</p>
              </div>
            </div>
          </div>

          <div className="col-span-1 lg:col-span-3 flex flex-col gap-4">
            <div className="bg-[#201F1F] border border-[#3E4A411A] p-6 rounded-sm flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="text-[#87948A]">
                  <Bot size={30} />
                </div>

                <div>
                  <p className="text-sm font-semibold text-[#E5E2E1] font-inter">
                    AI Assistant Brain
                  </p>
                  <p className="text-[#87948A] text-xs">
                    Llama-3 Customs RAG Training
                  </p>
                </div>
              </div>

              <button className="bg-[#6BDC9F33] p-1 rounded-full w-12">
                <div className="size-4 rounded-full nav-btn-gradient translate-x-6"></div>
              </button>
            </div>

            <div className="bg-[#201F1F] border border-[#3E4A411A] p-6 rounded-sm flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="text-[#87948A]">
                  <ClipboardList size={30} />
                </div>

                <div>
                  <p className="text-sm font-semibold text-[#E5E2E1] font-inter">
                    Call Transcription
                  </p>
                  <p className="text-[#87948A] text-xs">
                    Real-time test logging
                  </p>
                </div>
              </div>

              <button className="bg-[#353534] p-1 rounded-full w-12">
                <div className="size-4 rounded-full bg-[#87948A]"></div>
              </button>
            </div>

            <div className="bg-[#201F1F] border border-[#3E4A411A] p-6 rounded-sm flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="text-[#87948A]">
                  <SquareArrowOutDownLeftIcon size={30} />
                </div>

                <div>
                  <p className="text-sm font-semibold text-[#E5E2E1] font-inter">
                    Whatsapp Chat Handoff
                  </p>
                  <p className="text-[#87948A] text-xs">
                    Automated CRM linking
                  </p>
                </div>
              </div>

              <button className="bg-[#6BDC9F33] p-1 rounded-full w-12">
                <div className="size-4 rounded-full nav-btn-gradient translate-x-6"></div>
              </button>
            </div>

            <button className="nav-btn-gradient text-[#00311C] font-semibold font-inter w-full py-3 text-sm">
              CALCULATE FINAL QUOTE
            </button>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 px-6 md:px-16 h-auto min-h-[60vh] flex items-center">
        <div className="w-full md:w-3xl mx-auto bg-[#141313B2] border border-[#6BDC9F1A] backdrop-blur-md p-6 md:p-10 rounded-sm text-center space-y-5 md:space-y-7 my-10 md:my-0">
          <p className="font-manrope text-[#E5E2E1] text-3xl md:text-4xl font-bold leading-tight">
            Stop burning your voice minutes.
          </p>
          <p className="font-inter text-[#87948A] text-sm md:text-[16px]">
            Start your smart handoff journey today. Integration takes less than
            5 minutes.
          </p>

          <button className="nav-btn-gradient text-[#00311C] mt-8 md:mt-10 font-semibold font-inter rounded-sm w-full sm:w-fit px-8 py-4 mx-auto text-sm flex items-center justify-center gap-2">
            Launch Dashboard <Rocket size={20} />
          </button>
        </div>
      </section>

      <footer className="bg-[#0E0E0E] p-6 md:px-10 flex flex-col md:flex-row items-center md:items-end justify-between gap-6 md:gap-0">
        <div className="text-center md:text-left">
          <div className="flex items-center gap-2">
            <div>
              <img src={logo} alt="busier desk logo" width={50} />
            </div>
            <h2 className="font-manrope text-[#008F5A] font-bold text-xl">
              BusierDesk
            </h2>
          </div>
          <p className="text-[#87948A] text-xs font-inter mt-2 max-w-70 md:max-w-none mx-auto lg:mx-0">
            @ {new Date().getFullYear()} BUSIERDESK. SECURE WALLET PROVIDED BY
            INTERSWITCH
          </p>
        </div>

        <ul className="flex flex-wrap justify-center items-center gap-4 md:gap-5 text-[#87948A] text-xs sm:text-sm mt-4 md:mt-0">
          <li>PRIVACY POLICY</li>
          <li>TERMS OF SERVICES</li>
          <li>SECURITY</li>
        </ul>
      </footer>
    </main>
  );
};
export default Home;
