import { Router } from "express";
import Categoria from "../models/Categorias.js";
import { criarCategoria } from "../controllers/categoriasController.js";

const router = Router();

router.post("/", criarCategoria);

router.get("/", async (req, res) => {
  try {
    const categorias = await Categoria.findAll();

    return res.status(200).json(categorias);

  } catch (erro) {
    return res.status(500).json({
      mensagem: "Erro ao consultar categorias",
      erro: erro.message
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const categoria = await Categoria.findByPk(id);

    if (!categoria) {
      return res.status(404).json({
        mensagem: "Categoria não encontrada"
      });
    }

    return res.status(200).json(categoria);

  } catch (erro) {
    return res.status(500).json({
      mensagem: "Erro ao consultar categoria",
      erro: erro.message
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nome } = req.body;

    const categoria = await Categoria.findByPk(id);

    if (!categoria) {
      return res.status(404).json({
        mensagem: "Categoria não encontrada"
      });
    }

    await categoria.update({
      nome
    });

    return res.status(200).json(categoria);

  } catch (erro) {
    return res.status(500).json({
      mensagem: "Erro ao atualizar categoria",
      erro: erro.message
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const categoria = await Categoria.findByPk(id);

    if (!categoria) {
      return res.status(404).json({
        mensagem: "Categoria não encontrada"
      });
    }

    await categoria.destroy();

    return res.status(200).json({
      mensagem: "Categoria excluída com sucesso"
    });

  } catch (erro) {
    return res.status(500).json({
      mensagem: "Erro ao excluir categoria",
      erro: erro.message
    });
  }
});

export default router;