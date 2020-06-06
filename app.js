const createError = require("http-errors");
const cookieSession = require("cookie-session");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const config = require("./config");

//tu polaczymy sie z baza danych
const mongoose = require("mongoose");
mongoose.connect(config.db, { useNewUrlParser: true });
//sprawdzamy czy sie polaczylismy
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function () {
  console.log("we ar connected");
});

const indexRouter = require("./routes/index");
const newsRouter = require("./routes/news");
const quizRouter = require("./routes/quiz");
const adminRouter = require("./routes/admin");

//mongodb+srv://admin:<admin>@jacek-nqpdz.mongodb.net/<dbname>?retryWrites=true&w=majority

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  cookieSession({
    name: "session",
    keys: config.keySession,
    maxAge: config.maxAgeSession,
  })
);

//skrypt ktory przeleci przed renderowaniem royterow
app.use(function (req, res, next) {
  console.log(req.path);
  res.locals.path = req.path; //dzieki takiemu zapisowi lokalne scizezki gdzie jestesmy na stroni beda ostpne globalnie

  next();
});

app.use("/", indexRouter);
app.use("/news", newsRouter);
app.use("/quiz", quizRouter);
app.use("/admin", adminRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
