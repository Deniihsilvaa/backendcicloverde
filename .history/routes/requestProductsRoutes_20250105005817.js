const express = require("express");
const {
  getRequestProducts,
  deleteRequestProduct,
  listproducts,
} = require("../controllers/requestProductsController");

const router = express.Router();

router.get("/api/request-products", getRequestProducts);
router.delete("/api/request-products/d/:id", deleteRequestProduct);
router.get
module.exports = router;
