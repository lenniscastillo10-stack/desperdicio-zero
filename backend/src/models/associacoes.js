import Categoria from "./Categorias.js";
import Produto from "./Produtos.js";
import Lote from "./Lotes.js";
import AcaoPreventiva from "./AcaoPreventiva.js";
import MovimentacaoEstoque from "./MovimentacaoEstoque.js";

Categoria.hasMany(Produto, {
  foreignKey: "categoriaId",
  as: "produtos"
});

Produto.belongsTo(Categoria, {
  foreignKey: "categoriaId",
  as: "categoria"
});

Produto.hasMany(Lote, {
  foreignKey: "produtoId",
  as: "lotes"
});

Lote.belongsTo(Produto, {
  foreignKey: "produtoId",
  as: "produto"
});

Lote.hasMany(AcaoPreventiva, {
  foreignKey: "loteId",
  as: "acoesPreventivas"
});

AcaoPreventiva.belongsTo(Lote, {
  foreignKey: "loteId",
  as: "lote"
});

Lote.hasMany(MovimentacaoEstoque, {
  foreignKey: "loteId",
  as: "movimentacoes"
});

MovimentacaoEstoque.belongsTo(Lote, {
  foreignKey: "loteId",
  as: "lote"
});

AcaoPreventiva.hasMany(MovimentacaoEstoque, {
  foreignKey: "acaoPreventivaId",
  as: "movimentacoes"
});

MovimentacaoEstoque.belongsTo(AcaoPreventiva, {
  foreignKey: "acaoPreventivaId",
  as: "acaoPreventiva"
});