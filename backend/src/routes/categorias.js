import { Router } from "express";
import Categoria from "../models/Categorias.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { nome } = req.body;

    const novaCategoria = await Categoria.create({
      nome
    });

    return res.status(201).json(novaCategoria);

  } catch (erro) {
    return res.status(500).json({
      mensagem: "Erro ao cadastrar categoria",
      erro: erro.message
    });
  }
});

export default router;