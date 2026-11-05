import express from "express";
import categoriasRoutes from "./routes/categorias.js"
import produtosRoutes from "./routes/produtos.js";
import lotesRoutes from "./routes/lotes.js";
import acoesPreventivasRoutes from "./routes/acaoPreventiva.js";
import movimentacaoEstoqueRoutes from "./routes/movimentacaoEstoque.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/categorias", categoriasRoutes);
app.use("/produtos", produtosRoutes);
app.use("/lotes", lotesRoutes);
app.use("/acoes-preventivas", acoesPreventivasRoutes);
app.use("/movimentacao-estoque", movimentacaoEstoqueRoutes);

app.get("/", (req, res) => {
  res.send("API Radar de Perdas funcionando!");
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});