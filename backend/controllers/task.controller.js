import Task from "../model/tasks.model.js";

export const createTask = async (req, res) => {
  try {
    const { user_id, title, description, status, priority, category, due_date } = req.body;

    if (!user_id) {
      return res.status(400).json({ message: "User ID Required" });
    }

    if (!title) {
      return res.status(400).json({ message: "Title Required" });
    }

    if (!priority) {
      return res.status(400).json({ message: "Priority Required" });
    }

    if (!due_date) {
      return res.status(400).json({ message: "Date Required" });
    }

    const createdTask = await Task.create({
      user_id,
      title,
      description,
      status,
      priority,
      category,
      due_date,
    });

    res
      .status(201)
      .json({ message: "Successfully Created", data: createdTask });
  } catch (error) {
    console.error("Create task error:", error);
    res.status(500).json({ error: error.message });
  }
};

export const getAllTask = async (req, res) => {
  try {
    const { user_id } = req.query;

    if (!user_id) {
      return res.status(400).json({ message: "User ID required" });
    }

    const tasks = await Task.getTasksByUserId(user_id);

    // Return empty array if no tasks found instead of 404
    res.status(200).json(tasks || []);
  } catch (error) {
    console.error("Get all tasks error:", error);
    res.status(500).json({ error: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, priority, category, due_date } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title Required" });
    }

    if (!priority) {
      return res.status(400).json({ message: "Priority Required" });
    }

    if (!due_date) {
      return res.status(400).json({ message: "Date Required" });
    }

    const task = await Task.getTaskById(id);

    if (!task) {
      return res.status(404).json({ message: "Task Not Found" });
    }

    const updatedTask = await Task.updateTask(id, { 
      title, 
      description, 
      status, 
      priority, 
      category,
      due_date 
    });

    res.status(200).json({
      message: "Updated Successfully",
      data: updatedTask
    });
  } catch (error) {
    console.error("Update task error:", error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.getTaskById(id);

    if (!task) {
      return res.status(404).json({ message: "Task Not Found" });
    }

    await Task.deleteTask(id);
    res.status(200).json({ 
      message: "Task deleted successfully",
      data: task 
    });

  } catch (error) {
    console.error("Delete task error:", error);
    res.status(500).json({ error: error.message });
  }
};