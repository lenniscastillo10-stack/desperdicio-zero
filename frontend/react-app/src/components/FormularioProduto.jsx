function FormularioProduto({
  nome,
  setNome,
  categoriaId,
  setCategoriaId,
  categorias,
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
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Ex: Leite Integral 1L"
          required
        />

        <label htmlFor="categoriaId">Categoria</label>
        <select
          id="categoriaId"
          value={categoriaId}
          onChange={(e) => setCategoriaId(e.target.value)}
          required
        >
          <option value="">Selecione uma categoria</option>

          {categorias.map((categoria) => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.nome}
            </option>
          ))}
        </select>

        <button type="submit">Cadastrar produto</button>
      </form>
    </section>
  )
}

export default FormularioProduto