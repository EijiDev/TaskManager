import db from "../config/database.js";

const Tags = {
    create: async ({ user_id, name, color }) => {
        const [tagsCreate] = await db.query(`
            INSERT INTO tags (
                user_id,
                name, 
                color
            ) VALUES(?, ?, ?)`,
            [user_id, name, color]
        );
        return {
            id: tagsCreate.insertId,
            user_id,
            name,
            color
        };
    },

    getAllTags: async () => {
        const [getTags] = await db.query("SELECT * FROM tags");
        return getTags;
    },

    getTagsByUserId: async (userId) => {
        const [tags] = await db.query(
            "SELECT * FROM tags WHERE user_id = ?",
            [userId]
        );
        return tags;
    },

    findByNameAndUser: async (userId, tagName) => {
        const [tags] = await db.query(
            "SELECT * FROM tags WHERE user_id = ? AND name = ? LIMIT 1",
            [userId, tagName]
        );
        return tags[0]; // Returns undefined if not found
    },

    deleteTags: async (tagsId) => {
        const [result] = await db.query(
            "DELETE FROM tags WHERE id = ?",
            [tagsId]
        );
        return result.affectedRows > 0;
    },

    updateTags: async (tagsId, { name, color }) => {
        const updates = [];
        const values = [];

        if (name !== undefined) {
            updates.push("name = ?");
            values.push(name);
        }
        if (color !== undefined) {
            updates.push("color = ?");
            values.push(color);
        }

        if (updates.length === 0) {
            throw new Error("No fields to update");
        }

        values.push(tagsId);

        const [result] = await db.query(
            `UPDATE tags SET ${updates.join(", ")} WHERE id = ?`,
            values
        );

        if (result.affectedRows === 0) {
            return null;
        }

        const [updated] = await db.query(
            "SELECT * FROM tags WHERE id = ?",
            [tagsId]
        );
        return updated[0];
    }
};

export default Tags;