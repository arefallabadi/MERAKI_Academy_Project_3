const express = require("express");
const app = express();
const port = 5000;

const articles = [
    {
    id: 1,
    title: 'How I learn coding?',
    description:
    'Lorem, Quam, mollitia.',
    author: 'Jouza',
    },
    {
    id: 2,
    title: 'Coding Best Practices',
    description:
    'Lorem, ipsum dolor sit, Quam, mollitia.',
    author: 'Besslan',
    },
    {
    id: 3,
    title: 'Debugging',
    description:
    'Lorem, Quam, mollitia.',
    author: 'Jouza',
    },
    ];

  app.get("/articles",(req,res)=>{
    res.status(200);
    res.json(articles);
  })

  app.get("/articles/:id",(req,res)=>{
    const article = req.params.id
    const found = articles.find((elm)=>{
return elm.id == article 
    })
    if(found){
        res.status(200);
        res.json(found);
    }else{
        res.status(404);
        res.json("article not found");
    }  
  })

app.listen(port, () => {
    console.log(`server start on ttp://localhost:${port}`);
  });