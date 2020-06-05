const express = require("express");
const router = express.Router();
const login = "admin";
const password = "admin";

/* GET home page. */
router.get("/", (req, res) => {
  res.render("index", { title: "StronaJacka" });
});
// paneladmina
router.get("/login", (req, res) => {
  res.render("login", { title: "strona do logowania" });
});

router.post("/login", (req, res) => {
  console.log(req.body); //w tym znajduja sie dane z formularza wyslane ze strony na serwer
  const body = req.body;
  if (body.login === login && body.password === password) {
    req.session.admin = 1;
    res.redirect("/admin");
  } else {
    res.redirect("/login");
  }
});

module.exports = router;
