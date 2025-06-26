import { Router } from "express";
import { tasksController } from "../controller/taskController";

const router = Router();

router.post("/", tasksController.createTask);
router.get("/", tasksController.getTasks);
router.patch("/:taskId/status", tasksController.updateTaskStatus);
router.get("/user/:userId", tasksController.getUserTasks);

export default router;
