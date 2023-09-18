import express from "express";
import { getModels, getModel, addModel, updateMode, deleteModel } from "../controllers/model.js";

const router = express.Router();

router.get("/", getModels);
router.get("/:id", getModel);
router.post("/", addModel);
router.put("/:id", updateMode);
router.delete("/:id", deleteModel);

export default router;
