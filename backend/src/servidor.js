import express from "express";
import categoriasRoutes from "./routes/categorias.js"
import produtosRoutes from "./routes/produtos.js";

const app = express();

app.use(express.json());

app.use("/categorias", categoriasRoutes);
app.use("/produtos", produtosRoutes);

app.get("/", (req, res) => {
  res.send("API Radar de Perdas funcionando!");
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});