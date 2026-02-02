import express from "express";
import { verifyToken } from "../middleware/auth.middleware.js";
import {
    getAllUsers,
    getUsersById,
    updateUsers,
    deleteUsers,
    getCurrentUser
} from "../controllers/users.controller.js";

const router = express.Router();

router.get("/me", verifyToken, getCurrentUser);
router.get("/", getAllUsers);
router.get("/:userId", getUsersById);
router.put("/:userId", updateUsers);
router.delete("/:userId", deleteUsers);

export default router;