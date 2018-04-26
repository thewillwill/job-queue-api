var kue = require('kue');

//create a queue instance
var queue = kue.createQueue();

//create a new job in queue with the type 'scraper'
function newJob(uuid, url) {
  let job = queue.create('scraper', {
    uuid,
    url
  });

 job
   .on('complete', function (){
     console.log('Job', job.id, 'with url', job.data.url, 'is done');
   })
   .on('failed', function (){
     console.log('Job', job.id, 'with url', job.data.url, 'has failed');
   });

  job.save(); 
}

var kue = require('kue');

//create a queue instance
var queue = kue.createQueue();

function processJobs() {
  //process jobs in the queue with the type scraper
  queue.process('scraper', function(job, done) {
    // scrapeHTML(job.data, done);

    console.log(`Job: ${job.id}, is done`);
    done && done();    
  });
}
   
setInterval(()=> newJob("1", "www.google.com"), 3000);
processJobs();




