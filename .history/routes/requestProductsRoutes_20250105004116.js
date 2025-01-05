const express = require("express");
const {
  getRequestProducts,
  deleteRequestProduct,
} = require("../controllers/requestProductsController");

const router = express.Router();

router.get("/api/request-products", getRequestProducts);
router.delete("/api/request-products/dele/:id", deleteRequestProduct);

module.exports = router;
