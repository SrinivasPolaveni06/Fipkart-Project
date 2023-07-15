var express = require("express");
var router = express.Router();
var userController = require("../controllers/users");

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.post("/signup", userController.createUser);
router.post("/login", userController.loginUser);
router.get("/:id", userController.getUserData);
router.put("/password/update", userController.updateUserPassword);
module.exports = router;
