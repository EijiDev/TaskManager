import db from "../config/database.js";

const Tags = {
    create: async ({user_id, name, color}) => {
        const [tagsCreate] = await db.query(`
            INSERT INTO tags (
            user_id,
            name, 
            color
            ) VALUES(?, ?, ?) `,
        [user_id, name, color]
        );
        return {
            taskId: tagsCreate.insertId,
            user_id,
            name,
            color
        };
    },

    getAllTags: async() => {
        const [getTags] = await db.query("SELECT * FROM tags");
        return getTags[0];
    },

    deleteTags: async(tagsId) => {
        
    }
}

export default Tags;

