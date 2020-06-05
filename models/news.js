const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const newsSchema = new Schema({
  author: ObjectId,
  title: { type: String, required: [true, "pole tytyl jest wymagane"] }, //sprawi ze title bedzie wymagany
  description: { type: String, required: [true, "pole tresc jest wymagane"] },
  created: { type: Date, default: Date.now },
});
module.exports = mongoose.model("News", newsSchema);
