const User = require("../Models/User");

module.exports.renderSignupForm = async (req, res) => {
  res.render("./users/signupUser.ejs");
};

module.exports.postSignup = async (req, res, next) => {
  try {
    const { username, email, phone, password } = req.body;

    // CHECK EMAIL
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      req.flash("error", "Email already registered. Please login.");
      return res.redirect("/signup");
    }

    // CHECK PHONE
    const existingPhone = await User.findOne({ phone });
    if (existingPhone) {
      req.flash("error", "Phone number already registered.");
      return res.redirect("/signup");
    }

    const newUser = new User({
      username,
      email,
      phone,
    });

    const registeredUser = await User.register(newUser, password);

    req.login(registeredUser, (err) => {
      if (err) return next(err);

      req.flash("success", "Welcome to WCE Marketplace 🎉");
      res.redirect("/listings");
    });
  } catch (err) {
    if (err.code === 11000) {
      if (err.keyPattern?.email) {
        req.flash("error", "Email already exists.");
      } else if (err.keyPattern?.phone) {
        req.flash("error", "Phone number already exists.");
      } else {
        req.flash("error", "Duplicate data detected.");
      }
      return res.redirect("/signup");
    }

    // 🔥 Passport username error
    if (err.name === "UserExistsError") {
      req.flash("error", "Username already taken.");
      return res.redirect("/signup");
    }

    req.flash("error", err.message);
    res.redirect("/signup");
  }
};

module.exports.renderLoginForm = async (req, res) => {
  res.render("./users/loginUser.ejs");
};

module.exports.postLogin = async (req, res) => {
  req.flash("success", "Welcome to WCE marketplace");
  const redirectUrl = res.locals.redirectUrl
    ? res.locals.redirectUrl
    : "/listings";
  res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      next(err);
      return res.redirect("/listings");
    }
    req.flash("success", "You have been successfully logged out!");
    res.redirect("/listings");
  });
};
