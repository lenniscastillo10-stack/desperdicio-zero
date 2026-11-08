function FormularioLote({
  produtos,
  produtoId,
  setProdutoId,
  codigoLote,
  setCodigoLote,
  quantidade,
  setQuantidade,
  custoUnitario,
  setCustoUnitario,
  dataEntrada,
  setDataEntrada,
  dataValidade,
  setDataValidade,
  cadastrarLote,
  loteEmEdicao,
  cancelarEdicao,
}) {
  return (
    <section className="lista">
      <h2>{loteEmEdicao ? "Editar lote" : "Cadastrar lote"}</h2>

      <form onSubmit={cadastrarLote}>
        <label htmlFor="produtoId">Produto</label>
        <select
          id="produtoId"
          value={produtoId}
          onChange={(e) => setProdutoId(e.target.value)}
          required
        >
          <option value="">Selecione um produto</option>

          {produtos.map((produto) => (
            <option key={produto.id} value={produto.id}>
              {produto.nome}
            </option>
          ))}
        </select>

        <label htmlFor="codigoLote">Código do lote (opcional)</label>
        <input
          id="codigoLote"
          type="text"
          value={codigoLote}
          onChange={(e) => setCodigoLote(e.target.value)}
        />

        <label htmlFor="quantidade">Quantidade inicial</label>
        <input
          id="quantidade"
          type="number"
          min="1"
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
          required
        />

        <label htmlFor="custoUnitario">Custo unitário (R$)</label>
        <input
          id="custoUnitario"
          type="number"
          min="0"
          step="0.01"
          value={custoUnitario}
          onChange={(e) => setCustoUnitario(e.target.value)}
          required
        />

        <label htmlFor="dataEntrada">Data de entrada</label>
        <input
          id="dataEntrada"
          type="date"
          value={dataEntrada}
          onChange={(e) => setDataEntrada(e.target.value)}
          required
        />

        <label htmlFor="dataValidade">Data de validade</label>
        <input
          id="dataValidade"
          type="date"
          value={dataValidade}
          onChange={(e) => setDataValidade(e.target.value)}
          required
        />

        <button type="submit">
          {loteEmEdicao ? "Salvar alterações" : "Cadastrar lote"}
        </button>

        {loteEmEdicao ? (
          <button type="button" onClick={cancelarEdicao}>
            Cancelar edição
          </button>
        ) : (
          <button type="button" onClick={cancelarEdicao}>
            Voltar aos lotes
          </button>
        )}
      </form>
    </section>
  );
}

export default FormularioLote;
