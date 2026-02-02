import { X } from "lucide-react";

function AddTaskModal({ showModal, setShowModal, newTask, setNewTask, handleAddTask }) {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-base-200 rounded-2xl border border-base-300 shadow-2xl w-full max-w-md">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-base-300">
          <h3 className="text-[16px] font-bold text-base-content">Add New Task</h3>
          <button
            onClick={() => setShowModal(false)}
            className="text-base-content/40 hover:text-base-content transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-[12px] font-semibold text-base-content/80 mb-2">
              Title
            </label>
            <input
              type="text"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              placeholder="Enter task title"
              className="w-full px-3 py-2 bg-base-300/50 border border-base-300 rounded-lg text-[13px] text-base-content placeholder-base-content/40 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-[12px] font-semibold text-base-content/80 mb-2">
              Description
            </label>
            <textarea
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              placeholder="Enter task description"
              rows={3}
              className="w-full px-3 py-2 bg-base-300/50 border border-base-300 rounded-lg text-[13px] text-base-content placeholder-base-content/40 focus:outline-none focus:border-indigo-500 resize-none"
            />
          </div>

          {/* Priority */}
          <div>
            <label className="block text-[12px] font-semibold text-base-content/80 mb-2">
              Priority
            </label>
            <select
              value={newTask.priority}
              onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
              className="w-full px-3 py-2 bg-base-300/50 border border-base-300 rounded-lg text-[13px] text-base-content focus:outline-none focus:border-indigo-500"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          {/* Category */}
          <div>
            <label className="block text-[12px] font-semibold text-base-content/80 mb-2">
              Category
            </label>
            <select
              value={newTask.category}
              onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
              className="w-full px-3 py-2 bg-base-300/50 border border-base-300 rounded-lg text-[13px] text-base-content focus:outline-none focus:border-indigo-500"
            >
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Shopping">Shopping</option>
              <option value="Health">Health</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end gap-3 px-5 py-4 border-t border-base-300">
          <button
            onClick={() => setShowModal(false)}
            className="px-4 py-2 text-[13px] font-semibold text-base-content/60 hover:text-base-content transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleAddTask}
            className="px-5 py-2 bg-indigo-600 text-white text-[13px] font-bold rounded-lg hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-900/40"
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddTaskModal;