var express = require("express");
var router = express.Router();
var productController = require("../controllers/product");

router.post("/", productController.createProduct);
router.get("/", productController.getProducts);
router.get("/data", productController.getTotalData);
router.get("/:id", productController.getSpecificData);
router.get("/order/:id", productController.getSpecificData);
module.exports = router;
