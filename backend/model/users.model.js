import db from "../config/database.js";

const Users = {
    create: async (userData) => {
        const { name, email, password, avatar } = userData;
        const [createResults] = await db.query(
            `INSERT INTO users(name, email, password, avatar) VALUES(?, ?, ?, ?)`,
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

    getAllUsers: async () => {
        const [allUsers] = await db.query("SELECT * FROM users");
        return allUsers;
    },

    findUserById: async (userId) => {
        const [getById] = await db.query("SELECT * FROM users WHERE id = ?", [userId]);
        return getById[0];
    },

    updateUser: async ({ id, name, email, password, avatar }) => {
        const [updateUserResults] = await db.query(
            `UPDATE users SET name = ?, email = ?, password = ?, avatar = ? WHERE id = ?`,
            [name, email, password, avatar, id]
        );
        return updateUserResults;
    },

    deleteUser: async (userId) => {
        const [deleteUserResults] = await db.query("DELETE FROM users WHERE id = ?", [userId]);
        return deleteUserResults.affectedRows;
    },

    findUserByEmail: async (email) => {
        const [userEmail] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
        return userEmail[0];
    },

    updateRefreshToken: async (userId, refreshToken) => {
        const [result] = await db.query(
            "UPDATE users SET refresh_token = ? WHERE id = ?",
            [refreshToken, userId]
        );
        return result;
    }
};

export default Users;