import express from "express";

import {
    createUser,
    getAllUsers,
    getUsersById,
    updateUsers,
    deleteUsers
} from "../controllers/users.controller.js";

const router = express.Router();

router.post("/", createUser);
router.get("/", getAllUsers);
router.get("/:userId", getUsersById);
router.put("/:userId", updateUsers);
router.delete("/:userId", deleteUsers);

export default router;