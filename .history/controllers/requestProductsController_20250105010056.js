const supabase = require("../config/supabaseClient");
const Redis = require("ioredis");
const redis = new Redis();

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
    // Verifica se existe cache
    const cachedData = await redis.get("products:list");

    if (cachedData) {
      console.log("Retornando do cache...");
      return res.json(JSON.parse(cachedData)); // Retorna o cache
    }

    // Se não houver cache, consulta o banco
    const { data, error } = await supabase
      .from("base_produ")
      .select("id, material");

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    // Salva no cache com expiração de 5 minutos (300 segundos)
    await redis.set("products:list", JSON.stringify(data), "EX", 300);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar produtos" });
  }
};
exports.addProduct = async (req, res) => {
  const { material, descricao } = req.body;
  if (!material || !descricao) {
    return res.status(400).json({ error: "Campos obrigatórios ausentes" });
  }

  try {
    const { error } = await supabase
      .from("base_produ")
      .insert([{ material, descricao }]);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    // Invalida o cache após inserção
    await redis.del("products:list");

    res.json({ message: "Produto adicionado com sucesso" });
  } catch (err) {
    res.status(500).json({ error: "Erro ao adicionar produto" });
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { material, descricao } = req.body;
  if (!id || !material || !descricao) {
    return res.status(400).json({ error: "Campos obrigatórios ausentes" });
  }

  try {
    const { error } = await supabase
      .from("base_produ")
      .update({ material, descricao })
      .eq("id", id);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    // Invalida o cache depois da atualização
    await redis.del("products:list");

    res.json({ message: "Produto atualizado com sucesso" });
  } catch (err) {
    res.status(500).json({ error: "Erro ao atualizar produto" });
  }
};
