import { Router } from "express";
import Categoria from "../models/Categorias.js";
import { criarCategoria, listarCategorias, buscarCategoriaPorId, atualizarCategoria, excluirCategoria } from "../controllers/categoriasController.js";

const router = Router();

router.post("/", criarCategoria);

router.get("/", listarCategorias);

router.get("/:id", buscarCategoriaPorId);

router.put("/:id", atualizarCategoria);

router.delete("/:id", excluirCategoria);

export default router;