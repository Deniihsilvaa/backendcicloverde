require("dotenv").config();
const express = require("express");
const cors = require("cors");
const requestProductsRoutes = require("./routes/requestProductsRoutes");

const app = express();
const corsOptions = {
    origin: "*", // Permite qualquer origem. Alterar para uma URL específica para maior segurança.
    methods: "GET,POST,PUT,DELETE", // Métodos permitidos
    allowedHeaders: "Content-Type,Authorization", // Cabeçalhos permitidos
  };

app.use(cors(corsOptions));
app.use(express.json());

// Rotas
app.use(requestProductsRoutes);

// Exportando o handler para o Vercel
module.exports = app;
