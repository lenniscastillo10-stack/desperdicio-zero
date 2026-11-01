import Categoria from "../models/Categorias.js"

export const criarCategoria = async (req, res) => {
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
};

export const listarCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.findAll();

    return res.status(200).json(categorias);

  } catch (erro) {
    return res.status(500).json({
      mensagem: "Erro ao consultar categorias",
      erro: erro.message
    });
  }
}

export const buscarCategoriaPorId = async (req, res) => {
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
}