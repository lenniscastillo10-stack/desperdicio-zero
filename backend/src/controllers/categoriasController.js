import Categoria from "../models/Categorias.js";
import { Op, fn, col, where } from "sequelize";
import { UniqueConstraintError, ValidationError, ForeignKeyConstraintError } from "sequelize";
import Produto from "../models/Produtos.js";

export const criarCategoria = async (req, res) => {
  try {
    const { nome } = req.body;

    if (!nome || nome.trim() === "") {
      return res.status(400).json({
        mensagem: "O nome da categoria é obrigatório",
      });
    }

    const nomePadronizado = nome.trim();

    const categoriaExistente = await Categoria.findOne({
      where: where(fn("LOWER", col("nome")), nomePadronizado.toLowerCase()),
    });

    if (categoriaExistente) {
      return res.status(409).json({
        mensagem: "Já existe uma categoria com esse nome",
      });
    }

    const novaCategoria = await Categoria.create({
      nome: nomePadronizado,
    });

    return res.status(201).json(novaCategoria);
  } catch (erro) {
    if (erro instanceof UniqueConstraintError) {
      return res.status(409).json({
        mensagem: "Já existe uma categoria com esse nome",
      });
    }

    if (erro instanceof ValidationError) {
      return res.status(400).json({
        mensagem: "Dados inválidos",
      });
    }

    return res.status(500).json({
      mensagem: "Erro interno ao cadastrar categoria",
    });
  }
};

export const listarCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.findAll();

    return res.status(200).json(categorias);
  } catch (erro) {
    console.error("Erro ao listar categorias", erro);

    return res.status(500).json({
      mensagem: "Erro ao consultar categorias",
    });
  }
};

export const buscarCategoriaPorId = async (req, res) => {
  try {
    const { id } = req.params;

    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
      return res.status(400).json({
        mensagem: "Id da categoria inválido",
      });
    }

    const categoria = await Categoria.findByPk(id);

    if (!categoria) {
      return res.status(404).json({
        mensagem: "Categoria não encontrada",
      });
    }

    return res.status(200).json(categoria);
  } catch (erro) {
    console.error("Erro ao consultar categoria", erro);

    return res.status(500).json({
      mensagem: "Erro ao consultar categoria",
    });
  }
};

export const atualizarCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome } = req.body;

    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
      return res.status(400).json({
        mensagem: "Id da categoria inválido",
      });
    }

    if (!nome || nome.trim() === "") {
      return res.status(400).json({
        mensagem: "O nome da categoria é obrigatório",
      });
    }

    const nomePadronizado = nome.trim();

    const categoria = await Categoria.findByPk(id);

    if (!categoria) {
      return res.status(404).json({
        mensagem: "Categoria não encontrada",
      });
    }

    const categoriaExistente = await Categoria.findOne({
      where: {
        [Op.and]: [
          where(fn("LOWER", col("nome")), nomePadronizado.toLowerCase()),
          {
            id: {
              [Op.ne]: id,
            },
          },
        ],
      },
    });

    if (categoriaExistente) {
      return res.status(409).json({
        mensagem: "Já existe uma categoria com esse nome",
      });
    }

    await categoria.update({
      nome: nomePadronizado,
    });

    return res.status(200).json(categoria);
  } catch (erro) {
    console.error("Erro ao atualizar categoria:", erro);

    if (erro instanceof UniqueConstraintError) {
      return res.status(409).json({
        mensagem: "Já existe uma categoria com esse nome",
      });
    }

    if (erro instanceof ValidationError) {
      return res.status(400).json({
        mensagem: "Dados inválidos",
        erros: erro.errors.map((item) => item.message),
      });
    }

    return res.status(500).json({
      mensagem: "Erro interno ao atualizar categoria",
    });
  }
};

export const excluirCategoria = async (req, res) => {
  try {
    const { id } = req.params;

    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
      return res.status(400).json({
        mensagem: "Id da categoria inválido",
      });
    }

    const categoria = await Categoria.findByPk(id);

    if (!categoria) {
      return res.status(404).json({
        mensagem: "Categoria não encontrada",
      });
    }

    const produtosAssociados = await Produto.count({
      where: { categoriaId: id },
    });

    if (produtosAssociados > 0) {
      return res.status(409).json({
        mensagem:
          "Não é possível excluir esta categoria porque existem produtos associados",
      });
    }

    await categoria.destroy();

    return res.status(200).json({
      mensagem: "Categoria excluída com sucesso",
    });
  } catch (erro) {
    console.error("Erro ao excluir categoria:", erro);

    if (erro instanceof ForeignKeyConstraintError) {
      return res.status(409).json({
        mensagem:
          "Não é possível excluir esta categoria porque existem registros associados",
      });
    }

    return res.status(500).json({
      mensagem: "Erro interno ao excluir categoria",
    });
  }
};
