const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const scrapeSchema = new Schema({
  title: { type: String, required: true },
  date: { type: String, default: Date.now },
  URL: { type: String, required: true }
});

const Scrape = mongoose.model("Scrape", scrapeSchema);

module.exports = Scrape;