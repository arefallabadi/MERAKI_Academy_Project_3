const express = require("express");
const { uuid } = require("uuidv4");
const app = express();
const port = 5000;
app.use(express.json());

const articles = [
  {
    id: 1,
    title: "How I learn coding?",
    description: "Lorem, Quam, mollitia.",
    author: "Jouza",
  },
  {
    id: 2,
    title: "Coding Best Practices",
    description: "Lorem, ipsum dolor sit, Quam, mollitia.",
    author: "Besslan",
  },
  {
    id: 3,
    title: "Debugging",
    description: "Lorem, Quam, mollitia.",
    author: "Jouza",
  },
];

const getAllArticles = (req, res) => {
  res.status(200);
  res.json(articles);
};
app.get("/articles", getAllArticles);

const getArticlesByAuthor = (req, res) => {
  const article = req.query.author;
  const found = articles.filter((elm) => {
    return elm.author === article;
  });
  if (found.length) {
    res.status(200);
    res.json(found);
  } else {
    res.status(404);
    res.json("article not found");
  }
};
app.get("/articles/search_1", getArticlesByAuthor);

const getAnArticleById = (req, res) => {
  const article = req.query.id;
  const found = articles.find((elm) => {
    return elm.id === Number(article);
  });
  if (found) {
    res.status(200);
    res.json(found);
  } else {
    res.status(404);
    res.json("article not found");
  }
};
app.get("/articles/search_2", getAnArticleById);

const createNewArticle = (req, res) => {
  const newA = {
    title: req.body.title,
    description: req.body.description,
    author: req.body.author,
    id: uuid(),
  };
  articles.push(newA);
  res.status(201);
  res.json(newA);
};
app.post("/articles", createNewArticle);

const updateAnArticleById = (req, res) => {
  const article = req.params.id;
  const found = articles.find((elm) => {
    return elm.id === Number(article);
  });
  if (found) {
    const update = {
      title: req.body.title,
      description: req.body.description,
      author: req.body.author,
      id: article,
    };
    res.status(201);
    res.json(update);
  } else {
    res.status(404);
    res.json("article not found");
  }
};
app.put("/articles/:id", updateAnArticleById);

const deleteArticleById = (req, res) => {
  const article = req.params.id;
  let index;
  const found = articles.find((elm, i) => {
    index = i;
    return elm.id === Number(article);
  });
  if (found) {
    articles.splice(index, 1);
    res.json({
      success: "true",
      message: `Success Delete article with id => ${article}`,
    });
    res.status(201);
  } else {
    res.status(404);
    res.json("article not found");
  }
};
app.delete("/articles/:id", deleteArticleById);

const deleteArticlesByAuthor = (req, res) => {
  const article = req.body.author;
  const found = articles.map((elm, i) => {
    if (elm.author === article) {
      articles.splice(i, 1);
    } else {
      res.status(404);
      res.json("article not found");
    }
  });
  res.status(200);
  res.json({
    success: "true",
    message: `Success delete all the articles for the author => ${article}`,
  });
};
app.delete("/articles", deleteArticlesByAuthor);

app.listen(port, () => {
  console.log(`server start on http://localhost:${port}`);
});
