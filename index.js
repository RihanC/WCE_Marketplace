if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");

const User = require("./Models/User.js");

const methodOverride = require("method-override");

// ejs templates
const ejsMate = require("ejs-mate");
app.engine("ejs", ejsMate);

//Path
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Express Session
const session = require("express-session");
const sessionOptions = {
  secret: "secret-code",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  },
};
app.use(session(sessionOptions));

// connect-flash
const flash = require("connect-flash");
app.use(flash());

// Passport
const passport = require("passport");
const LocalStrategy = require("passport-local");
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Express Error
const ExpressError = require("./utils/ExpressError.js");

main()
  .then(() => {
    console.log("Mongoose connected successfully!");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/WCE_IDT");
}

const listingRouter = require("./routes/listing.js");
const userRouter = require("./routes/User.js");

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  res.locals.search = req.flash("search");
  next();
});

app.use("/listings", listingRouter);
app.use("", userRouter);

app.listen(3000, () => {
  console.log(`Listening to port :${3000}`);
});

app.get("/", (req, res) => {
  res.redirect("/listings");
});

app.use(() => {
  throw new ExpressError(404, "Page not found");
});

// Error Handler

app.use((err, req, res, next) => {
  res.render("error.ejs", { err });
});
