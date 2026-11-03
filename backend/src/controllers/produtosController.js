import Produto from "../models/Produtos.js";
import Categoria from "../models/Categorias.js";
import Lote from "../models/Lotes.js";
import { ForeignKeyConstraintError } from "sequelize";

export const criarProduto = async (req, res) => {
  try {
    const { nome, categoriaId } = req.body;

    if (!nome || nome.trim() === "") {
      return res.status(400).json({
        mensagem: "O nome do produto é obrigatório",
      });
    }

    if (!Number.isInteger(Number(categoriaId)) || Number(categoriaId) <= 0) {
      return res.status(400).json({
        mensagem: "ID da categoria inválido",
      });
    }

    const categoria = await Categoria.findByPk(categoriaId);

    if (!categoria) {
      return res.status(404).json({
        mensagem: "Categoria não encontrada",
      });
    }

    const produto = await Produto.create({
      nome: nome.trim(),
      categoriaId,
    });

    return res.status(201).json(produto);
  } catch (erro) {
    console.error("Erro ao criar produto:", erro);

    return res.status(500).json({
      mensagem: "Erro interno ao cadastrar produto",
    });
  }
};

export const listarProdutos = async (req, res) => {
  try {
    const produtos = await Produto.findAll();

    return res.status(200).json(produtos);
  } catch (erro) {
    console.error("Erro ao listar produtos:", erro);

    return res.status(500).json({
      mensagem: "Erro interno ao consultar produtos",
    });
  }
};

export const buscarProdutoPorId = async (req, res) => {
  try {
    const { id } = req.params;

    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
      return res.status(400).json({
        mensagem: "ID do produto inválido",
      });
    }

    const produto = await Produto.findByPk(id);

    if (!produto) {
      return res.status(404).json({
        mensagem: "Produto não encontrado",
      });
    }

    return res.status(200).json(produto);
  } catch (erro) {
    console.error("Erro ao buscar produto:", erro);

    return res.status(500).json({
      mensagem: "Erro interno ao consultar produto",
    });
  }
};

export const atualizarProduto = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, categoriaId } = req.body;

    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
      return res.status(400).json({
        mensagem: "ID do produto inválido",
      });
    }

    if (!nome || nome.trim() === "") {
      return res.status(400).json({
        mensagem: "O nome do produto é obrigatório",
      });
    }

    if (!Number.isInteger(Number(categoriaId)) || Number(categoriaId) <= 0) {
      return res.status(400).json({
        mensagem: "ID da categoria inválido",
      });
    }

    const produto = await Produto.findByPk(id);

    if (!produto) {
      return res.status(404).json({
        mensagem: "Produto não encontrado",
      });
    }

    const categoria = await Categoria.findByPk(categoriaId);

    if (!categoria) {
      return res.status(404).json({
        mensagem: "Categoria não encontrada",
      });
    }

    await produto.update({
      nome: nome.trim(),
      categoriaId,
    });

    return res.status(200).json(produto);
  } catch (erro) {
    console.error("Erro ao atualizar produto:", erro);

    return res.status(500).json({
      mensagem: "Erro interno ao atualizar produto",
    });
  }
};

export const excluirProduto = async (req, res) => {
  try {
    const { id } = req.params;

    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
      return res.status(400).json({
        mensagem: "ID do produto inválido",
      });
    }

    const produto = await Produto.findByPk(id);

    if (!produto) {
      return res.status(404).json({
        mensagem: "Produto não encontrado",
      });
    }

    const lotesAssociados = await Lote.count({
      where: { produtoId: id },
    });

    if (lotesAssociados > 0) {
      return res.status(409).json({
        mensagem:
          "Não é possível excluir este produto porque existem lotes associados",
      });
    }

    await produto.destroy();

    return res.status(200).json({
      mensagem: "Produto excluído com sucesso",
    });
  } catch (erro) {
    console.error("Erro ao excluir produto:", erro);

    if (erro instanceof ForeignKeyConstraintError) {
      return res.status(409).json({
        mensagem:
          "Não é possível excluir este produto porque existem registros associados",
      });
    }

    return res.status(500).json({
      mensagem: "Erro interno ao excluir produto",
    });
  }
};
