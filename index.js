require("dotenv").config();
const express = require("express");
const cors = require("cors");
const requestProductsRoutes = require("./routes/requestProductsRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// Rotas
app.use(requestProductsRoutes);

// Exportando o handler para o Vercel
module.exports = app;
