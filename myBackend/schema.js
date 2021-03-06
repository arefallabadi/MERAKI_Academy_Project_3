const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const users = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  age: { type: Number },
  country: { type: String },
  email: { type: String, require: true, unique: true },
  password: { type: String },
  role: { type: mongoose.Schema.ObjectId, ref: "role" },
});

const articles = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  author: { type: mongoose.Schema.ObjectId, ref: "user" },
  comments: [{ type: mongoose.Schema.ObjectId, ref: "comment" }],
});

const comments = new mongoose.Schema({
  comment: { type: String },
  commenter: { type: mongoose.Schema.ObjectId, ref: "user" },
});

const roles = new mongoose.Schema({
  role: { type: String },
  permissions: [{ type: String }],
});

users.pre("save", async function () {
  this.email = this.email.toLowerCase();
  // this.isModified(this.password);
  // if (this.isModified(this.password)) {
  this.password = await bcrypt.hash(this.password, 10);
  //  console.log(this.password);
  // }
});

const User = mongoose.model("user", users);
const Article = mongoose.model("article", articles);
const Comment = mongoose.model("comment", comments);
const Role = mongoose.model("role", roles);
module.exports.User = User;
module.exports.Article = Article;
module.exports.Comment = Comment;
module.exports.Role = Role;


