const mongoose = require("mongoose");
const db = require("../models");
mongoose.Promise = global.Promise;

// This file empties the Scrapes collection and inserts the books below

mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/scraperdb"
);

console.log('L13')


const scrapeSeed = [
    {
        uuid: "1111",
        html: "",
        date: "www.test1.com",
    },
    {
        uuid: "2222",
        html: "",
        url: "www.test2.com",
    },
    {
        uuid: "33333",
        html: "",
        date: "www.test3.com",
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