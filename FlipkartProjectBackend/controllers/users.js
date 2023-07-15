const userSchema = require("../model/userSchema");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const createUser = async function (req, res, next) {
  try {
    const userData = await userSchema.findOne({ email: req.body.email });

    if (userData === null) {
      const { body } = req;
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

      const user = new userSchema({ ...body, password: hashedPassword });
      user.save();
      return res.status(200).send({ message: "User Created", status: "ok" });
    } else {
      return res.status(400).send({
        message: "Bad Request",
        error: "Email already existed, Try with another email",
      });
    }
  } catch (err) {
    return res.status(400).send("Bad Request");
  }
};

const loginUser = async function (req, res, next) {
  try {
    const userData = await userSchema.findOne({ email: req.body.email });

    if (userData !== null) {
      const comparedPassword = await bcrypt.compare(
        req.body.password,
        userData.password
      );
      // console.log(comparedPassword);

      if (comparedPassword) {
        const token = jwt.sign(
          { name: userData.username, email: userData.email, id: userData._id },
          "Secrete"
        );
        return res
          .status(200)
          .send({ message: "Login Success", status: "ok", token: token });
      } else {
        return res.status(400).send({
          message: "Bad Request",
          error: "Invalid Email and Password",
        });
      }
    } else {
      return res
        .status(400)
        .send({ message: "Bad Request", error: "User Not Registered" });
    }
  } catch (err) {
    return res.status(400).send("Bad Request");
  }
};

const getUserData = async function (req, res, next) {
  const Id = req.params.id;
  try {
    const data = await userSchema.findById(Id);
    //console.log(data, "user data");
    return res.send(data);
  } catch (err) {
    return res.status(400).send("Bad Request");
  }
};

const updateUserPassword = async function (req, res, next) {
  try {
    const userData = await userSchema.findOne({ email: req.body.email });

    if (userData !== null) {
      const { body } = req;
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

      const updatedResult = await userSchema.findByIdAndUpdate(
        { _id: userData._id },
        {
          password: hashedPassword,
        }
      );
      //console.log(updatedResult);
      return res.status(200).send({ message: "User Created", status: "ok" });
    } else {
      return res.status(400).send({
        message: "Bad Request",
        error: "User Not Registered",
      });
    }
  } catch (err) {
    return res.status(400).send("Bad Request");
  }
};

module.exports = { createUser, loginUser, getUserData, updateUserPassword };
