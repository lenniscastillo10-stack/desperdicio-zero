function Indicadores({
  totalProdutos,
  produtosEmRisco,
  lotesProximosVencimento,
  acoesPlanejadas,
}) {
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
        <span>Lotes próximos do vencimento</span>
        <strong>{lotesProximosVencimento}</strong>
      </article>

      <article className="cartao">
        <span>Ações preventivas planejadas</span>
        <strong>{acoesPlanejadas}</strong>
      </article>
    </section>
  );
}

export default Indicadores;