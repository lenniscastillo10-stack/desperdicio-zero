import requisicao from './api'

export async function listarMovimentacoes() {
  return await requisicao('/movimentacao-estoque')
}

export async function buscarMovimentacaoPorId(id) {
  return await requisicao(`/movimentacao-estoque/${id}`)
}

export async function criarMovimentacao(movimentacao) {
  return await requisicao('/movimentacao-estoque', {
    method: 'POST',
    body: JSON.stringify(movimentacao)
  })
}

export async function atualizarMovimentacao(id, movimentacao) {
  return await requisicao(`/movimentacao-estoque/${id}`, {
    method: 'PUT',
    body: JSON.stringify(movimentacao)
  })
}

export async function excluirMovimentacao(id) {
  return await requisicao(`/movimentacao-estoque/${id}`, {
    method: 'DELETE'
  })
}