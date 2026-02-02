import { useState } from "react";
import TaskCard from "./TaskCard.jsx";
import AddTaskModal from "./AddTaskModal.jsx";
import { Search, Plus } from "lucide-react";
import { useEffect } from "react";
import axios from "axios";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [newTasks, setNewTasks] = useState({
    title: "",
    description: "",
    priority: "Medium",
    category: "Work",
  });

  const filtered = tasks.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    fetchTask();
  }, []);

  fetchTask = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("accessToken");
      if (!token) {
        throw new Error("No Access Token Found");
      }

      const response = await axios.get("/api/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks(response.data);
      setError("");
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem("accessToken");
        setError("Session expired. Please log in again.");
      } else {
        setError(error.response?.data?.message || "Failed to fetch tasks");
      }
    } finally {
      setLoading(false);
    }
  };

  const addTasks = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        throw new Error("No Access Token Found");
      }

      const newTask = {
        title: "",
        description: "",
        priority: "Medium",
        category: "Work",
        date: new Date().toISOString(),
        completed: false,
      };

      const response = await axios.post("/api/tasks", newTask, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks((prec) => [...prev, response.data]);
    } catch (error) {
      console.error("Failed to add task:", error);
      alert(error.response?.data?.message || "Failed to add task");
    }
  };
  return (
    <div className="h-full flex flex-col bg-base-200">
      {/* ── Top Bar ── */}
      <div className="w-full px-4 sm:px-6 md:px-8 py-4 sm:py-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-6">
        <div className="flex-1 flex justify-center order-2 sm:order-1">
          <div className="relative w-full max-w-xl">
            <Search
              size={16}
              className="absolute left-3 sm:left-3.5 top-1/2 -translate-y-1/2 text-base-content/40"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tasks..."
              className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-2.5 bg-base-300/50 border border-base-300 rounded-full text-[13px] sm:text-[14px] text-base-content placeholder-base-content/40 focus:outline-none focus:border-indigo-500 shadow-sm transition-colors"
            />
          </div>
        </div>

        {/* User Chip */}
        <div className="flex-shrink-0 flex items-center gap-2 sm:gap-2.5 bg-base-300/50 border border-base-300 rounded-full px-2.5 sm:px-3 py-1.5 shadow-sm order-1 sm:order-2 self-end sm:self-auto">
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-indigo-600/20 border border-indigo-600/40 flex items-center justify-center">
            <span className="text-[9px] sm:text-[10px] font-black uppercase text-indigo-400">
              AH
            </span>
          </div>
          <span className="text-[12px] sm:text-[13px] font-semibold text-base-content/80">
            Alex
          </span>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="flex-1 w-full px-4 sm:px-6 md:px-8 pb-8 sm:pb-10 md:pb-12 flex flex-col gap-4 sm:gap-5">
        {/* Dashboard Header */}
        <div className="bg-base-300/50 rounded-xl sm:rounded-2xl border border-base-300 shadow-xl sm:shadow-2xl overflow-hidden">
          <div className="px-4 sm:px-5 md:px-6 py-4 sm:py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
            <div>
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <span className="h-px w-3 sm:w-4 bg-base-content/20" />
                <p className="text-[9px] sm:text-[10px] font-bold tracking-widest uppercase text-indigo-400">
                  Dashboard
                </p>
                <span className="h-px w-6 sm:w-8 bg-base-content/20" />
              </div>
              <h2 className="text-[18px] sm:text-[20px] md:text-[22px] font-black text-base-content leading-tight tracking-tight">
                Your tasks, beautifully sorted.
              </h2>
              <p className="text-[12px] sm:text-[13px] text-base-content/40 mt-1 sm:mt-1.5 font-medium">
                {tasks.length} total tasks
              </p>
            </div>

            <button
              onClick={() => setShowModal(true)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-indigo-600 text-white text-[12px] sm:text-[13px] font-bold uppercase tracking-widest rounded-xl hover:bg-indigo-700 transition-colors cursor-pointer shadow-lg shadow-indigo-900/40"
            >
              <Plus size={15} strokeWidth={2.5} className="sm:w-4 sm:h-4" /> Add
              Task
            </button>
          </div>
        </div>

        {/* ── Task Cards ── */}
        <div className="flex flex-col gap-2.5 sm:gap-3">
          {filtered.length === 0 ? (
            <div className="bg-base-300/50 rounded-xl sm:rounded-2xl border border-base-300 shadow-sm px-5 sm:px-6 py-10 sm:py-14 text-center">
              <p className="text-[13px] sm:text-[14px] text-base-content/40 font-medium">
                {search
                  ? "No tasks match your search."
                  : "No tasks yet. Add one to get started!"}
              </p>
            </div>
          ) : (
            filtered.map((task) => <TaskCard key={task._id} task={task} />)
          )}
        </div>
      </div>

      {/* Add Task Modal */}
      <AddTaskModal
        showModal={showModal}
        setShowModal={setShowModal}
        newTask={newTask}
        setNewTask={setNewTask}
        handleAddTask={handleAddTask}
      />
    </div>
  );
}

export default TaskList;
