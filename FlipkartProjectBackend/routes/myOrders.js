var express = require("express");
var router = express.Router();
var ordersController = require("../controllers/ordersController");

/* GET users listing. */

var jwt = require("jsonwebtoken");

const protectedRoute = function (req, res, next) {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(401).send("You Are Not Authorized");
  }
  const TokenArray = authorization.split(" ");
  const token = TokenArray[1];
  const data = jwt.verify(token, "Secrete");
  //console.log(data);
  const userId = data.id;
  req.user_id = userId;
  next();
};

// module.exports = protectedRoute;
router.use(protectedRoute);


router.put("/", ordersController.createOrder);
//router.get("/", ordersController.loginUser);
module.exports = router;
