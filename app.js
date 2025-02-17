var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

// Define routers
var indexRouter = require("./app_server/routes/index");
var usersRouter = require("./app_server/routes/users");
var travelRouter = require("./app_server/routes/travel");

var roomsRouter = require("./app_server/routes/rooms");
var mealsRouter = require("./app_server/routes/meals");
var newsRouter = require("./app_server/routes/news");
var aboutRouter = require("./app_server/routes/about");
var contactRouter = require("./app_server/routes/contact");

var apiRouter = require("./app_api/routes/index");
var handlebars = require("hbs");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "app_server", "views"));
app.set("view engine", "hbs");

// register handlebars partial dir
handlebars.registerPartials(__dirname + "/app_server/views/partials");

// Bring in the database
require("./app_api/models/db");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
});

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/travel", travelRouter);

app.use("/api", apiRouter);

//
app.use("/rooms", roomsRouter);
app.use("/meals", mealsRouter);
app.use("/news", newsRouter);
app.use("/about", aboutRouter);
app.use("/contact", contactRouter);

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
