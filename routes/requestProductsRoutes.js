const express = require("express");
const {
  getRequestProducts,
  deleteRequestProduct,
  listproducts,
} = require("../controllers/requestProductsController");

const router = express.Router();

router.get("/request-products", getRequestProducts); // Acessível em /api/request-products
router.delete("/request-products/d/:id", deleteRequestProduct); // Acessível em /api/request-products/d/:id
router.get("/products/list", listproducts); // Acessível em /api/products/list


module.exports = router;
