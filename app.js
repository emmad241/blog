var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var Promise = require("promise");

var indexRouter = require("./routes/home");
var usersRouter = require("./routes/users");
var loginRouter = require("./routes/login");
var aboutRouter = require("./routes/about");
var blogsRouter = require("./routes/blogs");
var regRouter = require("./routes/registration");
var helpRouter = require("./routes/help");
var logoutRouter = require("./routes/logout");

var db = require("./model/db");
var users = require("./model/User").User;
var blogs = require("./model/Blog").Blog;

var app = express();

//view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);
app.use("/about", aboutRouter);
app.use("/reg", regRouter);
app.use("/blogs", blogsRouter);
app.use("/help", helpRouter);

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
	res.render("../views/pages/error");
});

app.listen(5000, () => {
	console.log(`Example app listening at http://localhost:5000`);
});

module.exports = app;
