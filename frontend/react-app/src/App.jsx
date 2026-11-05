import { useState } from 'react'
import './App.css'

import Painel from './pages/Painel'
import Indicadores from './components/Indicadores'
import FormularioProduto from './components/FormularioProduto'
import ListaProdutos from './components/ListaProdutos'

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
      validade
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

    if (diferenca <= 3) return 'Alto'
    if (diferenca <= 7) return 'Médio'

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
        <Painel />

        <Indicadores
          totalProdutos={produtos.length}
          produtosEmRisco={produtosEmRisco.length}
        />

        <FormularioProduto
          nome={nome}
          setNome={setNome}
          quantidade={quantidade}
          setQuantidade={setQuantidade}
          validade={validade}
          setValidade={setValidade}
          cadastrarProduto={cadastrarProduto}
        />

        <ListaProdutos
          produtos={produtos}
          calcularRisco={calcularRisco}
        />
      </main>
    </div>
  )
}

export default App