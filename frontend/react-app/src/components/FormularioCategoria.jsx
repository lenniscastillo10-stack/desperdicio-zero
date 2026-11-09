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
      <h2>{categoriaEmEdicao ? "Editar categoria" : "Cadastrar categoria"}</h2>

      <form
        onSubmit={categoriaEmEdicao ? atualizarCategoria : cadastrarCategoria}
      >
        <label htmlFor="nomeCategoria">Nome da categoria</label>

        <input
          id="nomeCategoria"
          type="text"
          value={nomeCategoria}
          onChange={(e) => setNomeCategoria(e.target.value)}
          placeholder="Ex: Laticínios"
          required
        />
        <div className="acoes-formulario">
          <button className="botao botao-primario" type="submit">
            {categoriaEmEdicao ? "Salvar alterações" : "Cadastrar categoria"}
          </button>

          <button
            className="botao botao-secundario"
            type="button"
            onClick={cancelarEdicao}
          >
            Voltar para categorias
          </button>
        </div>
      </form>
    </section>
  );
}

export default FormularioCategoria;
