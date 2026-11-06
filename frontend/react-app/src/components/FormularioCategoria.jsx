function FormularioCategoria({
  nomeCategoria,
  setNomeCategoria,
  cadastrarCategoria,
  categoriaEmEdicao,
  atualizarCategoria,
  cancelarEdicao,
}) {
  return (
    <section className="lista">
      <h2>
        {categoriaEmEdicao ? "Editar categoria" : "Cadastrar categoria"}
      </h2>

      <form onSubmit={categoriaEmEdicao ? atualizarCategoria : cadastrarCategoria}>
        <label htmlFor="nomeCategoria">
          Nome da categoria
        </label>

        <input
          id="nomeCategoria"
          type="text"
          value={nomeCategoria}
          onChange={(e) => setNomeCategoria(e.target.value)}
          placeholder="Ex: Laticínios"
          required
        />

        <button type="submit">
          {categoriaEmEdicao ? "Salvar alterações" : "Cadastrar categoria"}
        </button>

        {categoriaEmEdicao && (
          <button type="button" onClick={cancelarEdicao}>
            Cancelar
          </button>
        )}
      </form>
    </section>
  );
}

export default FormularioCategoria;