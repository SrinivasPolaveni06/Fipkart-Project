const userSchema = require("../model/userSchema");

const createOrder = async function (req, res, next) {
  try {
    const { body, user_id } = req;

    const StrId = user_id.toString();

    const verifyUser = await userSchema.findById(StrId);

    if (verifyUser === null) {
      throw new Error("User not found");
    }

    const updatedUserOrders = await userSchema.findOneAndUpdate(
      { _id: StrId },
      {
        $push: { orders: body },
      },
      {
        new: true,
        upsert: true,
      }
    );

    //console.log(updatedUserOrders);

    return res.send({ status: "ok" });
  } catch (err) {
   // console.log(err);
    return res.status(400).send({ error: "Bad Request" });
  }
};

module.exports = { createOrder };
