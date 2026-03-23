import {
  ArrowDown,
  ArrowRight,
  MessageSquareText,
  MoveDownIcon,
  Phone,
} from "lucide-react";

const Home = () => {
  return (
    <main className="min-h-screen bg-[#131313]">
      <nav className="flex justify-between items-center px-10 py-4 border-b border-[#171919] bg-[#131313B2]">
        <div className="logo">
          <h2 className="font-manrope text-[#008F5A] font-bold text-xl">
            BusierDesk
          </h2>
        </div>

        <ul className="flex items-center gap-10 text-[#E5E2E1]">
          <li className="text-[#6BDC9F] font-semibold">Product</li>
          <li>Pricing</li>
          <li>Login</li>
          <button className="bg-[#008F5A] px-7 py-2 font-semibold rounded-sm text-[#00311C] nav-btn-gradient">
            Get Started
          </button>
        </ul>
      </nav>

      <section className="flex items-center px-20 justify-between h-[calc(100vh-5rem)]">
        <div className="space-y-6">
          <h1 className="text-6xl font-extrabold font-manrope text-[#E5E2E1] w-md">
            Never Miss a Customer.
            <span className="text-[#6BDC9F] block">Never Overpay.</span>
          </h1>

          <p className="text-[#BDCABF] w-125 text-xl">
            The world's first AI voice-to-text handoff. Save your balances with
            intelligent call capping and instant WhatsApp transitions.
          </p>

          <div className="flex items-center gap-5 font-inter">
            <button className="bg-[#008F5A] px-7 py-3.5 font-semibold rounded-sm text-[#00311C] nav-btn-gradient flex items-center gap-2">
              Deploy Your Agent <ArrowRight size={20} />
            </button>

            <button className="px-9 py-3.5 font-semibold rounded-sm border border-[#87948A]/20 text-[#6BDC9F]">
              View Demo
            </button>
          </div>
        </div>

        <div className="w-135 border border-[#3E4A414D] bg-[#141313B2] backdrop-blur-2xl rounded-md p-5">
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
    </main>
  );
};
export default Home;
