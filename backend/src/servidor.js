import express from "express";
import categoriasRoutes from "./routes/categorias.js"
import produtosRoutes from "./routes/produtos.js";
import lotesRoutes from "./routes/lotes.js";
import acoesPreventivasRoutes from "./routes/acoesPreventivas.js";

const app = express();

app.use(express.json());

app.use("/categorias", categoriasRoutes);
app.use("/produtos", produtosRoutes);
app.use("/lotes", lotesRoutes);
app.use("/acoes-preventivas", acoesPreventivasRoutes);


app.get("/", (req, res) => {
  res.send("API Radar de Perdas funcionando!");
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});