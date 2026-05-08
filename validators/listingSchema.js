const Joi = require("joi");

module.exports.listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().trim().required(),

    description: Joi.string().required().max(200),

    price: Joi.number().required().min(0),

    category: Joi.string()
      .valid(
        "Books",
        "Stationary",
        "Electronics",
        "Furniture",
        "Clothing",
        "Transport",
        "Others",
      )
      .required(),
  }).required(),
});
