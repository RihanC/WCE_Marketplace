const mongoose = require("mongoose");

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

let { data } = require("./data.js");

const Listing = require("./Models/Listing.js");

const insertData = async () => {
  await Listing.deleteMany();

  data = data.map((obj) => ({
    ...obj,
    owner: new mongoose.Types.ObjectId("69e90c699fc85ce89952645a"),
  }));

  await Listing.insertMany(data);
};

insertData();
