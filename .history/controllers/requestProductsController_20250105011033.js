const supabase = require("../config/supabaseClient");

exports.getRequestProducts = async (req, res) => {
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
};

exports.deleteRequestProduct = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "ID não fornecido na URL" });
  }
  try {
    const { error } = await supabase.from("base_request").delete().eq("id", id);

    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json({ message: "Registro deletado com sucesso" });
  } catch (err) {
    res.status(500).json({ error: "Erro ao deletar registro" });
  }
};

exports.listproducts = async (req, res) => {
    try {
      const { data, error } = await supabase
        .from("base_produ")
        .select("id, material,pdv")
        .order("material", { ascending: false });
  
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      const formattedData = data.map((item) =>({
        labe: item.material,
        
      }))
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: "Erro ao buscar dados" });
    }
  };
