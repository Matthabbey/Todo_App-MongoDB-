import express, { Router } from "express";
import {
  createTodo,
  deleteTODO,
  getFistData,
  getAllTodo,
  updateTODO,
} from "../controller/todoController";

const router = express.Router();

router.post("/create", createTodo);
router.get("/", getAllTodo);
router.patch("/update/:id", updateTODO);
router.delete("/delete/:id", deleteTODO);
router.get("/fish/:species", getFistData);

export default router;
