const express = require("express");
const router = express.Router();
const News = require("../models/news");

/* GET home page. */
router.get("/", (req, res) => {
  const search = req.query.search;

  //- 1 sortowanie na dole beda najstarsze na gorze najnowsze
  const findNews = News.find({ title: new RegExp(search, "i") }).sort({
    created: -1,
  });

  findNews.exec((err, data) => {
    console.log(data);
    //przekazane data czyli dodane newsy i sa potem przekazane
    // do widoku news.pug
    res.render("news", { title: "nowy je wiesci", data, search });
  });
});

module.exports = router;
