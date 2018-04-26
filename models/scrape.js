const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const scrapeSchema = new Schema({
  html: { 
    type: String, 
    required: false,
  },
  url: { 
    type: String, 
    required: true,
  },
  processed: {
    type: Boolean,
    default: false,
    required: true,
  }
},
  { timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' } } 
);

const Scrape = mongoose.model("Scrape", scrapeSchema);

module.exports = Scrape;