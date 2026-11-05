function ListaLotes({ lotes, produtos, calcularRisco }) {
  function formatarData(data) {
    return new Date(`${data}T00:00:00`).toLocaleDateString('pt-BR')
  }

  function formatarMoeda(centavos) {
    return (centavos / 100).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })
  }

  function obterNomeProduto(produtoId) {
    const produto = produtos.find(
      (produto) => produto.id === produtoId
    )

    return produto ? produto.nome : 'Produto não encontrado'
  }

  return (
    <section className="lista">
      <h2>Lotes cadastrados</h2>

      {lotes.length === 0 ? (
        <p>Nenhum lote cadastrado.</p>
      ) : (
        <ul>
          {lotes.map((lote) => {
            const risco = calcularRisco(lote.dataValidade)

            return (
              <li key={lote.id} className="produto">
                <h3>{obterNomeProduto(lote.produtoId)}</h3>

                <p>
                  Código: {lote.codigoLote || 'Não informado'}
                </p>

                <p>
                  Quantidade disponível: {lote.quantidadeDisponivel}
                </p>

                <p>
                  Custo unitário: {formatarMoeda(lote.custoUnitarioCentavos)}
                </p>

                <p>
                  Data de entrada: {formatarData(lote.dataEntrada)}
                </p>

                <p>
                  Data de validade: {formatarData(lote.dataValidade)}
                </p>

                <p>
                  Risco de vencimento: <strong>{risco}</strong>
                </p>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}

export default ListaLotes