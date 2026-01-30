import db from "../config/database.js";

const Users = {
    create: async (userData) => {
        const { name, email, password, avatar } = userData;
        const [createResults] = await db.query(`
            INSERT INTO users(name, email, password, avatar) VALUES(?, ?, ?, ?)`, 
            [name, email, password, avatar]
        );
        return {
            userId: createResults.insertId,
            name, 
            email,
            password,
            avatar
        };
    },

    getAllUsers: async() => {
        const [allUsers] = await db.query("SELECT * FROM users");
        return allUsers[0];
    },

    getUsersById: async(userId) => {
        const [getById] = await db.query("SELECT * FROM users WHERE id = ?", [userId]);
        return getById[0];
    },

    updateUser: async({name, email, password, avatar}) => {
        const [updateUserResults] = await db.query(`
            UPDATE users 
            SET name = ?, email = ?, password = ?, avatar = ? 
            WHERE id = ?`, 
        [name, email, password, avatar]
        );
        return updateUserResults;
    },

    deleteUser: async(userId) => {
        const [deleteUserResults] = await db.query("DELETE FROM users WHERE id = ?", 
            [userId]
        );
        return deleteUserResults.affectedRows;
    }
}

export default Users;