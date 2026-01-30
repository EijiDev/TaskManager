import db from "../config/database.js";

const Task = {
    create: async (taskData) => {
        const { user_id, title, description, status, priority, due_date } = taskData;
        const [createTaskResults] = await db.query(
            `INSERT INTO tasks(
            user_id,
            title, 
            description,
            status,
            priority,
            due_date
            ) VALUES(?, ?, ?, ?, ?, ?)
            `, [user_id, title, description, status, priority, due_date]
        );
        return {
            id: createTaskResults.insertId,
            user_id,
            title,
            description,
            status,
            priority,
            due_date
        };
    },

    getAllTask: async () => {
        const [allTaskList] = await db.query("SELECT * FROM tasks");
        return allTaskList[0];
    },

    updateTask: async ({title, description, status, priority, due_date, id}) => {
        const [updateTask] = await db.query(
            `UPDATE tasks
             SET title = ?, description = ?, status = ?, priority = ?, due_date = ?
             WHERE id = ?
            `, [title, description, status, priority, due_date, id]
        );
        return updateTask;
    },

    deleteTask: async (id) => {
        const [deleteTask] = await db.query("DELETE FROM tasks WHERE id = ?", 
            [id]
        );
        return deleteTask.affectedRows;
    },

    getTaskById: async (id) => {
        const [task] = await db.query("SELECT * FROM task WHERE id = ?",
            [id]
        );
        return task[0];
    },

    getTasksByUserId: async(user_id) => {
        const [userTask] = await db.query(
            "SELECT * FROM task WHERE user_id = ? ORDER BY due_date ASC", [user_id]
        );
        return userTask;
    }
}

export default Task;