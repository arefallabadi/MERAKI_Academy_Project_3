const express = require("express");
const db = require("./db");
const { uuid } = require("uuidv4");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// const db =  require("./dbb")
const { User, Article, Comment, Role } = require("./schema");
const app = express();
const port = 5000;
app.use(express.json());

// const articles = [
//   {
//     id: 1,
//     title: "How I learn coding?",
//     description: "Lorem, Quam, mollitia.",
//     author: "Jouza",
//   },
//   {
//     id: 2,
//     title: "Coding Best Practices",
//     description: "Lorem, ipsum dolor sit, Quam, mollitia.",
//     author: "Besslan",
//   },
//   {
//     id: 3,
//     title: "Debugging",
//     description: "Lorem, Quam, mollitia.",
//     author: "Jouza",
//   },
// ];

// const getAllArticles = (req, res) => {
//   res.status(200);
//   res.json(articles);
// };
// app.get("/articles", getAllArticles);

// const getArticlesByAuthor = (req, res) => {
// const article = req.query.author;
// const found = articles.filter((elm) => {
//   return elm.author === article;
// });
// if (found.length) {
//   res.status(200);
//   res.json(found);
// } else {
//   res.status(404);
//   res.send("article not found");
// }
// };
// app.get("/articles/search_1", getArticlesByAuthor);

// const getAnArticleById = (req, res) => {
//   const article = req.query.id;
//   const found = articles.find((elm) => {
//     return elm.id === Number(article);
//   });
//   if (found) {
//     res.status(200);
//     res.json(found);
//   } else {
//     res.status(404);
//     res.send("article not found");
//   }
// };
// app.get("/articles/search_2", getAnArticleById);

// const createNewArticle = (req, res) => {
//   const newA = {
//     title: req.body.title,
//     description: req.body.description,
//     author: req.body.author,
//     id: uuid(),
//   };
//   articles.push(newA);
//   res.status(201);
//   res.send(newA);
// };
// app.post("/articles", createNewArticle);

// const updateAnArticleById = (req, res) => {
//   const article = req.params.id;
//   const found = articles.find((elm) => {
//     return elm.id === Number(article);
//   });
//   if (found) {
//     const update = {
//       title: req.body.title,
//       description: req.body.description,
//       author: req.body.author,
//       id: article,
//     };
//     res.status(201);
//     res.json(update);
//   } else {
//     res.status(404);
//     res.send("article not found");
//   }
// };
// app.put("/articles/:id", updateAnArticleById);

// const deleteArticleById = (req, res) => {
//   const article = req.params.id;
//   let index;
//   const found = articles.find((elm, i) => {
//     index = i;
//     return elm.id === Number(article);
//   });
//   if (found) {
//     articles.splice(index, 1);
//     res.json({
//       success: "true",
//       message: `Success Delete article with id => ${article}`,
//     });
//     res.status(201);
//   } else {
//     res.status(404);
//     // res.send("article not found");
//   }
// };
// app.delete("/articles/:id", deleteArticleById);

// const deleteArticlesByAuthor = (req, res) => {
//   const article = req.body.author;
//   const found = articles.filter((elm, i) => {
//     if (elm.author === article) {
//       articles.splice(i, 1);
//     } else {
//       res.status(404);
//       // res.send("article not found");
//     }
//   });
//   res.status(200);
//   res.json({
//     success: "true",
//     message: `Success delete all the articles for the author => ${article}`,
//   });
// };
// app.delete("/articles", deleteArticlesByAuthor);

// const createNewAuthor = (req, res) => {
//   const { firstName, lastName, age, country, email, password } = req.body;
//   const user = new User({ firstName, lastName, age, country, email, password });
//   user
//     .save()
//     .then((result) => {
//       res.json(result);
//       res.status(201);
//     })
//     .catch((err) => {
//       res.send(err);
//       res.status(404);
//     });
// };
// app.post("/users", createNewAuthor);

const createNewArticle = (req, res) => {
  const { title, description, author } = req.body;
  const newArticle = new Article({ title, description, author });
  newArticle
    .save()
    .then((result) => {
      res.json(result);
      res.status(201);
    })
    .catch((err) => {
      res.json(err);
      res.status(404);
    });
};
app.post("/articles", createNewArticle);

const getAllArticles = (req, res) => {
  Article.find({})
    .then((result) => {
      res.json(result);
      res.status(200);
    })
    .catch((err) => {
      res.json(err);
      res.status(404);
    });
};
app.get("/articles", getAllArticles);

