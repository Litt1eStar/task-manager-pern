import express from "express";
import {
  getAllItems,
  createTaskContainer,
  deleteTaskContainer,
  setStatusOfContainer,
  getById,
} from "./task_container.controller.js";
import { verifedToken } from "../middleware/verifedToken.js";

const router = express.Router();

router.get("/getAllContainer", verifedToken, getAllItems);
router.get("/getById/:id", getById);
router.post("/create", verifedToken, createTaskContainer);
router.delete("/delete/:id", deleteTaskContainer);
router.put("/setStatus/:container_id", setStatusOfContainer);

export default router;
