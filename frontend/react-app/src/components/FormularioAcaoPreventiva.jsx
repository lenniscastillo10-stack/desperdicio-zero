function FormularioAcaoPreventiva({
  lotes,
  acaoEmEdicao,
  loteId,
  setLoteId,
  tipoAcao,
  setTipoAcao,
  quantidadeAfetada,
  setQuantidadeAfetada,
  dataPlanejada,
  setDataPlanejada,
  observacoes,
  setObservacoes,
  registrarAcao,
  cancelar,
}) {
  return (
    <section className="lista">
      <h3>
        {acaoEmEdicao ? "Editar ação preventiva" : "Registrar ação preventiva"}
      </h3>

      <form onSubmit={registrarAcao}>
        <label htmlFor="loteAcao">Lote</label>
        <select
          id="loteAcao"
          value={loteId}
          onChange={(e) => setLoteId(e.target.value)}
          required
        >
          <option value="">Selecione um lote</option>

          {lotes.map((lote) => (
            <option key={lote.id} value={lote.id}>
              {lote.codigoLote || `Lote ${lote.id}`}
            </option>
          ))}
        </select>

        <label htmlFor="tipoAcao">Tipo de ação</label>
        <input
          id="tipoAcao"
          type="text"
          value={tipoAcao}
          onChange={(e) => setTipoAcao(e.target.value)}
          placeholder="Ex.: PROMOCAO"
          required
        />

        <label htmlFor="quantidadeAfetada">Quantidade afetada</label>
        <input
          id="quantidadeAfetada"
          type="number"
          min="1"
          value={quantidadeAfetada}
          onChange={(e) => setQuantidadeAfetada(e.target.value)}
          required
        />

        <label htmlFor="dataPlanejada">Data planejada</label>
        <input
          id="dataPlanejada"
          type="date"
          value={dataPlanejada}
          onChange={(e) => setDataPlanejada(e.target.value)}
          required
        />

        <label htmlFor="observacoesAcao">Observações (opcional)</label>
        <textarea
          id="observacoesAcao"
          value={observacoes}
          onChange={(e) => setObservacoes(e.target.value)}
        />
        <div className="acoes-formulario">
          <button className="botao botao-primario" type="submit">
            {acaoEmEdicao ? "Salvar alterações" : "Registrar ação"}
          </button>
          <button
            className="botao botao-secundario"
            type="button"
            onClick={cancelar}
          >
            {acaoEmEdicao ? "Cancelar edição" : "Voltar às ações"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default FormularioAcaoPreventiva;
