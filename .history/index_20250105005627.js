require("dotenv").config();
const express = require("express");
const cors = require("cors");
const requestProductsRoutes = require("./routes/requestProductsRoutes");
const Redis = require("ioredis");
const redis = new Redis();  

const app = express();
app.use(cors());
app.use(express.json());

// Rotas
app.use(requestProductsRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
