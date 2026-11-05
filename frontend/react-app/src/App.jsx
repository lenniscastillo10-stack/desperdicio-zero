import { useState, useEffect } from "react";
import "./App.css";

import Painel from "./pages/Painel";
import Indicadores from "./components/Indicadores";
import FormularioProduto from "./components/FormularioProduto";
import ListaProdutos from "./components/ListaProdutos";
import FormularioLote from "./components/FormularioLote";
import DetalhesProduto from "./components/DetalhesProduto";

import { listarCategorias } from "./services/categoriasService";
import { listarProdutos, criarProduto } from "./services/produtosService";
import { listarLotes, criarLote } from "./services/lotesService";
import { listarAcoesPreventivas } from "./services/acaoPreventivaService";

function App() {
  const [produtos, setProdutos] = useState([]);
  const [nome, setNome] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [lotes, setLotes] = useState([]);
  const [produtoId, setProdutoId] = useState("");
  const [codigoLote, setCodigoLote] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [custoUnitario, setCustoUnitario] = useState("");
  const [dataEntrada, setDataEntrada] = useState("");
  const [dataValidade, setDataValidade] = useState("");
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [acoesPreventivas, setAcoesPreventivas] = useState([]);

  useEffect(() => {
    async function carregarDados() {
      try {
        const [dadosCategorias, dadosProdutos, dadosLotes, dadosAcoes] =
          await Promise.all([
            listarCategorias(),
            listarProdutos(),
            listarLotes(),
            listarAcoesPreventivas(),
          ]);

        setCategorias(dadosCategorias);
        setProdutos(dadosProdutos);
        setLotes(dadosLotes);
        setAcoesPreventivas(dadosAcoes);
      } catch (erro) {
        console.error("Erro ao carregar dados:", erro.message);
      }
    }

    carregarDados();
  }, []);

  async function cadastrarProduto(event) {
    event.preventDefault();

    if (!nome.trim() || !categoriaId) {
      alert("Preencha todos os campos.");
      return;
    }

    try {
      const novoProduto = await criarProduto({
        nome: nome.trim(),
        categoriaId: Number(categoriaId),
      });

      setProdutos((produtosAtuais) => [...produtosAtuais, novoProduto]);

      setNome("");
      setCategoriaId("");

      alert("Produto cadastrado com sucesso!");
    } catch (erro) {
      alert(erro.message);
    }
  }

  async function cadastrarLote(event) {
    event.preventDefault();

    if (
      !produtoId ||
      !quantidade ||
      !custoUnitario ||
      !dataEntrada ||
      !dataValidade
    ) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    if (dataValidade < dataEntrada) {
      alert("A validade não pode ser anterior à data de entrada.");
      return;
    }

    try {
      const novoLote = await criarLote({
        produtoId: Number(produtoId),
        codigoLote: codigoLote.trim() || null,
        quantidadeInicial: Number(quantidade),
        quantidadeDisponivel: Number(quantidade),
        custoUnitarioCentavos: Math.round(Number(custoUnitario) * 100),
        dataEntrada,
        dataValidade,
      });

      setLotes((lotesAtuais) => [...lotesAtuais, novoLote]);

      setProdutoId("");
      setCodigoLote("");
      setQuantidade("");
      setCustoUnitario("");
      setDataEntrada("");
      setDataValidade("");

      alert("Lote cadastrado com sucesso!");
    } catch (erro) {
      alert(erro.message);
    }
  }

  async function atualizarLotes() {
    const dados = await listarLotes();
    setLotes(dados);
  }

  async function atualizarAcoesPreventivas() {
    const dados = await listarAcoesPreventivas();
    setAcoesPreventivas(dados);
  }

  function calcularRisco(dataValidade) {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    const vencimento = new Date(`${dataValidade}T00:00:00`);

    const diferenca = Math.ceil((vencimento - hoje) / (1000 * 60 * 60 * 24));

    if (diferenca <= 3) return "Alto";
    if (diferenca <= 7) return "Médio";

    return "Baixo";
  }

  const produtosEmRisco = produtos.filter((produto) => {
    const lotesDoProduto = lotes.filter(
      (lote) => Number(lote.produtoId) === Number(produto.id),
    );

    return lotesDoProduto.some(
      (lote) =>
        Number(lote.quantidadeDisponivel) > 0 &&
        calcularRisco(lote.dataValidade) === "Alto",
    );
  });

  const lotesProximosVencimento = lotes.filter(
    (lote) =>
      Number(lote.quantidadeDisponivel) > 0 &&
      calcularRisco(lote.dataValidade) !== "Baixo",
  );

  const acoesPlanejadas = acoesPreventivas.filter(
    (acao) => acao.status === "PLANEJADA",
  );

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
          lotesProximosVencimento={lotesProximosVencimento.length}
          acoesPlanejadas={acoesPlanejadas.length}
        />

        <FormularioProduto
          nome={nome}
          setNome={setNome}
          categoriaId={categoriaId}
          setCategoriaId={setCategoriaId}
          categorias={categorias}
          cadastrarProduto={cadastrarProduto}
        />

        <FormularioLote
          produtos={produtos}
          produtoId={produtoId}
          setProdutoId={setProdutoId}
          codigoLote={codigoLote}
          setCodigoLote={setCodigoLote}
          quantidade={quantidade}
          setQuantidade={setQuantidade}
          custoUnitario={custoUnitario}
          setCustoUnitario={setCustoUnitario}
          dataEntrada={dataEntrada}
          setDataEntrada={setDataEntrada}
          dataValidade={dataValidade}
          setDataValidade={setDataValidade}
          cadastrarLote={cadastrarLote}
        />

        {produtoSelecionado ? (
          <DetalhesProduto
            produto={produtoSelecionado}
            lotes={lotes}
            calcularRisco={calcularRisco}
            voltar={() => setProdutoSelecionado(null)}
            atualizarLotes={atualizarLotes}
            atualizarAcoesPreventivas={atualizarAcoesPreventivas}
          />
        ) : (
          <ListaProdutos
            produtos={produtos}
            lotes={lotes}
            calcularRisco={calcularRisco}
            selecionarProduto={setProdutoSelecionado}
          />
        )}
      </main>
    </div>
  );
}

export default App;
