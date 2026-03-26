import { CloudUpload, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../lib/api";

const AgentConfiguration = () => {
  const queryClient = useQueryClient();
  const [vapiId, setVapiId] = useState("");
  const [faqs, setFaqs] = useState("");
  const [duration, setDuration] = useState(2);
  const [toggles, setToggles] = useState({
    aiBrain: true,
    transcription: true,
    whatsapp: true,
  });

  const { data: assistant, isLoading } = useQuery({
    queryKey: ["assistant"],
    queryFn: async () => {
      const res = await api.get("/assistant");
      return res.data;
    },
  });

  useEffect(() => {
    if (assistant) {
      setVapiId(assistant.vapiAssistantId || "");
      setFaqs(assistant.systemPrompt || "");
      // Other fields can be initialized here if added to DB
    }
  }, [assistant]);

  const saveMutation = useMutation({
    mutationFn: async (data: any) => {
      return api.post("/assistant", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assistant"] });
      alert("Configuration saved and deployed!");
    },
  });

  const handleSave = () => {
    saveMutation.mutate({
      name: assistant?.name || "My AI Assistant",
      systemPrompt: faqs,
      vapiAssistantId: vapiId,
      // Add other fields as needed
    });
  };

  const handleToggle = (key: keyof typeof toggles) => {
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        <Loader2 className="animate-spin mr-2" /> Loading Configuration...
      </div>
    );
  }

  const totalRate = 50 + (toggles.aiBrain ? 20 : 0) + (toggles.transcription ? 5 : 0);
  const totalFlat = toggles.whatsapp ? 10 : 0;

  return (
    <div className="p-6 pt-8">
      <Helmet>
        <title>Agent Configuration</title>
      </Helmet>

      <h2 className="font-manrope font-bold text-3xl md:text-4xl text-[#E7E5E5] mb-10">
        Agent Configuration
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-7 gap-10">
        <div className="col-span-1 lg:col-span-3">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-4 h-0.5 bg-[#6BDC9F]"></div>
            <p className="text-[#87948A] text-[11px] font-semibold tracking-widest font-inter uppercase">
              Vapi.ai Integration
            </p>
          </div>

          <div className="bg-black border border-[#262626] p-6 rounded-sm mb-10">
            <p className="text-[#ACABAA] text-xs font-inter mb-3">Vapi Assistant ID</p>
            <input
              type="text"
              value={vapiId}
              onChange={(e) => setVapiId(e.target.value)}
              className="w-full bg-[#131313] border border-[#333] rounded-sm px-4 py-3 text-white font-inter text-sm outline-none focus:border-[#6BDC9F] transition-colors"
              placeholder="e.g. f0c43ee3-a7e5-4506-9fda-d42x..."
            />
            <p className="text-[#555] text-[10px] mt-2 font-inter">
              Get this from your Vapi Dashboard -&gt; Assistants
            </p>
          </div>

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
                <span className="text-sm font-semibold tracking-normal">/ min</span>
              </span>
              <span className="text-[#4F5B54] text-xl mx-2">+</span>
              <span className="text-2xl tracking-wide">
                ₦{totalFlat} <span className="text-sm font-semibold tracking-normal">flat</span>
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
                  className="w-full appearance-none bg-[#262626] h-1 rounded-full outline-none"
                />
              </div>
            </div>

            {/* Modular Toggles */}
            <div className="flex justify-between items-center">
              <div>
                <p className="font-manrope text-[#E7E5E5] text-sm font-medium tracking-wide">
                  AI Assistant Brain
                </p>
                <p className="font-inter text-[#008F5A] text-xs font-semibold tracking-wide mt-1.5">+ ₦20 / min</p>
              </div>
              <div
                onClick={() => handleToggle("aiBrain")}
                className={`w-10 h-5 border rounded-sm p-0.5 flex cursor-pointer transition-colors ${
                  toggles.aiBrain ? "border-[#6BDC9F] bg-[#0A1A12] justify-end" : "border-[#3E4A41] bg-black justify-start"
                }`}
              >
                <div className={`w-3.5 h-full rounded-xs transition-all ${toggles.aiBrain ? "bg-[#6BDC9F]" : "bg-[#3E4A41]"}`}></div>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <p className="font-manrope text-[#E7E5E5] text-sm font-medium tracking-wide">Call Transcription</p>
                <p className="font-inter text-[#008F5A] text-xs font-semibold tracking-wide mt-1.5">+ ₦5 / min</p>
              </div>
              <div
                onClick={() => handleToggle("transcription")}
                className={`w-10 h-5 border rounded-sm p-0.5 flex cursor-pointer transition-colors ${
                  toggles.transcription ? "border-[#6BDC9F] bg-[#0A1A12] justify-end" : "border-[#3E4A41] bg-black justify-start"
                }`}
              >
                <div className={`w-3.5 h-full rounded-xs transition-all ${toggles.transcription ? "bg-[#6BDC9F]" : "bg-[#3E4A41]"}`}></div>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <p className="font-manrope text-[#E7E5E5] text-sm font-medium tracking-wide">WhatsApp Chat Handoff</p>
                <p className="font-inter text-[#008F5A] text-xs font-semibold tracking-wide mt-1.5">Flat ₦10 / session</p>
              </div>
              <div
                onClick={() => handleToggle("whatsapp")}
                className={`w-10 h-5 border rounded-sm p-0.5 flex cursor-pointer transition-colors ${
                  toggles.whatsapp ? "border-[#6BDC9F] bg-[#0A1A12] justify-end" : "border-[#3E4A41] bg-black justify-start"
                }`}
              >
                <div className={`w-3.5 h-full rounded-xs transition-all ${toggles.whatsapp ? "bg-[#6BDC9F]" : "bg-[#3E4A41]"}`}></div>
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
              System Prompt & Base Knowledge
            </p>

            <div className="bg-[#1C1C1C] rounded-sm p-6 lg:p-8 border border-[#2A2A2A]">
              <textarea
                value={faqs}
                onChange={(e) => setFaqs(e.target.value)}
                className="w-full h-full min-h-[300px] bg-transparent text-[#ACABAA] font-inter text-sm leading-relaxed tracking-wide outline-none resize-y"
                placeholder="Enter your business context, prices, and FAQs here..."
              ></textarea>
            </div>

            <div className="text-right mt-5">
              <span className="text-[#87948A] text-[11px] font-inter tracking-wider">
                This prompt controls how the AI answers customer calls.
              </span>
            </div>

            <div className="flex justify-end mt-12">
              <button
                onClick={handleSave}
                disabled={saveMutation.isPending}
                className="bg-[#008F5A] px-8 py-3.5 font-inter font-bold text-[13px] tracking-widest rounded-sm text-white flex items-center gap-2 hover:bg-[#007046] transition-colors disabled:opacity-50"
              >
                {saveMutation.isPending ? <Loader2 className="animate-spin" size={18} /> : <CloudUpload size={18} />}
                SAVE & DEPLOY AGENT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AgentConfiguration;
