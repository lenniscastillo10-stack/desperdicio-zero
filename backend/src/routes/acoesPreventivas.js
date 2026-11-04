import { Router } from "express";

import {
  criarAcaoPreventiva,
  listarAcoesPreventivas,
  buscarAcaoPreventivaPorId,
  atualizarAcaoPreventiva,
  excluirAcaoPreventiva,
} from "../controllers/acoesPreventivasController.js";

const router = Router();

router.post("/", criarAcaoPreventiva);
router.get("/", listarAcoesPreventivas);
router.get("/:id", buscarAcaoPreventivaPorId);
router.put("/:id", atualizarAcaoPreventiva);
router.delete("/:id", excluirAcaoPreventiva);

export default router;