const getArticlesByAuthor = (req, res) => {
  const article = req.query.author;
  Article.find({
    author: article,
  })
    .then((result) => {
      res.status(200);
      res.json(result);
    })
    .catch((err) => {
      res.status(404);
      res.json(err);
    });
};
app.get("/articles/search_1", getArticlesByAuthor);

const getAnArticleById = (req, res) => {
  const article = req.query.id;
  Article.find({
    _id: article,
  })
    .then((result) => {
      res.status(200);
      res.json(result);
    })
    .catch((err) => {
      res.status(404);
      res.json(err);
    });
};
app.get("/articles/search_2", getAnArticleById);

const updateAnArticleById = (req, res) => {
  const article = req.params.id;
  const update = req.body.update;
  Article.findOneAndUpdate({ author: article }, update, { new: true })
    .then((result) => {
      res.status(200);
      res.jason(result);
    })
    .catch((err) => {
      res.json(err);
      res.status(404);
    });
};
app.put("/articles/:id", updateAnArticleById);

const deleteArticleById = (req, res) => {
  const article = req.params.id;
  Article.deleteMany({
    id: article,
  })
    .then(() => {
      res.json({
        success: "true",
        message: `Success Delete article with id => ${article}`,
      });
      res.status(201);
    })
    .catch((err) => {
      res.status(404);
      res.json(err);
    });
};
app.delete("/articles/:id", deleteArticleById);

const deleteArticlesByAuthor = async (req, res) => {
  const article = req.body.author;
  await Article.deleteMany({ author: article })
    .then((result) => {
      res.status = 200;
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
      res.status(404);
    });
};
app.delete("/articles", deleteArticlesByAuthor);

// const login = (req, res) => {
//   const { email, password } = req.body;
//   User.find({ email, password })
//     .then((result) => {
//       if (result.length) {
//         res.status(201);
//         res.json("Valid login credentials");
//       } else {
//         res.status(404);
//         res.json("Invalid login credentials");
//       }
//     })
//     .catch((err) => {
//       res.status(404);
//     });
// };
// app.post("/login", login);

// const createNewComment = (rea, res) => {
//   const { comment, commenter } = req.body;
//   const id = req.params.id;
//   const newComment = new Comment({ comment, commenter });
//   newComment
//     .save()
//     .then((result) => {
//       res.status(201);
//       res.json(result);
//     })
//     .catch((err) => {
//       res.status(404);
//     });
// };
// app.post("/articles/:id/comments", createNewComment);

// console.log(process.env.DB_URI);
// console.log(process.env.SECRET);

const createNewAuthor = (req, res) => {
  const { firstName, lastName, age, country, email, password ,role } = req.body;
  const user = new User({ firstName, lastName, age, country, email, password ,role });
  user
    .save()
    .then((result) => {
      res.json(result);
      res.status(201);
    })
    .catch((err) => {
      res.send(err);
      res.status(404);
    });
};
app.post("/users", createNewAuthor);

const login = (req, res) => {
  let { email, password } = req.body;
  email = email.toLowerCase();
  User.findOne({ email })
    .populate("role")
    .exec()
    .then((result) => {
      if (result) {
        bcrypt.compare(req.body.password, result.password, (err, result_1) => {
          if (result_1) {
            const payload = {
              Id: result._id,
              country: result.country,
              role: result.role,
            };
            const options = { expiresIn: "60m" };
            const token = jwt.sign(payload, secret, options);
            res.json(token);
          } else {
            res.json({
              message: "The password you’ve entered is incorrect",
              status: 403,
            });
          }
        });
      } else {
        res.json({ message: "The email doesn't exist", status: 404 });
      }
    })
    .catch((err) => {
      res.status(404);
    });
};
app.post("/login", login);

const secret = process.env.SECRET;
const authentications = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, secret, (err, result) => {
    if (err) {
      res.status(403);
      return res.json(err);
    } else {
      next();
    }
  });
};
const createNewComment =
  (authentications,
  (req, res) => {
    const { comment, commenter } = req.body;
    const id = req.params.id;
    const newComment = new Comment({ comment, commenter });
    newComment
      .save()
      .then((result) => {
        res.status(201);
        res.json(result);
      })
      .catch((err) => {
        res.status(404);
        res.json(err);
      });
  });
app.post("/articles/:id/comments", createNewComment);

const createNewRole = (req, res) => {
  const { role, permissions } = req.body;
  const newRole = new Role({ role, permissions });
  newRole.save().then((result)=>{
    res.json(result)
    res.status(201)
  }).catch((err)=>{
    res.json(err)
    res.status(404) 
  })
};
app.post("/role", createNewRole);



app.listen(port, () => {
  console.log(`server start on http://localhost:${port}`);
});
