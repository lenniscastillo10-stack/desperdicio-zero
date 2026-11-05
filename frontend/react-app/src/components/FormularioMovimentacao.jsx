function FormularioMovimentacao({
  lotes,
  loteId,
  setLoteId,
  tipo,
  setTipo,
  quantidade,
  setQuantidade,
  data,
  setData,
  observacoes,
  setObservacoes,
  registrarMovimentacao
}) {
  return (
    <section className="lista">
      <h3>Registrar movimentação</h3>

      <form onSubmit={registrarMovimentacao}>
        <label htmlFor="loteId">Lote</label>

        <select
          id="loteId"
          value={loteId}
          onChange={(e) => setLoteId(e.target.value)}
          required
        >
          <option value="">Selecione um lote</option>

          {lotes.map((lote) => (
            <option key={lote.id} value={lote.id}>
              {lote.codigoLote || `Lote ${lote.id}`}
              {' — '}
              {lote.quantidadeDisponivel} disponíveis
            </option>
          ))}
        </select>

        <label htmlFor="tipo">Tipo de movimentação</label>

        <select
          id="tipo"
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          required
        >
          <option value="">Selecione o tipo</option>
          <option value="ENTRADA">Entrada</option>
          <option value="VENDA">Venda</option>
          <option value="DESCARTE">Descarte</option>
          <option value="AJUSTE_ENTRADA">Ajuste de entrada</option>
          <option value="AJUSTE_SAIDA">Ajuste de saída</option>
        </select>

        <label htmlFor="quantidadeMovimentacao">Quantidade</label>

        <input
          id="quantidadeMovimentacao"
          type="number"
          min="1"
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
          required
        />

        <label htmlFor="dataMovimentacao">Data</label>

        <input
          id="dataMovimentacao"
          type="date"
          value={data}
          onChange={(e) => setData(e.target.value)}
          required
        />

        <label htmlFor="observacoes">Observações (opcional)</label>

        <textarea
          id="observacoes"
          value={observacoes}
          onChange={(e) => setObservacoes(e.target.value)}
        />

        <button type="submit">
          Registrar movimentação
        </button>
      </form>
    </section>
  )
}

export default FormularioMovimentacao