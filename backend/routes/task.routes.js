import express from "express";

import { 
    createTask, 
    getAllTask, 
    updateTask, 
    deleteTask } 
from "../controllers/task.controller.js";

const router = express.Router();

router.post("/", createTask);
router.get("/", getAllTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;