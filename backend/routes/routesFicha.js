import express from "express";
// import Aluno from "../models/AlunoModel.js";
import { createFicha, updateFicha, deleteFicha, getFicha, getFichas } from
    "../controllers/fichaController.js";
    
const router = express.Router();

router.post("/", createFicha);
router.put("/:id", updateFicha);
router.delete("/:id", deleteFicha);
router.get("/:id", getFicha);
router.get("/", getFicha);
export default router;