import { Router } from "express";
import { userController } from "../controller/userController";

const router = Router();

router.get("/", userController.getUsers);
router.post("/", userController.registerUser);
router.get("/:cognitoId", userController.getUser);

export default router;
