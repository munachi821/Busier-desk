import { Helmet } from "react-helmet-async";
import { User, Mail, Phone, TriangleAlert } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "../../lib/api";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    image: "",
    businessAssistant: "",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await api.get("/api/user/me");
        const data = response.data;
        setProfile({
          name: data.name || "",
          email: data.email || "",
          phoneNumber: data.phoneNumber || "",
          image: data.image || "",
          businessAssistant: data.businessAssistant?.name || "Not connected",
        });
      } catch (err) {
        console.error("Failed to fetch profile:", err);
        setError("Could not load profile data.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfileData();
  }, []);

  const handleUpdate = async () => {
    setIsSaving(true);
    setError("");
    setSuccessMsg("");
    try {
      await api.patch("/api/user/update", {
        name: profile.name,
        phoneNumber: profile.phoneNumber,
        image: profile.image,
      });
      setSuccessMsg("Profile updated successfully.");
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      console.error("Failed to update profile:", err);
      setError("Could not update profile.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you absolutely sure you want to delete your account? This cannot be undone.",
    );
    if (!confirmDelete) return;

    setIsDeleting(true);
    try {
      await api.delete("/api/user/account");
      window.location.href = "/authentication";
    } catch (err) {
      console.error("Failed to delete account:", err);
      setError("Could not delete account.");
      setIsDeleting(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 pt-8 w-full overflow-y-auto">
      <Helmet>
        <title>Profile & Account Settings - BusierDesk</title>
      </Helmet>

      <div className="max-w-4xl">
        <h2 className="font-manrope font-bold text-3xl md:text-4xl text-[#E7E5E5] mb-10">
          Profile & Account Settings
        </h2>

        {error && (
          <div className="mb-6 p-4 bg-[#2a1b1b] border border-[#E87A7A] text-[#E87A7A] rounded-sm font-inter text-sm">
            {error}
          </div>
        )}

        {successMsg && (
          <div className="mb-6 p-4 bg-[#1A2520] border border-[#6BDC9F] text-[#6BDC9F] rounded-sm font-inter text-sm">
            {successMsg}
          </div>
        )}

        {/* Personal Information Card */}
        <div
          className={`bg-[#131313] border border-[#262626] rounded-md p-6 sm:p-8 mb-8 transition-opacity duration-300 ${isLoading ? "opacity-50 pointer-events-none" : "opacity-100"}`}
        >
          <h3 className="font-manrope font-bold text-xl text-[#E7E5E5] mb-6">
            Personal Information
          </h3>

          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-full bg-[#1A1A1A] border border-[#333] flex items-center justify-center text-[#ACABAA] shrink-0 overflow-hidden">
              {profile.image ? (
                <img
                  src={profile.image}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User size={32} />
              )}
            </div>
            <p className="font-inter text-[#ACABAA] text-sm md:text-base tracking-wide">
              Linked AI:{" "}
              <span className="text-[#6BDC9F] ml-1">
                {profile.businessAssistant}
              </span>
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-8 border-b border-[#262626]">
            {/* Full Name */}
            <div className="flex flex-col gap-2">
              <label className="font-inter text-[#E7E5E5] text-sm tracking-wide">
                Business Name
              </label>
              <div className="relative">
                <User
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#ACABAA]"
                />
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) =>
                    setProfile({ ...profile, name: e.target.value })
                  }
                  className="w-full bg-[#0E0E0E] border border-[#262626] focus:border-[#6BDC9F] rounded-sm py-3.5 pl-11 pr-4 text-[#E7E5E5] font-inter text-sm outline-none transition-colors"
                />
              </div>
            </div>

            {/* Email Address */}
            <div className="flex flex-col gap-2">
              <label className="font-inter text-[#E7E5E5] text-sm tracking-wide">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#ACABAA]/50"
                />
                <input
                  type="email"
                  value={profile.email}
                  disabled
                  className="w-full bg-[#1C1C1C] border border-[#262626] rounded-sm py-3.5 pl-11 pr-4 text-[#ACABAA]/50 font-inter text-sm outline-none cursor-not-allowed"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div className="flex flex-col gap-2">
              <label className="font-inter text-[#E7E5E5] text-sm tracking-wide">
                Phone Number
              </label>
              <div className="relative">
                <Phone
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#ACABAA]"
                />
                <input
                  type="tel"
                  value={profile.phoneNumber}
                  onChange={(e) =>
                    setProfile({ ...profile, phoneNumber: e.target.value })
                  }
                  className="w-full bg-[#0E0E0E] border border-[#262626] focus:border-[#6BDC9F] rounded-sm py-3.5 pl-11 pr-4 text-[#ACABAA] font-inter text-sm outline-none transition-colors"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              onClick={handleUpdate}
              disabled={isSaving}
              className="nav-btn-gradient text-[#00311C] font-semibold text-sm font-inter py-3 px-8 rounded-sm tracking-wide disabled:opacity-75"
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-[#131313] border border-[#E87A7A]/30 rounded-md p-6 sm:p-8">
          <h3 className="font-manrope font-bold text-xl text-[#E87A7A] mb-3">
            Danger Zone
          </h3>
          <p className="font-inter text-[#E7E5E5] text-sm mb-6 tracking-wide">
            Permanently delete your account, leads, and AI assistant context.
            This action cannot be undone.
          </p>

          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="flex items-center gap-2 border border-[#E87A7A]/50 bg-[#2a1b1b] hover:bg-[#E87A7A] hover:text-white text-[#E87A7A] transition-colors font-inter text-sm font-medium py-2.5 px-6 rounded-sm disabled:opacity-50"
          >
            <TriangleAlert size={18} />
            {isDeleting ? "Deleting..." : "Delete Account"}
          </button>
        </div>
      </div>
    </div>
  );
};
export default Profile;
