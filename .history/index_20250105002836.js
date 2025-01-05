require("dotenv").config();
const express = require("express");
const { createClient } = require("@supabase/supabase-js");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

app.get("/api/request-products", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("viewbaseRequest")
      .select("*")
      .order("numero_request", { ascending: false });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar dados" });
  }
});
app.delete("/api/request-products/delete/:id", async (req, res) => {
  const { id } = req.params;
  console.log("id", id);
  try {
    const { error } = await supabase.from("base_request").delete().eq("id", id);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.json({ message: "Registro deletado com sucesso" });
  } catch (err) {
    res.status(500).json({ error: "Erro ao deletar registro" });
  }
});
app.get("/api/request-products/productsgeral", async (req, res) => {
    try {
      const { data, error } = await supabase
        .from("base_produ")
        .select("*")
        .order("numero_request", { ascending: false });
  
      if (error) {
        return res.status(500).json({ error: error.message });
      }
  
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: "Erro ao buscar dados" });
    }
  });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
