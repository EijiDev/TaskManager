import { useState } from "react";
import {
  Pencil,
  Trash2,
  Check,
  X,
  ChevronDown,
} from "lucide-react";

const PRIORITIES = ["High", "Medium", "Low"];
const CATEGORIES = ["Work", "Personal", "Admin", "Health", "Finance"];

const priorityStyle = {
  High: "bg-red-50 text-red-500 border border-red-200",
  Medium: "bg-amber-50 text-amber-600 border border-amber-200",
  Low: "bg-green-50 text-green-500 border border-green-200",
};

function TaskCard({ task, onToggle, onDelete, onUpdate }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState({ ...task });

  const save = () => {
    if (!draft.title.trim()) return;
    onUpdate(draft);
    setEditing(false);
  };

  const cancel = () => {
    setDraft({ ...task });
    setEditing(false);
  };

  if (editing) {
    return (
      <div className="bg-base-300/50 rounded-xl sm:rounded-2xl border-2 border-indigo-500 shadow-xl sm:shadow-2xl overflow-hidden p-4 sm:p-5 flex flex-col gap-2.5 sm:gap-3">
        <input
          autoFocus
          value={draft.title}
          onChange={(e) => setDraft({ ...draft, title: e.target.value })}
          placeholder="Task title"
          className="text-[14px] sm:text-[15px] font-semibold text-base-content bg-base-300/50 border border-base-300 rounded-xl px-3 sm:px-3.5 py-2 sm:py-2.5 placeholder-base-content/40 focus:outline-none focus:border-indigo-500 transition-colors"
        />
        <input
          value={draft.description}
          onChange={(e) => setDraft({ ...draft, description: e.target.value })}
          placeholder="Add a description"
          className="text-[12px] sm:text-[13px] text-base-content/60 bg-base-300/50 border border-base-300 rounded-xl px-3 sm:px-3.5 py-2 sm:py-2.5 placeholder-base-content/40 focus:outline-none focus:border-indigo-500 transition-colors"
        />

        <div className="flex gap-2 flex-wrap">
          {/* Priority */}
          <div className="relative">
            <select
              value={draft.priority}
              onChange={(e) => setDraft({ ...draft, priority: e.target.value })}
              className="appearance-none pr-6 sm:pr-7 pl-2.5 sm:pl-3 py-1.5 text-[11px] sm:text-[12px] font-semibold rounded-lg border border-base-300 bg-base-300/50 text-base-content/80 focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
              {PRIORITIES.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
            <ChevronDown size={11} className="absolute right-1.5 sm:right-2 top-1/2 -translate-y-1/2 text-base-content/40 pointer-events-none sm:w-3 sm:h-3" />
          </div>

          {/* Category */}
          <div className="relative">
            <select
              value={draft.category}
              onChange={(e) => setDraft({ ...draft, category: e.target.value })}
              className="appearance-none pr-6 sm:pr-7 pl-2.5 sm:pl-3 py-1.5 text-[11px] sm:text-[12px] font-semibold rounded-lg border border-base-300 bg-base-300/50 text-base-content/80 focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <ChevronDown size={11} className="absolute right-1.5 sm:right-2 top-1/2 -translate-y-1/2 text-base-content/40 pointer-events-none sm:w-3 sm:h-3" />
          </div>
        </div>

        <div className="flex gap-2 pt-1">
          <button
            onClick={save}
            className="flex items-center justify-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 bg-indigo-600 text-white text-[11px] sm:text-[12px] font-bold uppercase tracking-widest rounded-xl hover:bg-indigo-700 transition-colors cursor-pointer shadow-lg shadow-indigo-900/40"
          >
            <Check size={13} strokeWidth={2.5} className="sm:w-[14px] sm:h-[14px]" /> Save
          </button>
          <button
            onClick={cancel}
            className="flex items-center justify-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 bg-base-300/50 border border-base-300 text-base-content/60 text-[11px] sm:text-[12px] font-bold uppercase tracking-widest rounded-xl hover:border-base-content/20 hover:text-base-content transition-colors cursor-pointer"
          >
            <X size={13} strokeWidth={2.5} className="sm:w-[14px] sm:h-[14px]" /> Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-base-300/50 rounded-xl sm:rounded-2xl border border-base-300 shadow-xl sm:shadow-2xl hover:border-base-content/20 transition-all duration-200 p-4 sm:p-5 flex gap-3 sm:gap-4">
      <button
        onClick={() => onToggle(task.id)}
        className={`flex-shrink-0 mt-0.5 w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 cursor-pointer
          ${task.completed
            ? "bg-indigo-600 border-indigo-600 shadow-lg shadow-indigo-600/30"
            : "border-base-content/30 hover:border-indigo-400"
          }`}
      >
        {task.completed && <Check size={12} strokeWidth={2.5} className="text-white sm:w-[13px] sm:h-[13px]" />}
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0 flex flex-col gap-1.5 sm:gap-2">
        <div className="flex items-start justify-between gap-2 sm:gap-3">
          <div className="flex-1 min-w-0">
            <h3
              className={`text-[14px] sm:text-[15px] font-semibold transition-all duration-200
                ${task.completed ? "line-through text-base-content/40" : "text-base-content"}`}
            >
              {task.title || <span className="text-base-content/40 italic">Untitled task</span>}
            </h3>
            {task.description && (
              <p className={`text-[12px] sm:text-[13px] mt-0.5 ${task.completed ? "text-base-content/30" : "text-base-content/60"}`}>
                {task.description}
              </p>
            )}
          </div>

          {/* Priority Badge */}
          <span className={`flex-shrink-0 text-[10px] sm:text-[11px] font-bold px-2 sm:px-2.5 py-0.5 rounded-full ${priorityStyle[task.priority]}`}>
            {task.priority}
          </span>
        </div>

        {/* Meta + Actions */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
            <span className="text-[11px] sm:text-[12px] font-medium text-base-content/60 bg-base-300/50 px-2 sm:px-2.5 py-0.5 rounded-full">
              {task.date}
            </span>
            <span className="text-base-content/20 hidden sm:inline">•</span>
            <span className="text-[11px] sm:text-[12px] font-medium text-base-content/60">
              {task.category}
            </span>
          </div>

          {/* Edit / Delete */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setEditing(true)}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-base-content/40 hover:text-indigo-400 hover:bg-indigo-900/20 transition-all duration-200 cursor-pointer"
            >
              <Pencil size={14} className="sm:w-[15px] sm:h-[15px]" />
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-base-content/40 hover:text-red-400 hover:bg-red-900/20 transition-all duration-200 cursor-pointer"
            >
              <Trash2 size={14} className="sm:w-[15px] sm:h-[15px]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;