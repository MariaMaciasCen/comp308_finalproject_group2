const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vitalSignSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId, // Assuming you're using MongoDB's ObjectID for user IDs
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  temperature: {
    type: Number
  },
  heartRate: {
    type: Number
  },
  bloodPressure: {
    type: String
  },
  respiratoryRate: {
    type: Number
  }
});

const VitalSign = mongoose.model("vitalSign", vitalSignSchema);

module.exports = VitalSign;
