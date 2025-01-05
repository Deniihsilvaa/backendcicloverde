const express = require("express");
const {
  getRequestProducts,
  deleteRequestProduct,
  listproducts,
} = require("../controllers/requestProductsController");

const router = express.Router();

router.get("/request-products", getRequestProducts);
router.delete("/request-products/d/:id", deleteRequestProduct);
router.get("/products/list", listproducts);
module.exports = router;
