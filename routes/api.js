const express = require("express");
const router = express.Router();
const News = require("../models/news");
const defaultSort = -1;

/* GET home page. */
router.get("/", (req, res) => {
  const search = req.query.search || "";
  let sort = req.query.sort || defaultSort;

  if (sort !== -1 || sort !== 1) {
    sort = defaultSort;
  }

  //- 1 sortowanie na dole beda najstarsze na gorze najnowsze
  const findNews = News.find({ title: new RegExp(search, "i") }).sort({
    created: sort,
  });

  findNews.exec((err, data) => {
    res.json({ data });
  });
});

module.exports = router;
