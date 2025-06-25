import { Router } from "express";
const { authorize } = require("../middlewares/authorize");
import { ChecklistController } from "../controllers/checklist.controller";

const router = Router();
router.get("/", authorize(), ChecklistController.list);
router.post("/", authorize(), ChecklistController.create);
router.delete("/:checklistId", authorize(), ChecklistController.delete);

export default router;