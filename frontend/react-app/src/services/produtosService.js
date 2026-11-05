import requisicao from './api.js'

export async function listarProdutos() {
  return await requisicao('/produtos')
}

export async function buscarProdutoPorId(id) {
  return await requisicao(`/produtos/${id}`)
}

export async function criarProduto(produto) {
  return await requisicao('/produtos', {
    method: 'POST',
    body: JSON.stringify(produto)
  })
}

export async function atualizarProduto(id, produto) {
  return await requisicao(`/produtos/${id}`, {
    method: 'PUT',
    body: JSON.stringify(produto)
  })
}

export async function excluirProduto(id) {
  return await requisicao(`/produtos/${id}`, {
    method: 'DELETE'
  })
}