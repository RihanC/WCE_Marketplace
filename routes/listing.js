const express = require("express");
const router = express.Router();

const Listing = require("../Models/Listing.js");

const wrapAsync = require("../utils/wrapAsync.js");

const { listingSchema } = require("../validators/listingSchema.js");
const { validate } = require("../validators/validate.js");

const { isLoggedIn, isOwnerListing } = require("../middleware.js");
const listingController = require("../Controllers/listing.js");

// Multer
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router
  .route("/")

  // Index Route
  .get(wrapAsync(listingController.index))

  // New Listing
  .post(
    isLoggedIn,
    upload.single("image"),
    validate(listingSchema),
    wrapAsync(listingController.postNewListing),
  );

//New Listing Get
router.get("/new", isLoggedIn, listingController.renderNewListingForm);

router.get("/my", isLoggedIn, wrapAsync(listingController.myListings));

router
  .route("/:id")

  // Show Listing
  .get(isLoggedIn, wrapAsync(listingController.showListing))

  // Edit Listing
  .patch(
    isLoggedIn,
    isOwnerListing,
    upload.single("image"),
    validate(listingSchema),
    wrapAsync(listingController.patchEditListing),
  )

  // Delete Listing
  .delete(
    isLoggedIn,
    isOwnerListing,
    wrapAsync(listingController.destroyListing),
  );

//Edit Listing Form
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwnerListing,
  wrapAsync(listingController.renderEditListingForm),
);

module.exports = router;
