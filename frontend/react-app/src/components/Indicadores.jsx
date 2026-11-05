function Indicadores({ totalProdutos, produtosEmRisco }) {
  return (
    <section className="indicadores">
      <article className="cartao">
        <span>Produtos cadastrados</span>
        <strong>{totalProdutos}</strong>
      </article>

      <article className="cartao">
        <span>Produtos em risco</span>
        <strong>{produtosEmRisco}</strong>
      </article>

      <article className="cartao">
        <span>Perdas evitadas</span>
        <strong>0</strong>
      </article>
    </section>
  )
}

export default Indicadores