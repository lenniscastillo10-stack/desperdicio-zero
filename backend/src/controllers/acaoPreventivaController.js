import AcaoPreventiva from "../models/AcaoPreventiva.js";
import Lote from "../models/Lotes.js";

export const criarAcaoPreventiva = async (req, res) => {
  try {
    const {
      loteId,
      tipoAcao,
      quantidadeAfetada,
      status,
      dataPlanejada,
      dataRealizada,
      observacoes
    } = req.body;

    if (!Number.isInteger(Number(loteId)) || Number(loteId) <= 0) {
      return res.status(400).json({
        mensagem: "Informe um ID de lote válido"
      });
    }

    const lote = await Lote.findByPk(loteId);

    if (!lote) {
      return res.status(404).json({
        mensagem: "Lote não encontrado"
      });
    }

    if (!tipoAcao || tipoAcao.trim() === "") {
      return res.status(400).json({
        mensagem: "O tipo de ação é obrigatório"
      });
    }

    if (
      !Number.isInteger(quantidadeAfetada) ||
      quantidadeAfetada <= 0
    ) {
      return res.status(400).json({
        mensagem: "A quantidade afetada deve ser um número inteiro maior que zero"
      });
    }

    if (!dataPlanejada) {
      return res.status(400).json({
        mensagem: "A data planejada é obrigatória"
      });
    }

    const dadosAcao = {
      loteId,
      tipoAcao: tipoAcao.trim(),
      quantidadeAfetada,
      dataPlanejada,
      dataRealizada: dataRealizada || null,
      observacoes: observacoes || null
    };

    if (status) {
      dadosAcao.status = status;
    }

    const novaAcao = await AcaoPreventiva.create(dadosAcao);

    return res.status(201).json(novaAcao);

  } catch (erro) {
    console.error("Erro ao cadastrar ação preventiva:", erro);

    return res.status(500).json({
      mensagem: "Erro interno ao cadastrar ação preventiva"
    });
  }
};

export const listarAcoesPreventivas = async (req, res) => {
  try {
    const acoes = await AcaoPreventiva.findAll();

    return res.status(200).json(acoes);

  } catch (erro) {
    console.error("Erro ao listar ações preventivas:", erro);

    return res.status(500).json({
      mensagem: "Erro interno ao listar ações preventivas"
    });
  }
};

export const buscarAcaoPreventivaPorId = async (req, res) => {
  try {
    const { id } = req.params;

    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
      return res.status(400).json({
        mensagem: "Informe um ID válido"
      });
    }

    const acao = await AcaoPreventiva.findByPk(id);

    if (!acao) {
      return res.status(404).json({
        mensagem: "Ação preventiva não encontrada"
      });
    }

    return res.status(200).json(acao);

  } catch (erro) {
    console.error("Erro ao buscar ação preventiva:", erro);

    return res.status(500).json({
      mensagem: "Erro interno ao buscar ação preventiva"
    });
  }
};

export const atualizarAcaoPreventiva = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      loteId,
      tipoAcao,
      quantidadeAfetada,
      status,
      dataPlanejada,
      dataRealizada,
      observacoes
    } = req.body;

    // Validar o ID da ação
    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
      return res.status(400).json({
        mensagem: "Informe um ID válido"
      });
    }

    const acao = await AcaoPreventiva.findByPk(id);

    if (!acao) {
      return res.status(404).json({
        mensagem: "Ação preventiva não encontrada"
      });
    }

    // Validar o lote
    if (!Number.isInteger(Number(loteId)) || Number(loteId) <= 0) {
      return res.status(400).json({
        mensagem: "Informe um ID de lote válido"
      });
    }

    const lote = await Lote.findByPk(loteId);

    if (!lote) {
      return res.status(404).json({
        mensagem: "Lote não encontrado"
      });
    }

    // Validar os demais campos
    if (!tipoAcao || tipoAcao.trim() === "") {
      return res.status(400).json({
        mensagem: "O tipo de ação é obrigatório"
      });
    }

    if (
      !Number.isInteger(quantidadeAfetada) ||
      quantidadeAfetada <= 0
    ) {
      return res.status(400).json({
        mensagem: "A quantidade afetada deve ser um número inteiro maior que zero"
      });
    }

    if (!dataPlanejada) {
      return res.status(400).json({
        mensagem: "A data planejada é obrigatória"
      });
    }

    const statusPermitidos = [
      "PLANEJADA",
      "CONCLUIDA",
      "CANCELADA"
    ];

    if (!statusPermitidos.includes(status)) {
      return res.status(400).json({
        mensagem: "Informe um status válido"
      });
    }

    await acao.update({
      loteId,
      tipoAcao: tipoAcao.trim(),
      quantidadeAfetada,
      status,
      dataPlanejada,
      dataRealizada: dataRealizada || null,
      observacoes: observacoes || null
    });

    return res.status(200).json(acao);

  } catch (erro) {
    console.error("Erro ao atualizar ação preventiva:", erro);

    return res.status(500).json({
      mensagem: "Erro interno ao atualizar ação preventiva"
    });
  }
};

export const excluirAcaoPreventiva = async (req, res) => {
  try {
    const { id } = req.params;

    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
      return res.status(400).json({
        mensagem: "Informe um ID válido"
      });
    }

    const acao = await AcaoPreventiva.findByPk(id);

    if (!acao) {
      return res.status(404).json({
        mensagem: "Ação preventiva não encontrada"
      });
    }

    await acao.destroy();

    return res.status(200).json({
      mensagem: "Ação preventiva excluída com sucesso"
    });

  } catch (erro) {
    console.error("Erro ao excluir ação preventiva:", erro);

    return res.status(500).json({
      mensagem: "Erro interno ao excluir ação preventiva"
    });
  }
};