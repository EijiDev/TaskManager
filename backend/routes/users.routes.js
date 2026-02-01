import express from "express";
import {
    getAllUsers,
    getUsersById,
    updateUsers,
    deleteUsers,
    getCurrentUser
} from "../controllers/users.controller.js";

const router = express.Router();

router.get("/me", getCurrentUser);
router.get("/", getAllUsers);
router.get("/:userId", getUsersById);
router.put("/:userId", updateUsers);
router.delete("/:userId", deleteUsers);

export default router;