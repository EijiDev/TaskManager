import db from "../config/database.js";

const Task = {
    create: async (taskData) => {
        const { user_id, title, description, status, priority, category, due_date } = taskData;
        const [createTaskResults] = await db.query(
            `INSERT INTO tasks(
            user_id,
            title, 
            description,
            status,
            priority,
            category,
            due_date
            ) VALUES(?, ?, ?, ?, ?, ?, ?)
            `, [user_id, title, description, status, priority, category, due_date]
        );
        return {
            id: createTaskResults.insertId,
            user_id,
            title,
            description,
            status,
            priority,
            category,
            due_date
        };
    },

    getAllTask: async () => {
        const [allTaskList] = await db.query("SELECT * FROM tasks");
        return allTaskList;
    },

    updateTask: async (id, taskData) => {
        const { title, description, status, priority, category, due_date } = taskData;
        const [updateTask] = await db.query(
            `UPDATE tasks
             SET title = ?, description = ?, status = ?, priority = ?, category = ?, due_date = ?
             WHERE id = ?
            `, [title, description, status, priority, category, due_date, id]
        );
        
        if (updateTask.affectedRows === 0) {
            return null;
        }

        // Return the updated task
        const [updated] = await db.query("SELECT * FROM tasks WHERE id = ?", [id]);
        return updated[0];
    },

    deleteTask: async (id) => {
        const [deleteTask] = await db.query("DELETE FROM tasks WHERE id = ?", 
            [id]
        );
        return deleteTask.affectedRows;
    },

    getTaskById: async (id) => {
        const [task] = await db.query("SELECT * FROM tasks WHERE id = ?",
            [id]
        );
        return task[0];
    },

    getTasksByUserId: async (user_id) => {
        const [userTask] = await db.query(
            "SELECT * FROM tasks WHERE user_id = ? ORDER BY due_date ASC", 
            [user_id]
        );
        return userTask;
    }
}

export default Task;