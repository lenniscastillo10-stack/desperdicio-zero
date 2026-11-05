import requisicao from './api.js'

export async function listarLotes() {
  return await requisicao('/lotes')
}

export async function buscarLotePorId(id) {
  return await requisicao(`/lotes/${id}`)
}

export async function criarLote(lote) {
  return await requisicao('/lotes', {
    method: 'POST',
    body: JSON.stringify(lote)
  })
}

export async function atualizarLote(id, lote) {
  return await requisicao(`/lotes/${id}`, {
    method: 'PUT',
    body: JSON.stringify(lote)
  })
}

export async function excluirLote(id) {
  return await requisicao(`/lotes/${id}`, {
    method: 'DELETE'
  })
}