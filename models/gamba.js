const mongoose = require("mongoose");


const gambaSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userID: String,
    money: String
  });

  module.exports = mongoose.model("Gamba", gambaSchema);