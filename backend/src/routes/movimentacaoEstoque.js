import { Router } from "express";

import {
  criarMovimentacao,
  listarMovimentacoes,
  buscarMovimentacaoPorId,
  atualizarMovimentacao,
  excluirMovimentacao
} from "../controllers/movimentacaoEstoqueController.js";

const router = Router();

router.post("/", criarMovimentacao);
router.get("/", listarMovimentacoes);
router.get("/:id", buscarMovimentacaoPorId);
router.put("/:id", atualizarMovimentacao);
router.delete("/:id", excluirMovimentacao);

export default router;
