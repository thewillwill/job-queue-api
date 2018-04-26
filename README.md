Job Queue API
==========


## Challenge 
>Create a job queue whose workers fetch data from a URL and store the results in a database. The job queue should expose a REST API for adding jobs and checking their status / results.

#### Example:
>User submits www.google.com to your endpoint. The user gets back a job id. Your system fetches www.google.com (the result of which would be HTML) and stores the result. The user asks for the status of the job id and if the job is complete, he gets a response that includes the HTML for www.google.com.

## Design
Each time a URL is submitted to the endpoint it is saved to a Mongodb database and an ID (generated by Mongodb) is returned in response. The url is saved with a `processed: false`, so that unprocessed records can be queried and reprocessed if ever required in the future.

After the record is stored in Mongodb a job is created using `Kue` with the `id` and `url`. Jobs are then processed by Kue, scraping the HTML and updating the Mongodb record with the `html` and setting the `processed: true`. These jobs are then removed from the Kue.

When a user checks the stsatus of the job, the id is used to query the Mongodb record and return the status and html if it has been processed.

## Technologies Used
- Node
- Redis (used by Kue)
- Mongodb

## File Structure

```
job-queue-api
  |-controllers
	 |---scrapesController      
  |-jobs           
     |---scrape.js 
     |---scrapeQueue.js 
  |-models              
     |---index.js
     |---scrape.js
  |-routes
  	 |---index.js              
     |---api
        |---index.js
        |---scrapes.js
  |-scripts
  	 |---seedDB.js
```

## Project Dependencies
- body-parser
- express
- express-validator
- kue
- mongoose
- request

## API Documention
### Post new URL
```
http://localhost:3001/api/scrapes/
```
The URL must be passed in the body as a POST request.
`{url: "www.google.com"}`
Upon success a message and job id will be returned

#### Example:
```
{
    "id": "5ae23b865cdb2c9614f2941d",
    "message": "URL being scraped, check back soon at /api/scrapes/5ae23b865cdb2c9614f2941d"
}
```

### Get job status
```
http://localhost:3001/api/scrapes/:id
```
If the job is complete a message and html will be returned.

#### Example:
```
{
   "message": "Job Complete",
   "html": "<!doctype html><html ......"
}
```

If the job is Not complete a message will be returned without HTML.

#### Example:
```
{
	"message": "Job not complete, please check back soon" }
}
```

## To Install
```
$ git clone https://github.com/thewillwill/job-queue-api
$ cd job-queue-api
$ yarn install
```

## To Run
Start Redis and Mongodb before running.
```
$ node server.js
```

## To Seed the Database with Unprocessed Records
```
$ yarn seed
```
Then on starting the server these records will be processed

## Future Improvements
- Add feature to check if URL already exists in database and return stored html without re-scraping. A flag could also be provided if the user wanted to force a re-scrape for an existing url.
- Add `/:id` post route so users can re-scrape html (update stored html) for an existing id
- Add extra validation to Mongoose schema
- Add version information to API

## Created By
* [William Brooks](https://github.com/thewillwill)