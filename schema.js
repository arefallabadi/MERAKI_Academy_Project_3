const mongoose = require("mongoose");

const users = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  age: { type: Number },
  country: { type: String },
  email: { type: String , require:true ,unique:true },
  password: { type: String },
});

const articles = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  author: { type: mongoose.Schema.ObjectId, ref: "users" },
});

const User = mongoose.model("user", users);
const Article = mongoose.model("article", articles);
module.exports.User = User;
module.exports.Article =Article ;
