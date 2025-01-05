require("dotenv").config();
const express = require("express");
const cors = require("cors");
const requestProductsRoutes = require("./routes/requestProductsRoutes");

const app = express();

// Configuração do CORS
const corsOptions = {
  origin: "*", // Permite qualquer origem (para maior segurança, pode ser alterado para um domínio específico)
  methods: "GET,POST,PUT,DELETE", // Métodos permitidos
  allowedHeaders: "Content-Type,Authorization", // Cabeçalhos permitidos
};

app.use(cors(corsOptions));
app.use(express.json());

// Prefixando as rotas com '/api'
app.use("/api", requestProductsRoutes);

// Exportando o handler para o Vercel
module.exports = app;
