const request = require('request');

/**
Scrapes a given url and returns a string of HTML
*/
let htmlToString = (url,id, done) => {

  //check if the url is missing http:// or https://
  if (!/^https?:\/\//i.test(url)) {
    url = 'http://' + url;
  }

  console.log("starting to scrape htmlToString for url:", url);

  request(url, (error, response, html) => {
    //check for errors that occured when making request
    if (error) {
      return done(new Error("URL request error:", error));
      console.log();
    }
    else {
      console.log("finished scraping done");
      //return the html string
      done(null, html);
    }
    
  })

}

module.exports = {
  htmlToString
}