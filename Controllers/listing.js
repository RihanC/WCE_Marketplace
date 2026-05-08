const Listing = require("../Models/Listing");

module.exports.index = async (req, res) => {
  let { category = "", sort = "", search = "" } = req.query;

  let query = {};

  if (search) {
    query.title = { $regex: search, $options: "i" };
  }

  if (category && category !== "All") {
    query.category = category;
  }

  let listingsQuery = Listing.find(query);

  req.flash("search", search);

  if (sort === "priceLow") {
    listingsQuery = listingsQuery.sort({ price: 1 });
  } else if (sort === "priceHigh") {
    listingsQuery = listingsQuery.sort({ price: -1 });
  } else if (sort === "latest") {
    listingsQuery = listingsQuery.sort({ createdAt: -1 });
  }

  const listings = await listingsQuery;

  res.render("./listings/index.ejs", {
    listings,
    category,
    search,
    sort,
  });
};

module.exports.renderNewListingForm = (req, res) => {
  res.render("./listings/newListing.ejs");
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id).populate("owner");

  if (!listing) {
    req.flash("error", "Listing you are searching for does not exists.");
    return res.redirect("/listings");
  }
  // console.log(listing);
  res.render("./listings/listing.ejs", { listing });
};

module.exports.searchListing = async (req, res) => {
  let { search = "" } = req.query;

  const listings = await Listing.find({
    title: { $regex: search, $options: "i" },
  });

  res.render("listings/index", {
    listings,
    search,
    category: "",
    sort: "", // 🔥 REQUIRED
  });
};
module.exports.postNewListing = async (req, res) => {
  let listing = req.body.listing;

  if (!req.file) {
    listing.image = {
      url: "https://via.placeholder.com/300",
      filename: "default",
    };
  } else {
    listing.image = {
      url: req.file.path,
      filename: req.file.filename,
    };
  }

  listing.owner = req.user._id;

  await Listing.create(listing);

  req.flash("success", "New Listing Created");
  res.redirect("/listings");
};

module.exports.renderEditListingForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);

  if (!listing) {
    req.flash("error", "Listing you are searching for does not exists.");
    return res.redirect("/listings");
  }

  if (listing.image && listing.image.url) {
    let originalImage = listing.image.url;
    originalImage = originalImage.replace(
      "/upload",
      "/upload/w_250,e_blur:200",
    );
    listing.image.url = originalImage;
  }

  res.render("./listings/editListing.ejs", { listing });
};

module.exports.patchEditListing = async (req, res) => {
  let { id } = req.params;

  let listing = req.body.listing;

  if (req.file) {
    listing.image = {
      filename: req.file.filename,
      url: req.file.path,
    };
  }

  await Listing.findByIdAndUpdate(id, listing);

  req.flash("success", "Listing Updated");

  res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted");
  res.redirect("/listings");
};

module.exports.myListings = async (req, res) => {
  const listings = await Listing.find({
    owner: req.user._id,
  });

  res.render("./listings/myListings.ejs", { listings });
};
