const API_URL = 'http://localhost:3000'

async function requisicao(endpoint, opcoes = {}) {
  const resposta = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...opcoes.headers
    },
    ...opcoes
  })

  const dados = await resposta.json()

  if (!resposta.ok) {
    throw new Error(
      dados.mensagem || 'Erro ao comunicar com o servidor.'
    )
  }

  return dados
}

export default requisicao