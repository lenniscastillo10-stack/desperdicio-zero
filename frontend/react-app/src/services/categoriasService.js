import requisicao from './api.js'

export async function listarCategorias() {
  return await requisicao('/categorias')
}