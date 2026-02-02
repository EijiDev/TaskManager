import { useEffect, useState } from "react";
import {
  LayoutGrid,
  Filter,
  CheckCircle,
  Sun,
  Tag,
  LogOut,
} from "lucide-react";
import axios from "axios";

const FilterItem = ({ icon: Icon, label, active }) => (
  <button
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-left cursor-pointer
      ${
        active
          ? "bg-indigo-600 text-white shadow-lg shadow-indigo-900/40"
          : "bg-base-300/50 border border-base-300 text-base-content/60 hover:border-base-content/20 hover:text-base-content"
      }`}
  >
    <Icon
      size={18}
      strokeWidth={1.8}
      className={`shrink-0 ${active ? "text-white" : "text-base-content/40"}`}
    />
    <span className="text-[14px] font-semibold tracking-tight">{label}</span>
  </button>
);

function SideBar() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const displayCurrentUser = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          throw new Error("No Access Token Found");
        }

        const response = await axios.get("/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data);
        setError("");
      } catch (error) {
        if (error.response?.status === 401) {
          localStorage.removeItem("accessToken");
          setError("Session expired. Please log in again.");
        } else {
          setError(
            error.response?.data?.message || "Failed to fetch user data",
          );
        }
      } finally {
        setLoading(false);
      }
    };

    displayCurrentUser();
  }, []);

  const getUserInitials = () => {
    if (!user?.name) return "U";

    const names = user.name.trim().split(" ");
    const firstInitial = names[0][0];
    const secondInitial = names[1]?.[0] || names[0][1] || "";

    return (firstInitial + secondInitial).toUpperCase();
  };
  return (
    <div className="h-full bg-base-200 p-3 sm:p-4 md:p-6">
      <div className="w-full max-w-80 mx-auto rounded-2xl overflow-hidden border border-base-300 shadow-2xl bg-base-300/50">
        {/* Header */}
        <div className="px-4 sm:px-5 pt-5 sm:pt-6 pb-4 sm:pb-5 flex items-center gap-3 sm:gap-3.5">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-900/40">
            <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white opacity-90" />
          </div>
          <div>
            <p className="text-[15px] sm:text-[16px] font-black uppercase tracking-tight text-base-content leading-none">
              Taskly
            </p>
            <p className="text-[10px] sm:text-[11px] text-base-content/40 font-medium mt-0.5">
              Personal Task Manager
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="mx-4 sm:mx-5 border-t border-base-300 mb-4 sm:mb-5" />

        {/* Quick Filters */}
        <div className="px-4 sm:px-5 pb-4 sm:pb-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="h-px w-3 sm:w-4 bg-base-content/20" />
            <p className="text-[9px] sm:text-[10px] font-bold tracking-widest uppercase text-indigo-400">
              Quick Filters
            </p>
            <span className="h-px flex-1 bg-base-content/20" />
          </div>
          <div className="flex flex-col gap-2">
            <FilterItem icon={LayoutGrid} label="All" active={true} />
            <FilterItem icon={Filter} label="Today" />
            <FilterItem icon={CheckCircle} label="Completed" />
            <FilterItem icon={Filter} label="Pending" />
          </div>
        </div>

        {/* Divider */}
        <div className="mx-4 sm:mx-5 border-t border-base-300 mb-4 sm:mb-5" />

        {/* Controls */}
        <div className="px-4 sm:px-5 pb-4 sm:pb-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="h-px w-3 sm:w-4 bg-base-content/20" />
            <p className="text-[9px] sm:text-[10px] font-bold tracking-widest uppercase text-indigo-400">
              Controls
            </p>
            <span className="h-px flex-1 bg-base-content/20" />
          </div>
          <div className="flex flex-col gap-2">
            {/* Dark Mode Toggle */}
            <div className="bg-base-300/50 border border-base-300 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <Sun
                  size={17}
                  strokeWidth={1.8}
                  className="text-base-content/40 sm:w-4.5 sm:h-4.5"
                />
                <span className="text-[13px] sm:text-[14px] font-semibold tracking-tight text-base-content/80">
                  Dark mode
                </span>
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="relative rounded-full transition-colors duration-300 focus:outline-none cursor-pointer"
                style={{
                  width: "38px",
                  height: "20px",
                  background: darkMode ? "#4f46e5" : "#374151",
                }}
              >
                <span
                  className="absolute top-0.5 left-0.5 bg-white rounded-full shadow-sm transition-transform duration-300"
                  style={{
                    width: "16px",
                    height: "16px",
                    transform: darkMode ? "translateX(18px)" : "translateX(0)",
                  }}
                />
              </button>
            </div>

            {/* Tags / Categories */}
            <button className="bg-base-300/50 border border-base-300 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 flex items-center gap-2.5 sm:gap-3 hover:border-base-content/20 transition-all duration-200 cursor-pointer">
              <Tag
                size={17}
                strokeWidth={1.8}
                className="text-base-content/40 sm:w-4.5 sm:h-4.5"
              />
              <span className="text-[13px] sm:text-[14px] font-semibold tracking-tight text-base-content/80">
                Tags / Categories
              </span>
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="mx-4 sm:mx-5 border-t border-base-300 mb-3 sm:mb-4" />

        {/* User Profile */}
        <div className="px-4 sm:px-5 pb-4 sm:pb-5">
          {error ? (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3">
              <p className="text-[11px] sm:text-[12px] text-red-400 text-center">
                {error}
              </p>
            </div>
          ) : (
            <div className="bg-base-300/50 border border-base-300 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-indigo-600/20 border border-indigo-600/40 flex items-center justify-center">
                  <span className="text-[11px] sm:text-[12px] font-black uppercase text-indigo-400">
                    {loading ? "..." : getUserInitials()}
                  </span>
                </div>
                <div>
                  <p className="text-[12px] sm:text-[13px] font-semibold tracking-tight text-base-content">
                    {loading ? "Loading..." : user?.name || "User"}
                  </p>
                  <p className="text-[10px] sm:text-[11px] text-base-content/40">
                    {loading ? "Loading..." : user?.email || "No email"}
                  </p>
                </div>
              </div>
              <button className="text-base-content/40 hover:text-indigo-400 transition-colors duration-200 p-1 cursor-pointer">
                <LogOut
                  size={17}
                  strokeWidth={1.8}
                  className="sm:w-4.5 sm:h-4.5"
                />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SideBar;
