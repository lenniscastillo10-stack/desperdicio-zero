import MovimentacaoEstoque from "../models/MovimentacaoEstoque.js";
import Lote from "../models/Lotes.js";
import sequelize from "../config/database.js";

export const criarMovimentacao = async (req, res) => {
  try {
    const {
      loteId,
      tipo,
      quantidade,
      observacoes
    } = req.body;

    if (!Number.isInteger(Number(loteId)) || Number(loteId) <= 0) {
      return res.status(400).json({
        mensagem: "Informe um ID de lote válido"
      });
    }

    const tiposEntrada = ["ENTRADA", "AJUSTE_ENTRADA"];
    const tiposSaida = ["VENDA", "DESCARTE", "AJUSTE_SAIDA"];

    if (![...tiposEntrada, ...tiposSaida].includes(tipo)) {
      return res.status(400).json({
        mensagem: "Tipo de movimentação inválido"
      });
    }

    if (!Number.isInteger(quantidade) || quantidade <= 0) {
      return res.status(400).json({
        mensagem: "A quantidade deve ser um número inteiro maior que zero"
      });
    }

    const movimentacao = await sequelize.transaction(async (transaction) => {

      const lote = await Lote.findByPk(loteId, { transaction });

      if (!lote) {
        const erro = new Error("Lote não encontrado");
        erro.status = 404;
        throw erro;
      }

      const quantidadeAtual = Number(lote.quantidadeDisponivel);

      let novaQuantidade;

      if (tiposEntrada.includes(tipo)) {
        novaQuantidade = quantidadeAtual + quantidade;
      } else {
        if (quantidade > quantidadeAtual) {
          const erro = new Error("Estoque insuficiente para essa movimentação");
          erro.status = 409;
          throw erro;
        }

        novaQuantidade = quantidadeAtual - quantidade;
      }

      await lote.update(
        { quantidadeDisponivel: novaQuantidade },
        { transaction }
      );

      const novaMovimentacao = await MovimentacaoEstoque.create(
        {
          loteId,
          tipo,
          quantidade,
          observacoes: observacoes || null
        },
        { transaction }
      );

      return novaMovimentacao;
    });

    return res.status(201).json(movimentacao);

  } catch (erro) {
    console.error("Erro ao cadastrar movimentação:", erro);

    if (erro.status) {
      return res.status(erro.status).json({
        mensagem: erro.message
      });
    }

    return res.status(500).json({
      mensagem: "Erro interno ao cadastrar movimentação"
    });
  }
};

export const listarMovimentacoes = async (req, res) => {
  try {
    const movimentacoes = await MovimentacaoEstoque.findAll();

    return res.status(200).json(movimentacoes);

  } catch (erro) {
    console.error("Erro ao listar movimentações:", erro);

    return res.status(500).json({
      mensagem: "Erro interno ao listar movimentações"
    });
  }
};

export const buscarMovimentacaoPorId = async (req, res) => {
  try {
    const { id } = req.params;

    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
      return res.status(400).json({
        mensagem: "Informe um ID válido"
      });
    }

    const movimentacao = await MovimentacaoEstoque.findByPk(id);

    if (!movimentacao) {
      return res.status(404).json({
        mensagem: "Movimentação não encontrada"
      });
    }

    return res.status(200).json(movimentacao);

  } catch (erro) {
    console.error("Erro ao buscar movimentação:", erro);

    return res.status(500).json({
      mensagem: "Erro interno ao buscar movimentação"
    });
  }
};

