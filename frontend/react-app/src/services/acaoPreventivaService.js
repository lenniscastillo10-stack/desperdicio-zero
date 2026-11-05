import requisicao from './api.js'

export async function listarAcoesPreventivas() {
  return await requisicao('/acoes-preventivas')
}

export async function buscarAcaoPreventivaPorId(id) {
  return await requisicao(`/acoes-preventivas/${id}`)
}

export async function criarAcaoPreventiva(acao) {
  return await requisicao('/acoes-preventivas', {
    method: 'POST',
    body: JSON.stringify(acao)
  })
}

export async function atualizarAcaoPreventiva(id, acao) {
  return await requisicao(`/acoes-preventivas/${id}`, {
    method: 'PUT',
    body: JSON.stringify(acao)
  })
}

export async function excluirAcaoPreventiva(id) {
  return await requisicao(`/acoes-preventivas/${id}`, {
    method: 'DELETE'
  })
}