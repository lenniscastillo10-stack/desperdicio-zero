import Lote from "../models/Lotes.js";
import Produto from "../models/Produtos.js";
import AcaoPreventiva from "../models/AcaoPreventiva.js";
import MovimentacaoEstoque from "../models/MovimentacaoEstoque.js";
import { ForeignKeyConstraintError } from "sequelize";

export const criarLote = async (req, res) => {
  try {
    const {
      codigoLote,
      produtoId,
      quantidadeInicial,
      quantidadeDisponivel,
      custoUnitarioCentavos,
      dataEntrada,
      dataValidade
    } = req.body;

    if (!Number.isInteger(Number(produtoId)) || Number(produtoId) <= 0) {
      return res.status(400).json({
        mensagem: "ID do produto inválido"
      });
    }

    const produto = await Produto.findByPk(produtoId);

    if (!produto) {
      return res.status(404).json({
        mensagem: "Produto não encontrado"
      });
    }

    
    if (
      !Number.isInteger(quantidadeInicial) ||
      quantidadeInicial <= 0 ||
      !Number.isInteger(quantidadeDisponivel) ||
      quantidadeDisponivel < 0 ||
      quantidadeDisponivel > quantidadeInicial
    ) {
      return res.status(400).json({
        mensagem: "As quantidades informadas são inválidas"
      });
    }

    if (
      !Number.isInteger(custoUnitarioCentavos) ||
      custoUnitarioCentavos < 0
    ) {
      return res.status(400).json({
        mensagem: "Custo unitário inválido"
      });
    }

    if (!dataEntrada || !dataValidade) {
      return res.status(400).json({
        mensagem: "As datas de entrada e validade são obrigatórias"
      });
    }

    if (dataValidade < dataEntrada) {
      return res.status(400).json({
        mensagem: "A data de validade não pode ser anterior à data de entrada"
      });
    }

    const lote = await Lote.create({
      codigoLote,
      produtoId,
      quantidadeInicial,
      quantidadeDisponivel,
      custoUnitarioCentavos,
      dataEntrada,
      dataValidade
    });

    return res.status(201).json(lote);

  } catch (erro) {
    console.error("Erro ao criar lote:", erro);

    return res.status(500).json({
      mensagem: "Erro interno ao cadastrar lote"
    });
  }
};

export const listarLotes = async (req, res) => {
  try {
    const lotes = await Lote.findAll();

    return res.status(200).json(lotes);

  } catch (erro) {
    console.error("Erro ao listar lotes:", erro);

    return res.status(500).json({
      mensagem: "Erro interno ao consultar lotes"
    });
  }
};

export const buscarLotePorId = async (req, res) => {
  try {
    const { id } = req.params;

    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
      return res.status(400).json({
        mensagem: "ID do lote inválido"
      });
    }

    const lote = await Lote.findByPk(id);

    if (!lote) {
      return res.status(404).json({
        mensagem: "Lote não encontrado"
      });
    }

    return res.status(200).json(lote);

  } catch (erro) {
    console.error("Erro ao buscar lote:", erro);

    return res.status(500).json({
      mensagem: "Erro interno ao consultar lote"
    });
  }
};

export const atualizarLote = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      codigoLote,
      produtoId,
      quantidadeInicial,
      quantidadeDisponivel,
      custoUnitarioCentavos,
      dataEntrada,
      dataValidade
    } = req.body;

    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
      return res.status(400).json({
        mensagem: "ID do lote inválido"
      });
    }

    const lote = await Lote.findByPk(id);

    if (!lote) {
      return res.status(404).json({
        mensagem: "Lote não encontrado"
      });
    }

    if (!Number.isInteger(Number(produtoId)) || Number(produtoId) <= 0) {
      return res.status(400).json({
        mensagem: "ID do produto inválido"
      });
    }

    const produto = await Produto.findByPk(produtoId);

    if (!produto) {
      return res.status(404).json({
        mensagem: "Produto não encontrado"
      });
    }

    if (
      !Number.isInteger(quantidadeInicial) ||
      quantidadeInicial <= 0 ||
      !Number.isInteger(quantidadeDisponivel) ||
      quantidadeDisponivel < 0 ||
      quantidadeDisponivel > quantidadeInicial
    ) {
      return res.status(400).json({
        mensagem: "As quantidades informadas são inválidas"
      });
    }

    if (
      !Number.isInteger(custoUnitarioCentavos) ||
      custoUnitarioCentavos < 0
    ) {
      return res.status(400).json({
        mensagem: "Custo unitário inválido"
      });
    }

    if (!dataEntrada || !dataValidade) {
      return res.status(400).json({
        mensagem: "As datas de entrada e validade são obrigatórias"
      });
    }

    if (dataValidade < dataEntrada) {
      return res.status(400).json({
        mensagem: "A data de validade não pode ser anterior à data de entrada"
      });
    }

    await lote.update({
      codigoLote,
      produtoId,
      quantidadeInicial,
      quantidadeDisponivel,
      custoUnitarioCentavos,
      dataEntrada,
      dataValidade
    });

    return res.status(200).json(lote);

  } catch (erro) {
    console.error("Erro ao atualizar lote:", erro);

    return res.status(500).json({
      mensagem: "Erro interno ao atualizar lote"
    });
  }
};

export const excluirLote = async (req, res) => {
  try {
    const { id } = req.params;

    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
      return res.status(400).json({
        mensagem: "ID do lote inválido"
      });
    }

    const lote = await Lote.findByPk(id);

    if (!lote) {
      return res.status(404).json({
        mensagem: "Lote não encontrado"
      });
    }

    const acoesAssociadas = await AcaoPreventiva.count({
      where: { loteId: id }
    });

    const movimentacoesAssociadas = await MovimentacaoEstoque.count({
      where: { loteId: id }
    });

    if (acoesAssociadas > 0 || movimentacoesAssociadas > 0) {
      return res.status(409).json({
        mensagem: "Não é possível excluir este lote porque existem ações preventivas ou movimentações associadas"
      });
    }

    await lote.destroy();

    return res.status(200).json({
      mensagem: "Lote excluído com sucesso"
    });

  } catch (erro) {
    console.error("Erro ao excluir lote:", erro);

    if (erro instanceof ForeignKeyConstraintError) {
      return res.status(409).json({
        mensagem: "Não é possível excluir este lote porque existem registros associados"
      });
    }

    return res.status(500).json({
      mensagem: "Erro interno ao excluir lote"
    });
  }
};