export const atualizarMovimentacao = async (req, res) => {
  try {
    const { id } = req.params;
    const { loteId, tipo, quantidade, observacoes } = req.body;

    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
      return res.status(400).json({
        mensagem: "Informe um ID válido"
      });
    }

    if (!Number.isInteger(Number(loteId)) || Number(loteId) <= 0) {
      return res.status(400).json({
        mensagem: "Informe um ID de lote válido"
      });
    }

    const tiposEntrada = ["ENTRADA", "AJUSTE_ENTRADA"];
    const tiposSaida = ["VENDA", "DESCARTE", "AJUSTE_SAIDA"];
    const tiposPermitidos = [...tiposEntrada, ...tiposSaida];

    if (!tiposPermitidos.includes(tipo)) {
      return res.status(400).json({
        mensagem: "Tipo de movimentação inválido"
      });
    }

    if (!Number.isInteger(quantidade) || quantidade <= 0) {
      return res.status(400).json({
        mensagem: "A quantidade deve ser um número inteiro maior que zero"
      });
    }

    const movimentacaoAtualizada = await sequelize.transaction(async (transaction) => {

      const movimentacao = await MovimentacaoEstoque.findByPk(id, {
        transaction
      });

      if (!movimentacao) {
        const erro = new Error("Movimentação não encontrada");
        erro.status = 404;
        throw erro;
      }

      const loteAntigo = await Lote.findByPk(movimentacao.loteId, {
        transaction
      });

      if (!loteAntigo) {
        const erro = new Error("Lote original não encontrado");
        erro.status = 404;
        throw erro;
      }

      const loteNovo = await Lote.findByPk(Number(loteId), {
        transaction
      });

      if (!loteNovo) {
        const erro = new Error("Lote informado não encontrado");
        erro.status = 404;
        throw erro;
      }

      const quantidadeAntiga = Number(movimentacao.quantidade);
      const saldoAntigo = Number(loteAntigo.quantidadeDisponivel);

      let saldoAposEstorno;

      if (tiposEntrada.includes(movimentacao.tipo)) {
        saldoAposEstorno = saldoAntigo - quantidadeAntiga;
      } else {
        saldoAposEstorno = saldoAntigo + quantidadeAntiga;
      }

      if (saldoAposEstorno < 0) {
        const erro = new Error(
          "Não é possível atualizar: o estoque já não possui saldo suficiente para estornar a movimentação original"
        );
        erro.status = 409;
        throw erro;
      }

      const mesmoLote = Number(loteAntigo.id) === Number(loteNovo.id);

      const saldoBase = mesmoLote
        ? saldoAposEstorno
        : Number(loteNovo.quantidadeDisponivel);

      let novoSaldo;

      if (tiposEntrada.includes(tipo)) {
        novoSaldo = saldoBase + quantidade;
      } else {
        if (quantidade > saldoBase) {
          const erro = new Error(
            "Estoque insuficiente para essa movimentação"
          );
          erro.status = 409;
          throw erro;
        }

        novoSaldo = saldoBase - quantidade;
      }

      if (mesmoLote) {
        await loteAntigo.update(
          { quantidadeDisponivel: novoSaldo },
          { transaction }
        );
      } else {
        await loteAntigo.update(
          { quantidadeDisponivel: saldoAposEstorno },
          { transaction }
        );

        await loteNovo.update(
          { quantidadeDisponivel: novoSaldo },
          { transaction }
        );
      }

      await movimentacao.update(
        {
          loteId: Number(loteId),
          tipo,
          quantidade,
          observacoes: observacoes || null
        },
        { transaction }
      );

      return movimentacao;
    });

    return res.status(200).json(movimentacaoAtualizada);

  } catch (erro) {
    console.error("Erro ao atualizar movimentação:", erro);

    if (erro.status) {
      return res.status(erro.status).json({
        mensagem: erro.message
      });
    }

    return res.status(500).json({
      mensagem: "Erro interno ao atualizar movimentação"
    });
  }
};

export const excluirMovimentacao = async (req, res) => {
  try {
    const { id } = req.params;

    // Validar ID
    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
      return res.status(400).json({
        mensagem: "Informe um ID válido"
      });
    }

    await sequelize.transaction(async (transaction) => {

      // Buscar movimentação
      const movimentacao = await MovimentacaoEstoque.findByPk(id, {
        transaction
      });

      if (!movimentacao) {
        const erro = new Error("Movimentação não encontrada");
        erro.status = 404;
        throw erro;
      }

      // Buscar lote associado
      const lote = await Lote.findByPk(movimentacao.loteId, {
        transaction
      });

      if (!lote) {
        const erro = new Error("Lote associado não encontrado");
        erro.status = 404;
        throw erro;
      }

      const quantidade = Number(movimentacao.quantidade);
      const saldoAtual = Number(lote.quantidadeDisponivel);

      let novoSaldo;

      // Desfazer o efeito da movimentação
      if (["ENTRADA", "AJUSTE_ENTRADA"].includes(movimentacao.tipo)) {
        novoSaldo = saldoAtual - quantidade;
      } else {
        novoSaldo = saldoAtual + quantidade;
      }

      // Impedir saldo negativo
      if (novoSaldo < 0) {
        const erro = new Error(
          "Não é possível excluir esta movimentação porque o estoque ficaria negativo"
        );
        erro.status = 409;
        throw erro;
      }

      // Atualizar estoque
      await lote.update(
        { quantidadeDisponivel: novoSaldo },
        { transaction }
      );

      // Excluir movimentação
      await movimentacao.destroy({ transaction });
    });

    return res.status(200).json({
      mensagem: "Movimentação excluída e estoque atualizado com sucesso"
    });

  } catch (erro) {
    console.error("Erro ao excluir movimentação:", erro);

    if (erro.status) {
      return res.status(erro.status).json({
        mensagem: erro.message
      });
    }

    return res.status(500).json({
      mensagem: "Erro interno ao excluir movimentação"
    });
  }
};