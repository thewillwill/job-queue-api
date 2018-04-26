const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();

const scrapesController = require("./controllers/scrapesController")

const PORT = process.env.PORT || 3001;

// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: false }));      ///WILLL MIGHT NEED TO CHANGE TO TRUE
app.use(bodyParser.json());

// Add routes for API
app.use(routes);

// Set up promises with mongoose
mongoose.Promise = global.Promise;

// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/scraperdb"
);

//Add any unprocessed scraping requests (from the database) to the job Queue
scrapesController.findUnprocessed();

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
