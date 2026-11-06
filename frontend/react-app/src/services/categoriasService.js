import requisicao from "./api.js";

export async function listarCategorias() {
  return await requisicao("/categorias");
}

export async function criarCategoria(categoria) {
  return await requisicao("/categorias", {
    method: "POST",
    body: JSON.stringify(categoria),
  });
}

export async function buscarCategoriaPorId(id) {
  return await requisicao(`/categorias/${id}`);
}

export async function atualizarCategoria(id, categoria) {
  return await requisicao(`/categorias/${id}`, {
    method: "PUT",
    body: JSON.stringify(categoria),
  });
}

export async function excluirCategoria(id) {
  return await requisicao(`/categorias/${id}`, {
    method: "DELETE",
  });
}