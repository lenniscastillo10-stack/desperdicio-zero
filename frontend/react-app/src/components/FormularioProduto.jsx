function FormularioProduto({
  nome,
  setNome,
  quantidade,
  setQuantidade,
  validade,
  setValidade,
  cadastrarProduto
}) {
  return (
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
  )
}

export default FormularioProduto