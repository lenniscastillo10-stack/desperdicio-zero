
import { useState } from 'react'
import './App.css'

function App() {
  const [produtos, setProdutos] = useState([])
  const [nome, setNome] = useState('')
  const [quantidade, setQuantidade] = useState('')
  const [validade, setValidade] = useState('')

  function cadastrarProduto(event) {
    event.preventDefault()

    if (!nome.trim() || !quantidade || !validade) {
      alert('Preencha todos os campos.')
      return
    }

    const novoProduto = {
      id: Date.now(),
      nome: nome.trim(),
      quantidade: Number(quantidade),
      validade: validade,
    }

    setProdutos([...produtos, novoProduto])

    setNome('')
    setQuantidade('')
    setValidade('')
  }

  function calcularRisco(dataValidade) {
    const hoje = new Date()
    hoje.setHours(0, 0, 0, 0)

    const vencimento = new Date(`${dataValidade}T00:00:00`)
    const diferenca = Math.ceil(
      (vencimento - hoje) / (1000 * 60 * 60 * 24)
    )

    if (diferenca <= 3) {
      return 'Alto'
    }

    if (diferenca <= 7) {
      return 'Médio'
    }

    return 'Baixo'
  }

  const produtosEmRisco = produtos.filter(
    (produto) => calcularRisco(produto.validade) !== 'Baixo'
  )

  return (
    <div className="app">
      <header className="cabecalho">
        <h1>🌱 Desperdício Zero</h1>
        <p>Radar de Perdas</p>
      </header>

      <main className="conteudo">
        <h2>Controle de validade e prevenção de perdas</h2>

        <p>
          Identifique produtos próximos do vencimento
          e ajude a reduzir o desperdício no supermercado.
        </p>

        <section className="indicadores">
          <article className="cartao">
            <span>Produtos cadastrados</span>
            <strong>{produtos.length}</strong>
          </article>

          <article className="cartao">
            <span>Produtos em risco</span>
            <strong>{produtosEmRisco.length}</strong>
          </article>

          <article className="cartao">
            <span>Perdas evitadas</span>
            <strong>0</strong>
          </article>
        </section>

        <section className="lista">
          <h2>Cadastrar produto</h2>

          <form onSubmit={cadastrarProduto}>
            <label htmlFor="nome">Nome do produto</label>
            <input
              id="nome"
              type="text"
              placeholder="Ex.: Leite integral"
              value={nome}
              onChange={(event) => setNome(event.target.value)}
              required
            />

            <label htmlFor="quantidade">Quantidade em estoque</label>
            <input
              id="quantidade"
              type="number"
              min="1"
              placeholder="Ex.: 20"
              value={quantidade}
              onChange={(event) => setQuantidade(event.target.value)}
              required
            />

            <label htmlFor="validade">Data de validade</label>
            <input
              id="validade"
              type="date"
              value={validade}
              onChange={(event) => setValidade(event.target.value)}
              required
            />

            <button type="submit">Cadastrar produto</button>
          </form>
        </section>

        <section className="lista">
          <h2>Radar de produtos</h2>

          {produtos.length === 0 ? (
            <p>Nenhum produto cadastrado ainda.</p>
          ) : (
            <ul>
              {produtos.map((produto) => (
                <li key={produto.id} className="produto-item">
                  <div>
                    <strong>{produto.nome}</strong>
                    <p>Quantidade: {produto.quantidade}</p>
                    </div>

                    <span
                      className={`risco risco-${calcularRisco(produto.validade).toLowerCase()}`}
                      >
                        Risco: {calcularRisco(produto.validade)}
                      </span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  )
}

export default App
