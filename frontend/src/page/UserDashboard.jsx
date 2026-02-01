import { useState } from "react";
import SideBar from "../components/layouts/SideBar.jsx";
import TaskList from "../components/TaskList.jsx";
import { Menu, X } from "lucide-react";

function UserDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-base-200">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 rounded-xl bg-base-300/80 backdrop-blur-sm border border-base-300 flex items-center justify-center text-base-content/60 hover:text-base-content transition-colors shadow-lg"
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed lg:relative z-40
          w-80 flex-shrink-0 h-full overflow-y-auto
          transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <SideBar />
      </div>

      {/* Main Content */}
      <div className="flex-1 h-full overflow-y-auto">
        <TaskList />
      </div>
    </div>
  );
}

export default UserDashboard;