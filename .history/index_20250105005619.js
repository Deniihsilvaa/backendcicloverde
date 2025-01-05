require("dotenv").config();
const express = require("express");
const cors = require("cors");
const requestProductsRoutes = require("./routes/requestProductsRoutes");

const app = express();
app.use(cors());
app.use(express.json());
const Redis = require("ioredis");
const redis = new Redis();  // Conecta ao Redis rodando localmente

// Rotas
app.use(requestProductsRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
