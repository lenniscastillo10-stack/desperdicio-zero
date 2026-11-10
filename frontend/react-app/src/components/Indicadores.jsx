function Indicadores({
  totalProdutos,
  produtosEmRisco,
  lotesProximosVencimento,
  acoesPlanejadas,
  valorEmRisco,
  perdasPorDescarte,
  perdasPorDescarteCentavos,
  valorEmRiscoCentavos,
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

      <article
        className={`cartao ${valorEmRiscoCentavos > 0 ? "cartao-risco" : ""}`}
      >
        <span>Valor financeiro em risco</span>

        <strong className={valorEmRiscoCentavos > 0 ? "valor-risco" : ""}>
          {valorEmRisco}
        </strong>
      </article>

      <article
        className={`cartao ${
          perdasPorDescarteCentavos > 0 ? "cartao-perda" : ""
        }`}
      >
        <span>Perdas estimadas por descarte</span>
        <strong className={perdasPorDescarteCentavos > 0 ? "valor-perda" : ""}>
          {perdasPorDescarte}
        </strong>
      </article>
    </section>
  );
}

export default Indicadores;
