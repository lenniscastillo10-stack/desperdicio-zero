import express from "express";
import categoriasRoutes from "./routes/categorias.js"

const app = express();

app.use(express.json());

app.use("/categorias", categoriasRoutes);

app.get("/", (req, res) => {
  res.send("API Radar de Perdas funcionando!");
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});