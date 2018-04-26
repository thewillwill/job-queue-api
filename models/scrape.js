const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const scrapeSchema = new Schema({
  uuid: { type: String, required: true },
  html: { type: String, required: false },
  URL: { type: String, required: true }
},
  { timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' } 
);

const Scrape = mongoose.model("Scrape", scrapeSchema);

module.exports = Scrape;