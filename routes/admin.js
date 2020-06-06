const express = require("express");
const News = require("../models/news");
const router = express.Router();

//metoda all uruchomi sie za kazdym razem
//'*' znaczy ze wykona sie pod kazdym routerem
router.all("*", (req, res, next) => {
  if (!req.session.admin) {
    res.redirect("login");
    return;
  }

  next();
});

/* GET home page. */
router.get("/", (req, res) => {
  console.log(req.session.admin);
  //wyswietlenie wszystkich artykulow z db
  News.find({}, (err, data) => {
    console.log(data);
    if (err) {
      console.log("blad polaczenia z baza danych");
    } else res.render("admin/index", { title: "strona admina", data });
  });
});

router.get("/news/add", (req, res) => {
  res.render("admin/news-form", {
    title: "dodaj newsika",
    body: {},
    errors: {},
  });
});

router.post("/news/add", (req, res) => {
  //tutaj to z imputa bedzie do bazy danych wyslane
  const body = req.body;
  const newsData = new News(body);
  const errors = newsData.validateSync();

  newsData.save((err) => {
    if (err) {
      res.render("admin/news-form", { title: "Dodaj news", errors, body });
      return;
    }
    res.redirect("/admin");
  });
});

//dodatkowy parametr id w tym wypadku jest w req.params.id
router.get("/news/delete/:id", (req, res) => {
  News.findByIdAndDelete(req.params.id, (err) => {
    //po usunieciu przekierowanie na admina
    res.redirect("/admin");
  });
});

module.exports = router;
