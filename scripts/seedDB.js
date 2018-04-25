const mongoose = require("mongoose");
const db = require("../models");
mongoose.Promise = global.Promise;

// This file empties the Scrapes collection and inserts the books below

mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/scraperdb"
);

const scrapeSeed = [
    {
        title: "Scrape Title 1",
        url: "www.test1.com",
        date: new Date(Date.now())
    },
    {
        title: "Second Scrape Sample ",
        url: "www.test2.com",
        date: new Date(Date.now())
    },
    {
        title: "Third Scrape Sample Title 1",
        url: "www.test3.com",
        date: new Date(Date.now())
    },

];

db.Scrape
    .remove({})
    .then(() => db.Scrape.collection.insertMany(articleSeed))
    .then(data => {
        console.log(data.insertedIds.length + " records inserted!");
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });