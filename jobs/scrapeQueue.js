const kue = require('kue');
const scrape = require('./scrape');

//create a queue instance
const queue = kue.createQueue();

/**
Creates a new job in queue with the type 'scraper'
*/
let newJob = (id, url) => {
  let job = queue.create('scraper', {
    id,
    url
  });

  //Save html to database on completion of scrape job 
  job
    .on('complete', function(html) {
      console.log('Job', job.data.id, 'with url', job.data.url, 'is done');
      const id = job.data.id;
      const scrapesController = require("../controllers/scrapesController");
      scrapesController.update(id, html);
    })
    .on('failed', function() {
      console.log('Job', job.data.id, 'with url', job.data.url, 'has failed');
    });
  job.removeOnComplete(true).save();
}

/**
Process jobs in the queue with the type scraper
*/
function processJobs() {
  queue.process('scraper', function(job, done) {
    const {url, id} = job.data;
    //store the the html for URL as a string
    scrape.htmlToString(url, id, done);
  });
}

processJobs();

module.exports = {
  newJob,
  processJobs
}