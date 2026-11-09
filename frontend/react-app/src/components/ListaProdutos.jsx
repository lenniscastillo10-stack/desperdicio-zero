function ListaProdutos({
  produtos,
  lotes,
  calcularRisco,
  selecionarProduto,
  abrirFormularioProduto,
  removerProduto,
}) {
  function obterResumo(produto) {
    const lotesDoProduto = lotes.filter(
      (lote) => lote.produtoId === produto.id,
    );

    const lotesComEstoque = lotesDoProduto.filter(
      (lote) => lote.quantidadeDisponivel > 0,
    );

    const quantidadeTotal = lotesDoProduto.reduce(
      (total, lote) => total + lote.quantidadeDisponivel,
      0,
    );

    const lotesOrdenados = [...lotesComEstoque].sort((a, b) =>
      a.dataValidade.localeCompare(b.dataValidade),
    );

    const proximoVencimento = lotesOrdenados[0]?.dataValidade;

    const risco = proximoVencimento
      ? calcularRisco(proximoVencimento)
      : "Sem estoque";

    return {
      quantidadeTotal,
      quantidadeLotes: lotesDoProduto.length,
      proximoVencimento,
      risco,
    };
  }

  function formatarData(data) {
    if (!data) return "Não disponível";

    return new Date(`${data}T00:00:00`).toLocaleDateString("pt-BR");
  }

  return (
    <section className="lista">
      <div className="cabecalho-lista">
        <h2>Produtos cadastrados</h2>

        <button
          type="button"
          className="botao botao-primario"
          onClick={abrirFormularioProduto}
        >
          + Novo produto
        </button>
      </div>

      {produtos.length === 0 ? (
        <p>Nenhum produto cadastrado.</p>
      ) : (
        produtos.map((produto) => {
          const resumo = obterResumo(produto);

          return (
            <article key={produto.id} className="produto">
              <div className="produto-cabecalho">
                <h3>{produto.nome}</h3>

                <span
                  className={`risco risco-${resumo.risco.toLowerCase().replace(" ", "-")}`}
                >
                  {resumo.risco}
                </span>
              </div>

              <p>
                {resumo.quantidadeLotes} lotes · {resumo.quantidadeTotal}{" "}
                unidades disponíveis
              </p>

              <p>
                Próximo vencimento: {formatarData(resumo.proximoVencimento)}
              </p>

              <div className="rodape-produto">
                <button
                  type="button"
                  className="ver-detalhes"
                  onClick={() => selecionarProduto(produto)}
                >
                  Ver detalhes →
                </button>
                <button
                  type="button"
                  className="botao botao-perigo"
                  onClick={() => removerProduto(produto.id)}
                >
                  Excluir
                </button>
              </div>
            </article>
          );
        })
      )}
    </section>
  );
}

export default ListaProdutos;
