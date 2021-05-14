const express = require("express");
const { uuid } = require('uuidv4');
const app = express();
const port = 5000;
app.use(express.json())

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

app.get("/articles", (req, res) => {
  res.status(200);
  res.json(articles);
});
 
app.get("/articles/search_1", (req, res) => {
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
  });

app.get("/articles/:id", (req, res) => {
    const article = req.params.id;
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
  });
 

app.post("/articles", (req, res) => {
  const newA = {
    title: req.body.title, description: req.body.description, author: req.body.author, id: uuid()};
  articles.push(newA);
  res.status(201);
  res.json(newA);
});

app.listen(port, () => {
  console.log(`server start on ttp://localhost:${port}`);
});

