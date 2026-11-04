import { Router } from "express";
import { criarLote, listarLotes, buscarLotePorId, atualizarLote, excluirLote } from "../controllers/lotesController.js";

const router = Router();

router.post("/", criarLote);
router.get("/", listarLotes);
router.get("/:id", buscarLotePorId);
router.put("/:id", atualizarLote);
router.delete("/:id", excluirLote);

export default router;