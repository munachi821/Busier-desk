import { CloudUpload } from "lucide-react";
import { useState } from "react";

const AgentConfiguration = () => {
  const [duration, setDuration] = useState(2);
  const [toggles, setToggles] = useState({
    aiBrain: true,
    transcription: true,
    whatsapp: true,
  });
  const [faqs, setFaqs] = useState(
    `Our shop specializes in European luxury vehicles. Standard oil changes start at ₦25,000 using synthetic blends. Engine diagnostics are billed at ₦12,000 flat rate.

We are open Monday to Saturday, 8:00 AM to 6:00 PM. All repairs come with a 6-month warranty on labor. For walk-ins, we prioritize emergency repairs but recommend booking via the dashboard for scheduled maintenance.

Frequently Asked Questions:
Q: Do you offer towing?
A: Yes, within a 15km radius of the workshop.
Q: How long does a brake check take?
A: Usually 30-45 minutes while you wait in our lounge.
Q: Do you use OEM parts?
A: We prioritize OEM parts but offer high-quality aftermarket alternatives for budget optimization.`,
  );

  const totalRate =
    50 + (toggles.aiBrain ? 20 : 0) + (toggles.transcription ? 5 : 0);
  const totalFlat = toggles.whatsapp ? 10 : 0;

  const handleToggle = (key: keyof typeof toggles) => {
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="p-6 pt-8">
      <h2 className="font-manrope font-bold text-3xl md:text-4xl text-[#E7E5E5] mb-10">
        Agent Configuration
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-7 gap-10">
        <div className="col-span-1 lg:col-span-3">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-4 h-0.5 bg-[#6BDC9F]"></div>
            <p className="text-[#87948A] text-[11px] font-semibold tracking-widest font-inter uppercase">
              Pricing & Modular Controls
            </p>
          </div>

          <div className="border border-[#008F5A] bg-black p-5 rounded-sm mb-6">
            <p className="text-[#87948A] text-[10px] font-inter font-semibold tracking-widest mb-3 uppercase">
              Active Rate
            </p>
            <div className="flex items-baseline gap-1 text-[#008F5A] font-manrope font-extrabold">
              <span className="text-2xl tracking-wide">
                ₦{totalRate * duration}{" "}
                <span className="text-sm font-semibold tracking-normal">
                  / min
                </span>
              </span>
              <span className="text-[#4F5B54] text-xl mx-2">+</span>
              <span className="text-2xl tracking-wide">
                ₦{totalFlat}{" "}
                <span className="text-sm font-semibold tracking-normal">
                  flat
                </span>
              </span>
              <span className="text-[#ACABAA] text-[11px] font-manrope font-normal tracking-wide ml-1">
                per WhatsApp handoff
              </span>
            </div>
          </div>

          <div className="bg-black border border-[#262626] p-6 lg:p-8 rounded-sm space-y-8">
            <div>
              <div className="flex justify-between items-center mb-4">
                <p className="font-inter text-[#E7E5E5] text-sm font-semibold tracking-wide">
                  Max Call Duration
                </p>
                <p className="font-manrope text-[#6BDC9F] font-bold text-lg">
                  {duration} Mins
                </p>
              </div>
              <div className="relative w-full flex items-center">
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={duration}
                  onChange={(e) => setDuration(parseInt(e.target.value))}
                  style={
                    {
                      "--val": `${((duration - 1) / 9) * 100}%`,
                    } as React.CSSProperties
                  }
                  className="w-full appearance-none bg-transparent [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:h-1 [&::-webkit-slider-runnable-track]:bg-[linear-gradient(to_right,#6BDC9F_var(--val),#262626_var(--val))] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-sm [&::-webkit-slider-thumb]:bg-[#6BDC9F] [&::-webkit-slider-thumb]:-mt-1.5 cursor-pointer"
                />
              </div>
              <div className="flex justify-between text-[#87948A] text-[10px] font-inter mt-3 font-semibold">
                <span>1m</span>
                <span>10m</span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <p className="font-manrope text-[#E7E5E5] text-sm font-medium tracking-wide">
                  Inbound Voice Connection
                </p>
                <p className="font-inter text-[#008F5A] text-xs font-semibold tracking-wide mt-1.5">
                  ₦50 / min
                </p>
              </div>
              <div className="w-10 h-5 border border-[#6BDC9F]/50 bg-[#0A1A12] rounded-sm p-0.5 flex justify-end opacity-70 cursor-not-allowed">
                <div className="w-3.5 h-full bg-[#6BDC9F]/70 rounded-xs"></div>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <p className="font-manrope text-[#E7E5E5] text-sm font-medium tracking-wide">
                  AI Assistant Brain
                </p>
                <p className="font-inter text-[#008F5A] text-xs font-semibold tracking-wide mt-1.5">
                  + ₦20 / min
                </p>
              </div>
              <div
                onClick={() => handleToggle("aiBrain")}
                className={`w-10 h-5 border rounded-sm p-0.5 flex cursor-pointer transition-colors ${
                  toggles.aiBrain
                    ? "border-[#6BDC9F] bg-[#0A1A12] justify-end"
                    : "border-[#3E4A41] bg-black justify-start"
                }`}
              >
                <div
                  className={`w-3.5 h-full rounded-xs transition-all ${toggles.aiBrain ? "bg-[#6BDC9F]" : "bg-[#3E4A41]"}`}
                ></div>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <p className="font-manrope text-[#E7E5E5] text-sm font-medium tracking-wide">
                  Call Transcription
                </p>
                <p className="font-inter text-[#008F5A] text-xs font-semibold tracking-wide mt-1.5">
                  + ₦5 / min
                </p>
              </div>
              <div
                onClick={() => handleToggle("transcription")}
                className={`w-10 h-5 border rounded-sm p-0.5 flex cursor-pointer transition-colors ${
                  toggles.transcription
                    ? "border-[#6BDC9F] bg-[#0A1A12] justify-end"
                    : "border-[#3E4A41] bg-black justify-start"
                }`}
              >
                <div
                  className={`w-3.5 h-full rounded-xs transition-all ${toggles.transcription ? "bg-[#6BDC9F]" : "bg-[#3E4A41]"}`}
                ></div>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <p className="font-manrope text-[#E7E5E5] text-sm font-medium tracking-wide">
                  WhatsApp Chat Handoff
                </p>
                <p className="font-inter text-[#008F5A] text-xs font-semibold tracking-wide mt-1.5">
                  Flat ₦10 / session
                </p>
              </div>
              <div
                onClick={() => handleToggle("whatsapp")}
                className={`w-10 h-5 border rounded-sm p-0.5 flex cursor-pointer transition-colors ${
                  toggles.whatsapp
                    ? "border-[#6BDC9F] bg-[#0A1A12] justify-end"
                    : "border-[#3E4A41] bg-black justify-start"
                }`}
              >
                <div
                  className={`w-3.5 h-full rounded-xs transition-all ${toggles.whatsapp ? "bg-[#6BDC9F]" : "bg-[#3E4A41]"}`}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-1 lg:col-span-4 lg:ml-6">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-4 h-0.5 bg-[#6BDC9F]"></div>
            <p className="text-[#87948A] text-[11px] font-semibold tracking-widest font-inter uppercase">
              Business Context & Training
            </p>
          </div>

          <div className="bg-black border border-[#262626] rounded-sm p-6 lg:p-10">
            <p className="text-[#E7E5E5] font-manrope font-bold text-[15px] mb-6 tracking-wide">
              Prices & FAQs
            </p>

            <div className="bg-[#1C1C1C] rounded-sm p-6 lg:p-8 border border-[#2A2A2A]">
              <textarea
                value={faqs}
                onChange={(e) => setFaqs(e.target.value)}
                className="w-full h-full min-h-100 bg-transparent text-[#ACABAA] font-inter text-sm leading-relaxed tracking-wide outline-none resize-y"
                placeholder="Enter your business context, prices, and FAQs here..."
              ></textarea>
            </div>

            <div className="text-right mt-5">
              <span className="text-[#87948A] text-[11px] font-inter tracking-wider">
                Last updated: 2 hours ago by System
              </span>
            </div>

            <div className="flex justify-end mt-12">
              <button className="bg-[#008F5A] px-8 py-3.5 font-inter font-bold text-[13px] tracking-widest rounded-sm text-white flex items-center gap-2 hover:bg-[#007046] transition-colors">
                <CloudUpload size={18} /> SAVE & DEPLOY AGENT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AgentConfiguration;
