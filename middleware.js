const Listing = require("./Models/Listing");

const isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    console.log(req.originalUrl);
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "You are not authenticated!");
    return res.redirect("/login");
  }
  next();
};

const saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
    console.log(res.locals.redirectUrl);
  }
  next();
};

const isOwnerListing = async (req, res, next) => {
  let { id } = req.params;
  let listing = await Listing.findById(id).populate("owner");
  if (
    res.locals.currUser &&
    !res.locals.currUser._id.equals(listing.owner._id)
  ) {
    req.flash("error", "You are not the owner of this listing");
    return res.redirect(`/listings/${id}`);
  }
  next();
};

const isOwnerReview = async (req, res, next) => {
  let { reviewId } = req.params;
  let review = await Review.findById(reviewId).populate("owner");
  if (
    res.locals.currUser &&
    !res.locals.currUser._id.equals(review.owner._id)
  ) {
    req.flash("error", "You are not the owner of this review");
    return res.redirect(`/listings/${req.params.id}`);
  }
  next();
};

module.exports = { isLoggedIn, saveRedirectUrl, isOwnerListing, isOwnerReview };
