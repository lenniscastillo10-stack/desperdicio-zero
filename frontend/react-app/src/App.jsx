import { useState, useEffect } from "react";
import "./App.css";

import Painel from "./pages/Painel";
import Indicadores from "./components/Indicadores";
import FormularioProduto from "./components/FormularioProduto";
import ListaProdutos from "./components/ListaProdutos";
import FormularioLote from "./components/FormularioLote";
import DetalhesProduto from "./components/DetalhesProduto";
import FormularioCategoria from "./components/FormularioCategoria";
import ListaCategorias from "./components/ListaCategorias";
import DetalhesCategoria from "./components/DetalhesCategoria";

import {
  listarCategorias,
  criarCategoria,
  buscarCategoriaPorId,
  atualizarCategoria,
  excluirCategoria,
} from "./services/categoriasService";
import {
  listarProdutos,
  criarProduto,
  atualizarProduto,
  excluirProduto,
} from "./services/produtosService";
import { listarLotes, criarLote, excluirLote } from "./services/lotesService";
import { listarAcoesPreventivas } from "./services/acaoPreventivaService";

function App() {
  const [nome, setNome] = useState("");
  const [produtos, setProdutos] = useState([]);
  const [produtoId, setProdutoId] = useState("");
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [produtoEmEdicao, setProdutoEmEdicao] = useState(null);
  const [formularioProdutoAberto, setFormularioProdutoAberto] = useState(false);

  const [categorias, setCategorias] = useState([]);
  const [categoriaId, setCategoriaId] = useState("");
  const [nomeCategoria, setNomeCategoria] = useState("");
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
  const [categoriaEmEdicao, setCategoriaEmEdicao] = useState(null);
  const [formularioCategoriaAberto, setFormularioCategoriaAberto] =
    useState(false);

  const [lotes, setLotes] = useState([]);
  const [codigoLote, setCodigoLote] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [custoUnitario, setCustoUnitario] = useState("");
  const [dataEntrada, setDataEntrada] = useState("");
  const [dataValidade, setDataValidade] = useState("");

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
      setFormularioProdutoAberto(false);

      alert("Produto cadastrado com sucesso!");
    } catch (erro) {
      alert(erro.message);
    }
  }

  function abrirFormularioProduto() {
    setNome("");
    setCategoriaId("");
    setFormularioProdutoAberto(true);
  }

  function voltarParaProdutos() {
    setFormularioProdutoAberto(false);
    setNome("");
    setCategoriaId("");
  }

  function editarProduto(produto) {
    setProdutoEmEdicao(produto);
    setNome(produto.nome);
    setCategoriaId(String(produto.categoriaId));
    setFormularioProdutoAberto(true);
    setProdutoSelecionado(null);

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function salvarEdicaoProduto(event) {
    event.preventDefault();

    if (!nome.trim() || !categoriaId) {
      alert("Preencha todos os campos.");
      return;
    }

    try {
      const produtoAtualizado = await atualizarProduto(produtoEmEdicao.id, {
        nome: nome.trim(),
        categoriaId: Number(categoriaId),
      });

      setProdutos((produtosAtuais) =>
        produtosAtuais.map((produto) =>
          produto.id === produtoAtualizado.id ? produtoAtualizado : produto,
        ),
      );

      setProdutoEmEdicao(null);
      setNome("");
      setCategoriaId("");
      setFormularioProdutoAberto(false);

      alert("Produto atualizado com sucesso!");
    } catch (erro) {
      alert(erro.message);
    }
  }

  async function removerProduto(id) {
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir este produto?",
    );

    if (!confirmar) return;

    try {
      await excluirProduto(id);

      setProdutos((produtosAtuais) =>
        produtosAtuais.filter((produto) => Number(produto.id) !== Number(id)),
      );

      if (Number(produtoSelecionado?.id) === Number(id)) {
        setProdutoSelecionado(null);
      }

      alert("Produto excluído com sucesso!");
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

    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    const entrada = new Date(`${dataEntrada}T00:00:00`);

    if (entrada > hoje) {
      alert("A data de entrada não pode ser futura.");
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

  async function removerLote(id) {
    const confirmar = window.confirm(
      "Tem certeza de que deseja excluir este lote?",
    );

    if (!confirmar) return;

    try {
      await excluirLote(id);

      setLotes((lotesAtuais) =>
        lotesAtuais.filter((lote) => Number(lote.id) !== Number(id)),
      );

      alert("Lote excluído com sucesso!");
    } catch (erro) {
      alert(erro.message);
    }
  }

  async function cadastrarCategoria(event) {
    event.preventDefault();

    if (!nomeCategoria.trim()) {
      alert("Informe o nome da categoria.");
      return;
    }

    try {
      const novaCategoria = await criarCategoria({
        nome: nomeCategoria.trim(),
      });

      setCategorias((categoriasAtuais) => [...categoriasAtuais, novaCategoria]);

      setNomeCategoria("");
      setFormularioCategoriaAberto(false);

      alert("Categoria cadastrada com sucesso!");
    } catch (erro) {
      alert(erro.message);
    }
  }

  async function selecionarCategoria(id) {
    try {
      const dados = await buscarCategoriaPorId(id);
      setCategoriaSelecionada(dados);
    } catch (erro) {
      alert(erro.message);
    }
  }

  async function salvarEdicaoCategoria(event) {
    event.preventDefault();

    if (!nomeCategoria.trim()) {
      alert("Informe o nome da categoria.");
      return;
    }

    try {
      const categoriaAtualizada = await atualizarCategoria(
        categoriaEmEdicao.id,
        {
          nome: nomeCategoria.trim(),
        },
      );

      setCategorias((categoriasAtuais) =>
        categoriasAtuais.map((categoria) =>
          categoria.id === categoriaEmEdicao.id
            ? categoriaAtualizada
            : categoria,
        ),
      );

      setCategoriaEmEdicao(null);
      setNomeCategoria("");
      setFormularioCategoriaAberto(false);

      alert("Categoria atualizada com sucesso!");
    } catch (erro) {
      alert(erro.message);
    }
  }

  function cancelarEdicaoCategoria() {
    setCategoriaEmEdicao(null);
    setNomeCategoria("");
  }

  function abrirFormularioCategoria() {
    setCategoriaEmEdicao(null);
    setNomeCategoria("");
    setFormularioCategoriaAberto(true);
  }

  function voltarParaCategorias() {
    setFormularioCategoriaAberto(false);
    setCategoriaEmEdicao(null);
    setNomeCategoria("");
  }

  async function removerCategoria(id) {
    const confirmar = window.confirm(
      "Tem certeza de que deseja excluir esta categoria?",
    );

    if (!confirmar) return;

    try {
      await excluirCategoria(id);

      setCategorias((categoriasAtuais) =>
        categoriasAtuais.filter((categoria) => categoria.id !== id),
      );

      alert("Categoria excluída com sucesso!");
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

        {categoriaSelecionada ? (
          <DetalhesCategoria
            categoria={categoriaSelecionada}
            voltar={() => setCategoriaSelecionada(null)}
          />
        ) : formularioCategoriaAberto ? (
          <FormularioCategoria
            nomeCategoria={nomeCategoria}
            setNomeCategoria={setNomeCategoria}
            cadastrarCategoria={cadastrarCategoria}
            categoriaEmEdicao={categoriaEmEdicao}
            atualizarCategoria={salvarEdicaoCategoria}
            cancelarEdicao={voltarParaCategorias}
          />
        ) : (
          <ListaCategorias
            categorias={categorias}
            selecionarCategoria={selecionarCategoria}
            editarCategoria={(categoria) => {
              setCategoriaEmEdicao(categoria);
              setNomeCategoria(categoria.nome);
              setFormularioCategoriaAberto(true);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            removerCategoria={removerCategoria}
            abrirFormularioCategoria={abrirFormularioCategoria}
          />
        )}

        {produtoSelecionado ? (
          <DetalhesProduto
            produto={produtoSelecionado}
            lotes={lotes}
            categorias={categorias}
            calcularRisco={calcularRisco}
            voltar={() => setProdutoSelecionado(null)}
            editarProduto={editarProduto}
            removerLote={removerLote}
            atualizarLotes={atualizarLotes}
            atualizarAcoesPreventivas={atualizarAcoesPreventivas}
          />
        ) : formularioProdutoAberto ? (
          <FormularioProduto
            nome={nome}
            setNome={setNome}
            categoriaId={categoriaId}
            setCategoriaId={setCategoriaId}
            categorias={categorias}
            cadastrarProduto={cadastrarProduto}
            produtoEmEdicao={produtoEmEdicao}
            atualizarProduto={salvarEdicaoProduto}
            cancelarEdicao={voltarParaProdutos}
          />
        ) : (
          <ListaProdutos
            produtos={produtos}
            lotes={lotes}
            calcularRisco={calcularRisco}
            selecionarProduto={setProdutoSelecionado}
            abrirFormularioProduto={abrirFormularioProduto}
            removerProduto={removerProduto}
          />
        )}

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
      </main>
    </div>
  );
}

export default App;
