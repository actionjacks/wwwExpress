const express = require("express");
const router = express.Router();
const Quiz = require("../models/quiz");

/* GET home page. */
router.get("/", (req, res) => {
  const show = !req.session.vote;
  //to utworzy nowy obiekt w mongoDB
  //new Quiz({ title: "pytanie 1", vote: 0 }).save();
  Quiz.find({}, (err, data) => {
    console.log(data);
    let sum = 0;
    data.forEach((item) => {
      sum += item.vote;
    });
    res.render("quiz", { title: "strona z quizem", data, show, sum });
  });
});

router.post("/", (req, res) => {
  //w widoku pub radio ma nazwe quiz i temu jest teraz w bodyw req
  const id = req.body.quiz;

  Quiz.findOne({ _id: id }, (err, data) => {
    data.vote = data.vote + 1;
    data.save((err) => {
      req.session.vote = 1;

      res.redirect("/quiz");
    });
  });
});

module.exports = router; //
