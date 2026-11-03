import { Router } from "express";
import { criarProduto,listarProdutos, buscarProdutoPorId, atualizarProduto, excluirProduto } from "../controllers/produtosController.js";

const router = Router();

router.post("/", criarProduto);
router.get("/", listarProdutos);
router.get("/:id", buscarProdutoPorId);
router.put("/:id", atualizarProduto);
router.delete("/:id", excluirProduto);

export default router;