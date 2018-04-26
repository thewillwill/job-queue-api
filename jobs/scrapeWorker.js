var kue = require('kue');

//create a queue instance
var queue = kue.createQueue();

function processJobs() {
  //process jobs in the queue with the type scraper
  queue.process('scraper', function(job, done) {
    // scrapeHTML(job.data, done);

    console.log(`Job: ${job.id}, is done`);
    done && done();    
  }
}


