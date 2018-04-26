const mongoose = require("mongoose");
const db = require("../models");
mongoose.Promise = global.Promise;

// This file empties the Scrapes collection and inserts the test records below

mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/scraperdb"
);

const scrapeSeed = [
    {
        html: "",
        url: "www.iamwill.co",
        processed: false
    },
    {
        html: "",
        url: "www.google.com",
        processed: false

    },
    {
        html: "",
        url: "https://news.ycombinator.com/",
        processed: false
    },

];

db.Scrape
    .remove({})
    .then(() => db.Scrape.collection.insertMany(scrapeSeed))
    .then(data => {
        console.log(data.insertedIds.length + " records inserted!");
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });