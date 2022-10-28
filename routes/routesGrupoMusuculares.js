import express from "express";
// import Aluno from "../models/AlunoModel.js";
import { createGrupoMuscular, updateGrupoMuscular, deleteGrupoMuscular, getGrupoMuscular, getGrupoMusculares } from
    "../controllers/grupoMuscularController.js";
const router = express.Router();

router.post("/", createGrupoMuscular);
router.put("/:id", updateGrupoMuscular);
router.delete("/:id", deleteGrupoMuscular);
router.get("/:id", getGrupoMuscular);
router.get("/", getGrupoMusculares);
export default router;