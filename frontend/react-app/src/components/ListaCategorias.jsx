function ListaCategorias({
  categorias,
  selecionarCategoria,
  editarCategoria,
  removerCategoria,
  abrirFormularioCategoria,
}) {
  return (
    <section className="lista">
      <div className="cabecalho-lista">
        <h2>Categorias cadastradas</h2>

        <button
          type="button"
          className="botao botao-primario"
          onClick={abrirFormularioCategoria}
        >
          + Nova categoria
        </button>
      </div>

      {categorias.length === 0 ? (
        <p>Nenhuma categoria cadastrada.</p>
      ) : (
        <div className="categorias-lista">
          {categorias.map((categoria) => (
            <article
              className="categoria-item"
              key={categoria.id}
              onClick={() => selecionarCategoria(categoria.id)}
            >
              <div>
                <h3>{categoria.nome}</h3>
                <p>Identificador: #{categoria.id}</p>
              </div>

              <div className="categoria-acoes">
                <span>Ver detalhes →</span>

                <button
                  type="button"
                  className="botao botao-secundario"
                  onClick={(event) => {
                    event.stopPropagation();
                    editarCategoria(categoria);
                  }}
                >
                  Editar
                </button>

                <button
                  type="button"
                  className="botao botao-perigo"
                  onClick={(event) => {
                    event.stopPropagation();
                    removerCategoria(categoria.id);
                  }}
                >
                  Excluir
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default ListaCategorias;
