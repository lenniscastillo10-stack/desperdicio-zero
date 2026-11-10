import { useState, useEffect } from "react";
import FormularioMovimentacao from "./FormularioMovimentacao";
import FormularioAcaoPreventiva from "./FormularioAcaoPreventiva";
import FormularioLote from "./FormularioLote";
import {
  listarMovimentacoes,
  criarMovimentacao,
  atualizarMovimentacao,
  excluirMovimentacao,
} from "../services/movimentacaoEstoqueService";
import {
  listarAcoesPreventivas,
  criarAcaoPreventiva,
  atualizarAcaoPreventiva,
  excluirAcaoPreventiva,
} from "../services/acaoPreventivaService";

function DetalhesProduto({
  produto,
  lotes,
  categorias,
  calcularRisco,
  voltar,
  editarProduto,
  removerLote,
  editarLote,
  abrirFormularioLote,
  atualizarLotes,
  atualizarAcoesPreventivas,
  atualizarMovimentacoes,

  produtos,
  produtoId,
  setProdutoId,
  codigoLote,
  setCodigoLote,
  quantidade: quantidadeLote,
  setQuantidade: setQuantidadeLote,
  custoUnitario,
  setCustoUnitario,
  dataEntrada,
  setDataEntrada,
  dataValidade,
  setDataValidade,
  cadastrarLote,
  loteEmEdicao,
  cancelarEdicao,
  formularioLoteAberto,
  setFormularioLoteAberto,
}) {
  const [movimentacoes, setMovimentacoes] = useState([]);
  const [loteId, setLoteId] = useState("");
  const [tipo, setTipo] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [data, setData] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [acoesPreventivas, setAcoesPreventivas] = useState([]);
  const [loteIdAcao, setLoteIdAcao] = useState("");
  const [tipoAcao, setTipoAcao] = useState("");
  const [quantidadeAfetada, setQuantidadeAfetada] = useState("");
  const [dataPlanejada, setDataPlanejada] = useState("");
  const [observacoesAcao, setObservacoesAcao] = useState("");
  const [formularioMovimentacaoAberto, setFormularioMovimentacaoAberto] =
    useState(false);
  const [formularioAcaoAberto, setFormularioAcaoAberto] = useState(false);
  const [acaoEmEdicao, setAcaoEmEdicao] = useState(null);
  const [movimentacaoEmEdicao, setMovimentacaoEmEdicao] = useState(null);

  const categoriaDoProduto = (categorias || []).find(
    (categoria) => Number(categoria.id) === Number(produto.categoriaId),
  );

  useEffect(() => {
    async function carregarMovimentacoes() {
      try {
        const dados = await listarMovimentacoes();
        setMovimentacoes(dados);
      } catch (erro) {
        console.error("Erro ao carregar movimentações:", erro.message);
      }
    }

    carregarMovimentacoes();
  }, []);

  useEffect(() => {
    if (!formularioMovimentacaoAberto) return;

    document.getElementById("formulario-movimentacao")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [formularioMovimentacaoAberto]);

  useEffect(() => {
    async function carregarAcoes() {
      try {
        const dados = await listarAcoesPreventivas();
        setAcoesPreventivas(dados);
      } catch (erro) {
        console.error("Erro ao carregar ações preventivas:", erro.message);
      }
    }

    carregarAcoes();
  }, []);

  useEffect(() => {
    if (formularioAcaoAberto) {
      document.getElementById("formulario-acao")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [formularioAcaoAberto]);

  const lotesDoProduto = lotes
    .filter((lote) => Number(lote.produtoId) === Number(produto.id))
    .sort((a, b) => a.dataValidade.localeCompare(b.dataValidade));

  const idsDosLotes = lotesDoProduto.map((lote) => Number(lote.id));

  const movimentacoesDoProduto = movimentacoes
    .filter((movimentacao) => idsDosLotes.includes(Number(movimentacao.loteId)))
    .sort((a, b) => new Date(b.data) - new Date(a.data));

  const acoesPreventivasDoProduto = acoesPreventivas
    .filter((acao) => idsDosLotes.includes(Number(acao.loteId)))
    .sort((a, b) => new Date(b.dataPlanejada) - new Date(a.dataPlanejada));

  function formatarData(data) {
    if (!data) return "Não informada";

    const dataSemHorario = data.split("T")[0];
    const [ano, mes, dia] = dataSemHorario.split("-");

    return `${dia}/${mes}/${ano}`;
  }

  function formatarMoeda(centavos) {
    return (centavos / 100).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  function cancelarMovimentacao() {
    setLoteId("");
    setTipo("");
    setQuantidade("");
    setData("");
    setObservacoes("");
    setFormularioMovimentacaoAberto(false);
    setMovimentacaoEmEdicao(null);
  }

  function editarMovimentacao(movimentacao) {
    setMovimentacaoEmEdicao(movimentacao);
    setLoteId(String(movimentacao.loteId));
    setTipo(movimentacao.tipo);
    setQuantidade(String(movimentacao.quantidade));
    setData(movimentacao.data);
    setObservacoes(movimentacao.observacoes || "");
    setFormularioMovimentacaoAberto(true);
  }

  function abrirFormularioMovimentacao() {
    setMovimentacaoEmEdicao(null);
    setLoteId("");
    setTipo("");
    setQuantidade("");
    setData("");
    setObservacoes("");
    setFormularioMovimentacaoAberto(true);
    rolarParaFormularioMovimentacao();
  }

  async function registrarMovimentacao(event) {
    event.preventDefault();

    if (!loteId || !tipo || !quantidade || !data) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    try {
      if (movimentacaoEmEdicao) {
        const movimentacaoAtualizada = await atualizarMovimentacao(
          movimentacaoEmEdicao.id,

          {
            loteId: Number(loteId),
            tipo,
            quantidade: Number(quantidade),
            data,
            observacoes: observacoes.trim() || null,
          },
        );

        setMovimentacoes((movimentacoesAtuais) =>
          movimentacoesAtuais.map((item) =>
            item.id === movimentacaoAtualizada.id
              ? movimentacaoAtualizada
              : item,
          ),
        );

        alert("Movimentação atualizada com sucesso!");
      } else {
        const novaMovimentacao = await criarMovimentacao({
          loteId: Number(loteId),
          tipo,
          quantidade: Number(quantidade),
          data,
          observacoes: observacoes.trim() || null,
        });

        setMovimentacoes((movimentacoesAtuais) => [
          ...movimentacoesAtuais,
          novaMovimentacao,
        ]);

        alert("Movimentação registrada com sucesso!");
      }

      cancelarMovimentacao();

      if (atualizarLotes) {
        await atualizarLotes();
      }

      if (atualizarMovimentacoes) {
        await atualizarMovimentacoes();
      }
    } catch (erro) {
      alert(erro.message);
    }
  }

  async function removerMovimentacao(movimentacao) {
    const confirmar = window.confirm(
      "Tem certeza de que deseja excluir esta movimentação?",
    );

    if (!confirmar) return;

    try {
      await excluirMovimentacao(movimentacao.id);

      setMovimentacoes((movimentacoesAtuais) =>
        movimentacoesAtuais.filter((item) => item.id !== movimentacao.id),
      );

      if (atualizarLotes) {
        await atualizarLotes();
      }

      if (atualizarMovimentacoes) {
        await atualizarMovimentacoes();
      }

      alert("Movimentação excluída com sucesso!");
    } catch (erro) {
      alert(erro.message || "Erro ao excluir movimentação.");
    }
  }

  function abrirFormularioAcao() {
    setLoteIdAcao("");
    setTipoAcao("");
    setQuantidadeAfetada("");
    setDataPlanejada("");
    setObservacoesAcao("");

    setFormularioAcaoAberto(true);
  }

  function editarAcao(acao) {
    setAcaoEmEdicao(acao);
    setLoteIdAcao(String(acao.loteId));
    setTipoAcao(acao.tipoAcao);
    setQuantidadeAfetada(String(acao.quantidadeAfetada));
    setDataPlanejada(acao.dataPlanejada);
    setObservacoesAcao(acao.observacoes || "");
    setFormularioAcaoAberto(true);
    rolarParaFormularioAcao();
  }

  function cancelarAcao() {
    setLoteIdAcao("");
    setTipoAcao("");
    setQuantidadeAfetada("");
    setDataPlanejada("");
    setObservacoesAcao("");
    setFormularioAcaoAberto(false);
    setAcaoEmEdicao(null);
  }

  async function registrarAcao(event) {
    event.preventDefault();

    if (
      !loteIdAcao ||
      !tipoAcao.trim() ||
      !quantidadeAfetada ||
      !dataPlanejada
    ) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    try {
      if (acaoEmEdicao) {
        const acaoAtualizada = await atualizarAcaoPreventiva(acaoEmEdicao.id, {
          loteId: Number(loteIdAcao),
          tipoAcao: tipoAcao.trim(),
          quantidadeAfetada: Number(quantidadeAfetada),
          status: acaoEmEdicao.status,
          dataPlanejada,
          dataRealizada: acaoEmEdicao.dataRealizada,
          observacoes: observacoesAcao.trim() || null,
        });

        setAcoesPreventivas((atuais) =>
          atuais.map((item) =>
            item.id === acaoAtualizada.id ? acaoAtualizada : item,
          ),
        );

        alert("Ação preventiva atualizada com sucesso!");
      } else {
        const novaAcao = await criarAcaoPreventiva({
          loteId: Number(loteIdAcao),
          tipoAcao: tipoAcao.trim(),
          quantidadeAfetada: Number(quantidadeAfetada),
          dataPlanejada,
          observacoes: observacoesAcao.trim() || null,
        });

        setAcoesPreventivas((atuais) => [...atuais, novaAcao]);

        alert("Ação preventiva registrada com sucesso!");
      }

      if (atualizarAcoesPreventivas) {
        await atualizarAcoesPreventivas();
      }

      cancelarAcao();
    } catch (erro) {
      alert(erro.message);
    }
  }

  async function atualizarStatusAcao(acao, novoStatus) {
    const hoje = new Date();

    const dataAtual = [
      hoje.getFullYear(),
      String(hoje.getMonth() + 1).padStart(2, "0"),
      String(hoje.getDate()).padStart(2, "0"),
    ].join("-");

    const dataRealizada = novoStatus === "CONCLUIDA" ? dataAtual : null;

    try {
      const acaoAtualizada = await atualizarAcaoPreventiva(acao.id, {
        loteId: Number(acao.loteId),
        tipoAcao: acao.tipoAcao,
        quantidadeAfetada: Number(acao.quantidadeAfetada),
        status: novoStatus,
        dataPlanejada: acao.dataPlanejada,
        dataRealizada,
        observacoes: acao.observacoes,
      });

      setAcoesPreventivas((atuais) =>
        atuais.map((item) => (item.id === acao.id ? acaoAtualizada : item)),
      );

      if (atualizarAcoesPreventivas) {
        await atualizarAcoesPreventivas();
      }

      alert("Status da ação atualizado com sucesso!");
    } catch (erro) {
      alert(erro.message);
    }
  }

  async function removerAcao(acao) {
    const confirmar = window.confirm(
      "Tem certeza de que deseja excluir esta ação preventiva?",
    );

    if (!confirmar) return;

    try {
      await excluirAcaoPreventiva(acao.id);

      setAcoesPreventivas((estadoAtual) =>
        estadoAtual.filter((item) => item.id !== acao.id),
      );

      if (atualizarAcoesPreventivas) {
        await atualizarAcoesPreventivas();
      }

      alert("Ação preventiva excluída com sucesso!");
    } catch (erro) {
      alert(erro.message || "Erro ao excluir ação preventiva.");
    }
  }

  function rolarParaFormularioMovimentacao() {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.getElementById("formulario-movimentacao")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    });
  }

  function rolarParaFormularioAcao() {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.getElementById("formulario-acao")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    });
  }

  return (
    <section className="lista">
      <div className="barra-detalhes">
        <button
          type="button"
          className="botao botao-secundario"
          onClick={voltar}
        >
          ← Voltar aos produtos
        </button>

        <div className="acoes-detalhes">
          <button
            type="button"
            className="botao botao-secundario"
            onClick={() => editarProduto(produto)}
          >
            Editar produto
          </button>

          <button
            type="button"
            className="botao botao-primario"
            onClick={abrirFormularioAcao}
          >
            + Ação preventiva
          </button>

          <button
            type="button"
            className="botao botao-primario"
            onClick={abrirFormularioMovimentacao}
          >
            + Movimentação do estoque
          </button>
        </div>
      </div>

      <div className="produto-cabecalho">
        <h2>{produto.nome}</h2>
      </div>

      <p>Categoria: {categoriaDoProduto?.nome || "Não identificada"}</p>

      <div className="cabecalho-lotes">
        <h3>Lotes cadastrados</h3>

        <button
          type="button"
          className="botao botao-primario"
          onClick={abrirFormularioLote}
        >
          + Novo lote
        </button>
      </div>

      {formularioLoteAberto && (
        <div id="formulario-lote">
          <FormularioLote
            produtos={produtos}
            produtoId={produtoId}
            setProdutoId={setProdutoId}
            codigoLote={codigoLote}
            setCodigoLote={setCodigoLote}
            quantidade={quantidadeLote}
            setQuantidade={setQuantidadeLote}
            custoUnitario={custoUnitario}
            setCustoUnitario={setCustoUnitario}
            dataEntrada={dataEntrada}
            setDataEntrada={setDataEntrada}
            dataValidade={dataValidade}
            setDataValidade={setDataValidade}
            cadastrarLote={cadastrarLote}
            loteEmEdicao={loteEmEdicao}
            cancelarEdicao={cancelarEdicao}
          />
        </div>
      )}

      {lotesDoProduto.length === 0 ? (
        <p>Este produto ainda não possui lotes.</p>
      ) : (
        lotesDoProduto.map((lote) => (
          <article className="produto" key={lote.id}>
            <h3>Lote: {lote.codigoLote || "Não informado"}</h3>

            <p>Quantidade disponível: {lote.quantidadeDisponivel}</p>

            <p>Custo unitário: {formatarMoeda(lote.custoUnitarioCentavos)}</p>

            <p>Data de entrada: {formatarData(lote.dataEntrada)}</p>

            <p>Data de validade: {formatarData(lote.dataValidade)}</p>

            <p>
              Risco: <strong>{calcularRisco(lote.dataValidade)}</strong>
            </p>

            <div className="botoes-lotes">
              <button
                type="button"
                className="botao botao-secundario"
                onClick={() => editarLote(lote)}
              >
                Editar
              </button>

              <button
                type="button"
                className="botao botao-perigo"
                onClick={() => removerLote(lote.id)}
              >
                Excluir
              </button>
            </div>
          </article>
        ))
      )}

      {formularioMovimentacaoAberto && (
        <div id="formulario-movimentacao">
          <FormularioMovimentacao
            lotes={lotesDoProduto}
            movimentacaoEmEdicao={movimentacaoEmEdicao}
            loteId={loteId}
            setLoteId={setLoteId}
            tipo={tipo}
            setTipo={setTipo}
            quantidade={quantidade}
            setQuantidade={setQuantidade}
            data={data}
            setData={setData}
            observacoes={observacoes}
            setObservacoes={setObservacoes}
            registrarMovimentacao={registrarMovimentacao}
            cancelar={cancelarMovimentacao}
          />
        </div>
      )}

      {formularioAcaoAberto && (
        <div id="formulario-acao">
          <FormularioAcaoPreventiva
            lotes={lotesDoProduto}
            acaoEmEdicao={acaoEmEdicao}
            loteId={loteIdAcao}
            setLoteId={setLoteIdAcao}
            tipoAcao={tipoAcao}
            setTipoAcao={setTipoAcao}
            quantidadeAfetada={quantidadeAfetada}
            setQuantidadeAfetada={setQuantidadeAfetada}
            dataPlanejada={dataPlanejada}
            setDataPlanejada={setDataPlanejada}
            observacoes={observacoesAcao}
            setObservacoes={setObservacoesAcao}
            registrarAcao={registrarAcao}
            cancelar={cancelarAcao}
          />
        </div>
      )}

      <h3>Histórico de movimentações e ações preventivas</h3>

      {movimentacoesDoProduto.length === 0 &&
      acoesPreventivasDoProduto.length === 0 ? (
        <p>
          Este produto ainda não possui movimentações nem ações preventivas.
        </p>
      ) : (
        <>
          {movimentacoesDoProduto.length > 0 && (
            <>
              <h4>Movimentações</h4>

              {movimentacoesDoProduto.map((movimentacao) => {
                const loteRelacionado = lotesDoProduto.find(
                  (lote) => Number(lote.id) === Number(movimentacao.loteId),
                );

                return (
                  <article className="produto" key={movimentacao.id}>
                    <h4>{movimentacao.tipo.replaceAll("_", " ")}</h4>

                    <p>Quantidade: {movimentacao.quantidade}</p>
                    <p>Data: {formatarData(movimentacao.data)}</p>

                    <p>
                      Lote:{" "}
                      {loteRelacionado?.codigoLote ||
                        `Lote ${movimentacao.loteId}`}
                    </p>

                    {movimentacao.observacoes && (
                      <p>Observações: {movimentacao.observacoes}</p>
                    )}

                    <div className="botoes-lotes">
                      <button
                        type="button"
                        className="botao botao-secundario"
                        onClick={() => editarMovimentacao(movimentacao)}
                      >
                        Editar
                      </button>

                      <button
                        type="button"
                        className="botao botao-perigo"
                        onClick={() => removerMovimentacao(movimentacao)}
                      >
                        Excluir
                      </button>
                    </div>
                  </article>
                );
              })}
            </>
          )}

          {acoesPreventivasDoProduto.length > 0 && (
            <>
              <h4>Ações preventivas</h4>

              {acoesPreventivasDoProduto.map((acao) => (
                <article className="produto" key={acao.id}>
                  <h4>{acao.tipoAcao}</h4>

                  <p>Quantidade afetada: {acao.quantidadeAfetada}</p>
                  <p>Status: {acao.status}</p>
                  <label htmlFor={`status-${acao.id}`}>Atualizar status:</label>

                  <select
                    id={`status-${acao.id}`}
                    value={acao.status}
                    onChange={(e) => atualizarStatusAcao(acao, e.target.value)}
                  >
                    <option value="PLANEJADA">Planejada</option>
                    <option value="CONCLUIDA">Concluída</option>
                    <option value="CANCELADA">Cancelada</option>
                  </select>
                  <p>Data planejada: {formatarData(acao.dataPlanejada)}</p>

                  {acao.dataRealizada && (
                    <p>Data realizada: {formatarData(acao.dataRealizada)}</p>
                  )}

                  {acao.observacoes && <p>Observações: {acao.observacoes}</p>}

                  <div className="botoes-lotes">
                    <button
                      type="button"
                      className="botao botao-secundario"
                      onClick={() => editarAcao(acao)}
                    >
                      Editar
                    </button>

                    <button
                      type="button"
                      className="botao botao-perigo"
                      onClick={() => removerAcao(acao)}
                    >
                      Excluir
                    </button>
                  </div>
                </article>
              ))}
            </>
          )}
        </>
      )}
    </section>
  );
}

export default DetalhesProduto;
