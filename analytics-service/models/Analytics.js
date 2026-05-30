const mongoose = require("mongoose");

const analyticsSchema = new mongoose.Schema({
  shortCode: {
    type: String,
    required: true,
    unique: true,
  },

  clicks: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Analytics", analyticsSchema);