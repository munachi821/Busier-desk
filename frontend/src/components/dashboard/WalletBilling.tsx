import { useState } from "react";
import {
  Check,
  ShieldCheck,
  Zap,
  Crown,
  History,
  AlertCircle,
  Clock,
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import { api } from "../../lib/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Define the Tiers
const TIERS = [
  {
    id: "STARTER",
    name: "Starter",
    price: "₦10,000",
    description: "Perfect for solo entrepreneurs reaching local customers.",
    features: [
      "AI Voice Assistant (Standard)",
      "Live Call Registry",
      "Lead Management Dashboard",
      "Email Notifications",
      "Standard Knowledge Base",
    ],
    highlight: false,
    icon: Zap,
  },
  {
    id: "PRO",
    name: "Pro Business",
    price: "₦25,000",
    description: "Optimized for growing businesses with high call volume.",
    features: [
      "Everything in Starter",
      "WhatsApp Handoff & Auto-reply",
      "Custom System Prompts",
      "Advanced FAQ Training",
      "Priority Email Support",
    ],
    highlight: true,
    icon: ShieldCheck,
  },
  {
    id: "ENTERPRISE",
    name: "Enterprise",
    price: "₦50,000",
    description: "Scale your customer operations with multi-agent power.",
    features: [
      "Everything in Pro",
      "Multi-Agent Support (Coming Soon)",
      "Advanced Analytics API (Coming Soon)",
      "Role-Based Access Control (Soon)",
      "Dedicated account manager",
    ],
    highlight: false,
    icon: Crown,
  },
];

const WalletBilling = () => {
  const queryClient = useQueryClient();
  const [loadingTier, setLoadingTier] = useState<string | null>(null);

  // Fetch subscription status
  const { data: profile, isLoading } = useQuery({
    queryKey: ["assistant-profile"],
    queryFn: async () => {
      const res = await api.get("/assistant/profile");
      return res.data;
    },
  });

  // Mutation to initialize payment
  const initializePayment = useMutation({
    mutationFn: async (tier: string) => {
      const res = await api.post("/payment/initialize", { tier });
      return res.data;
    },
    onSuccess: (data) => {
      // Trigger Interswitch Inline Checkout
      const samplePaymentRequest = {
        merchantCode: data.merchantCode,
        payItemID: "Default_Pay_Item", // Or specific item ID if defined
        amount: data.amount,
        currency: "566", // NGN
        transactionReference: data.reference,
        siteRedirectURL: window.location.origin + "/dashboard/billing",
        onPaymentCompleted: async (response: any) => {
          console.log("Payment completed:", response);
          // Verify with backend
          await api.get(`/payment/verify/${data.reference}`);
          queryClient.invalidateQueries({ queryKey: ["assistant-profile"] });
          setLoadingTier(null);
        },
        onPaymentCancelled: () => {
          console.log("Payment cancelled");
          setLoadingTier(null);
        },
      };

      // @ts-ignore
      if (window.webpayCheckout) {
        // @ts-ignore
        window.webpayCheckout(samplePaymentRequest);
      } else {
        alert("Payment gateway loading... please try again in a moment.");
        setLoadingTier(null);
      }
    },
  });

  const handleSubscribe = (tier: string) => {
    setLoadingTier(tier);
    initializePayment.mutate(tier);
  };

  if (isLoading) return <div className="p-8 text-[#ACABAA]">Loading billing...</div>;

  const isSubscribed = profile?.isSubscribed;
  const currentTier = profile?.subscriptionTier;
  const expiryDate = profile?.subscriptionExpiresAt 
    ? new Date(profile.subscriptionExpiresAt).toLocaleDateString()
    : null;

  return (
    <div className="p-6 pt-8 pb-20">
      <Helmet>
        <title>Subscription Management | BusierDesk</title>
      </Helmet>

      <div className="mb-10">
        <h2 className="font-manrope font-bold text-3xl text-[#E7E5E5]">
          Subscription Management
        </h2>
        <p className="text-[#ACABAA] font-inter text-sm mt-2 max-w-2xl leading-relaxed">
          Choose a plan that fits your business scale. All plans include 24/7 AI availability 
          and automated call handling.
        </p>
      </div>

      {/* Status Bar */}
      <div className={`mb-12 p-6 border-l-4 ${isSubscribed ? "bg-[#1A2520] border-[#6BDC9F]" : "bg-[#2A1B1B] border-[#E87A7A]"} rounded-sm flex flex-col md:flex-row md:items-center justify-between gap-6`}>
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-full ${isSubscribed ? "bg-[#6BDC9F1A] text-[#6BDC9F]" : "bg-[#E87A7A1A] text-[#E87A7A]"}`}>
            {isSubscribed ? <ShieldCheck size={28} /> : <AlertCircle size={28} />}
          </div>
          <div>
            <h3 className="text-white font-manrope font-bold text-lg">
              {isSubscribed ? (
                <>Active Plan: <span className="text-[#6BDC9F]">{currentTier}</span></>
              ) : (
                "No Active Subscription"
              )}
            </h3>
            <p className="text-[#ACABAA] text-sm font-inter">
              {isSubscribed 
                ? `Your subscription is active and will renew on ${expiryDate}.` 
                : "Subscribe to a plan to start receiving and processing business calls."}
            </p>
          </div>
        </div>
        {isSubscribed && (
           <span className="flex items-center gap-2 text-xs font-semibold tracking-widest text-[#6BDC9F] uppercase bg-[#6BDC9F1A] px-4 py-2 rounded-full border border-[#6BDC9F33]">
             <Clock size={14} /> Active for {expiryDate}
           </span>
        )}
      </div>

      {/* Pricing Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl">
        {TIERS.map((tier) => (
          <div 
            key={tier.id}
            className={`relative p-8 rounded-sm transition-all duration-300 border ${
              tier.highlight 
                ? "bg-[#111111] border-[#6BDC9F] shadow-[0_0_30px_rgba(107,220,159,0.05)] scale-105 z-10" 
                : "bg-[#0D0D0D] border-[#262626] hover:border-[#404040]"
            }`}
          >
            {tier.highlight && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#6BDC9F] text-[#004A2D] px-4 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">
                Recommended
              </div>
            )}

            <div className="flex items-center gap-3 mb-6">
              <div className={`p-2 rounded-sm ${tier.highlight ? "text-[#6BDC9F]" : "text-[#ACABAA]"}`}>
                <tier.icon size={26} />
              </div>
              <h4 className="text-white font-manrope font-bold text-xl">{tier.name}</h4>
            </div>

            <div className="mb-6">
              <span className="text-white text-3xl font-manrope font-bold">{tier.price}</span>
              <span className="text-[#ACABAA] text-sm font-inter ml-1">/ Month</span>
            </div>

            <p className="text-[#ACABAA] text-sm font-inter mb-8 leading-relaxed h-12">
              {tier.description}
            </p>

            <ul className="space-y-4 mb-10 min-h-[220px]">
              {tier.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-sm font-inter">
                  <Check size={16} className={feature.includes("Coming Soon") ? "text-[#404040] mt-0.5 shrink-0" : "text-[#6BDC9F] mt-0.5 shrink-0"} />
                  <span className={feature.includes("Coming Soon") ? "text-[#505050] italic" : "text-[#E7E5E5]"}>
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <button 
              disabled={loadingTier === tier.id || (isSubscribed && currentTier === tier.id)}
              onClick={() => handleSubscribe(tier.name.toUpperCase())}
              className={`w-full py-4 rounded-sm font-inter font-bold text-xs tracking-widest transition-all duration-300 flex items-center justify-center gap-2 ${
                tier.highlight 
                  ? "bg-[#6BDC9F] text-[#004A2D] hover:bg-[#59C88C]" 
                  : "bg-[#252626] text-white hover:bg-[#333434]"
              } disabled:opacity-50 disabled:cursor-not-allowed uppercase`}
            >
              {loadingTier === tier.id ? "Initializing..." : (isSubscribed && currentTier === tier.id ? "Current Plan" : "Subscribe Now")}
            </button>
          </div>
        ))}
      </div>

      {/* Transaction History Section */}
      <div className="mt-20 max-w-7xl">
        <div className="flex items-center gap-3 mb-8 px-1">
          <History className="text-[#6BDC9F]" size={24} />
          <h2 className="text-white font-manrope font-bold text-xl tracking-wide">
            Billing History
          </h2>
        </div>

        <div className="bg-[#111111] border border-[#262626] rounded-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#1C1C1C] border-b border-[#262626]">
                <th className="px-8 py-5 text-[10px] font-bold text-[#87948A] tracking-widest uppercase">DATE</th>
                <th className="px-8 py-5 text-[10px] font-bold text-[#87948A] tracking-widest uppercase">TIER</th>
                <th className="px-8 py-5 text-[10px] font-bold text-[#87948A] tracking-widest uppercase">STATUS</th>
                <th className="px-8 py-5 text-[10px] font-bold text-[#87948A] tracking-widest uppercase text-right">AMOUNT</th>
              </tr>
            </thead>
            <tbody className="font-inter text-sm">
              {profile?.transactions?.length > 0 ? (
                profile.transactions.map((tx: any) => (
                  <tr key={tx.id} className="border-b border-[#262626] hover:bg-[#151515] transition-colors">
                    <td className="px-8 py-6 text-[#ACABAA] font-inter">
                      {new Date(tx.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-[#E7E5E5] font-semibold tracking-wide uppercase px-2 py-1 bg-[#252626] rounded-sm text-xs">
                        {tx.tier}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                         <div className={`w-2 h-2 rounded-full ${tx.status === 'SUCCESS' ? 'bg-[#6BDC9F]' : 'bg-[#E87A7A]'}`} />
                         <span className={tx.status === 'SUCCESS' ? 'text-[#6BDC9F]' : 'text-[#E87A7A]'}>
                           {tx.status}
                         </span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right font-manrope font-bold text-white tracking-wide">
                      ₦{tx.amount.toLocaleString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-8 py-10 text-center text-[#404040] italic font-inter">
                    No billing history found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WalletBilling;
