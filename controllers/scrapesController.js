const db = require("../models");
const scrapeQueue = require("../jobs/scrapeQueue");

// Defining methods for the urlsController
module.exports = {
  findById: function(id, res) {
    console.log('scrapeController - findById');

    db.Scrape
      .findById(id, (err, scrape) => {
        if (err) {
          console.log("findByID error:", err);
          res.status(422).json(err);
        }
        //check if processed;
        (scrape.processed) ?
          res.status(200).send({ message: "Job Complete" , html: scrape.html }):
          res.status(200).send({ message: "Job not complete, please check back soon" });
      })
  },
  findUnprocessed: function(res) {
    console.log('scrapeController - findUnprocessed');

    db.Scrape
      .find({processed: 'false'}, (err, unprocessedScrapes) => {
        if (err) {
          console.log("findUnprocessed error:", err);
          res.status(422).json(err);
        }
        unprocessedScrapes.map(({id, url}) => scrapeQueue.newJob(id, url))
      })
  },  
  create: function(req, res) {
    //get only the url object from the body
    const urlReq = { "url": req.body.url };
    console.log('scrapeController - create, url:', urlReq);

    //store the url request to the database and return the record id
    new db.Scrape(urlReq).save((err, scrape) => {
      if (err) {
        res.status(422).json(err);
      }
      const { id, url } = scrape;
      //return the 'scrape job id' to the user
      res.send({ id, message: `URL being scraped, check back soon at /api/scrapes/${id}` });

      //add the job to the scrape job queue
      scrapeQueue.newJob(id, url);

    })
    console.log('scrapeController - create FINISHED');
  },
  update: function(id, html) {
    //get only the url object from the body
    console.log('scrapeController - update, id:', id);

    //store the url request to the database and return the record id
    db.Scrape.findByIdAndUpdate(id, { $set: { html: html, processed: true } }, (err) => {
      if (err) {
        console.log("Error updating:", err)
      }

    });
    console.log('scrapeController - update FINISHED');

  }
};