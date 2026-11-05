function ListaProdutos({ produtos, calcularRisco }) {
  return (
    <section className="lista">
      <h2>Radar de produtos</h2>

      {produtos.length === 0 ? (
        <p>Nenhum produto cadastrado ainda.</p>
      ) : (
        <ul>
          {produtos.map((produto) => (
            <li key={produto.id} className="produto-item">
              <div>
                <strong>{produto.nome}</strong>
                <p>Quantidade: {produto.quantidade}</p>
              </div>

              <span
                className={`risco risco-${calcularRisco(produto.validade).toLowerCase()}`}
              >
                Risco: {calcularRisco(produto.validade)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default ListaProdutos