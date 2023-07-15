var mongoose = require("mongoose");
const bookingDetailsSchema = new mongoose.Schema({
  tracker_id: String,
  title: String,
  description: String,
  price: Number,
  quantity: Number,
  booking_date: String,
  user_address: {
    name: String,
    email: String,
    phone_number: Number,
    address: String,
  },
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },

  password: { type: String, required: true },
  orders: [bookingDetailsSchema],
});

const Users = mongoose.model("Users", userSchema);

module.exports = Users;
