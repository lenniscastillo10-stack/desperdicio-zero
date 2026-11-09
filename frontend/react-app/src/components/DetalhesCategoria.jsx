function formatarData(data) {
  if (!data) return "Não informada";

  const [ano, mes, dia] = data.slice(0, 10).split("-");
  return `${dia}/${mes}/${ano}`;
}

function formatarMoeda(valorEmCentavos) {
  return (Number(valorEmCentavos) / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function DetalhesCategoria({ categoria, voltar }) {
  return (
    <section className="lista detalhes-categoria">
      <div className="barra-detalhes">
        <button
          type="button"
          className="botao botao-secundario"
          onClick={voltar}
        >
          ← Voltar às categorias
        </button>
      </div>

      <h2>{categoria.nome}</h2>
      <p>Identificador: #{categoria.id}</p>

      <h3>Produtos cadastrados</h3>

      {categoria.produtos?.length === 0 ? (
        <p>Nenhum produto cadastrado nesta categoria.</p>
      ) : (
        categoria.produtos?.map((produto) => (
          <article key={produto.id} className="categoria-produto">
            <h3>{produto.nome}</h3>
            <p>Produto #{produto.id}</p>

            <h4>Lotes</h4>

            {produto.lotes?.length === 0 ? (
              <p>Nenhum lote cadastrado.</p>
            ) : (
              produto.lotes?.map((lote) => (
                <div key={lote.id} className="categoria-lote">
                  <h4>Lote: {lote.codigoLote || `#${lote.id}`}</h4>

                  <p>Quantidade inicial: {lote.quantidadeInicial}</p>
                  <p>Quantidade disponível: {lote.quantidadeDisponivel}</p>
                  <p>
                    Custo unitário: {formatarMoeda(lote.custoUnitarioCentavos)}
                  </p>
                  <p>Entrada: {formatarData(lote.dataEntrada)}</p>
                  <p>Validade: {formatarData(lote.dataValidade)}</p>

                  <h4>Ações preventivas</h4>

                  {lote.acoesPreventivas?.length === 0 ? (
                    <p>Nenhuma ação preventiva registrada.</p>
                  ) : (
                    lote.acoesPreventivas?.map((acao) => (
                      <div key={acao.id} className="categoria-registro">
                        <p>Tipo: {acao.tipoAcao}</p>
                        <p>Status: {acao.status}</p>
                        <p>Quantidade afetada: {acao.quantidadeAfetada}</p>
                        <p>
                          Data planejada: {formatarData(acao.dataPlanejada)}
                        </p>
                        <p>
                          Data realizada: {formatarData(acao.dataRealizada)}
                        </p>
                        {acao.observacoes && (
                          <p>Observações: {acao.observacoes}</p>
                        )}
                      </div>
                    ))
                  )}

                  <h4>Movimentações de estoque</h4>

                  {lote.movimentacoes?.length === 0 ? (
                    <p>Nenhuma movimentação registrada.</p>
                  ) : (
                    lote.movimentacoes?.map((movimentacao) => (
                      <div key={movimentacao.id} className="categoria-registro">
                        <p>Tipo: {movimentacao.tipo}</p>
                        <p>Quantidade: {movimentacao.quantidade}</p>
                        <p>Data: {formatarData(movimentacao.data)}</p>
                        {movimentacao.observacoes && (
                          <p>Observações: {movimentacao.observacoes}</p>
                        )}
                      </div>
                    ))
                  )}
                </div>
              ))
            )}
          </article>
        ))
      )}
    </section>
  );
}

export default DetalhesCategoria;
