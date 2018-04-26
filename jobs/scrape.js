const request = require('request');

/**
Scrapes a given url and returns a string of HTML
*/
let htmlToString = (url,id, done) => {

  //check if the url is missing http:// or https://
  if (!/^https?:\/\//i.test(url)) {
    url = 'http://' + url;
  }

  request(url, (error, response, html) => {
    //check for errors that occured when making request
    if (error) {
      return done(new Error("URL request error:", error));
      console.log();
    }
    else {
      //return the html string to callback
      done(null, html);
    }
    
  })

}

module.exports = {
  htmlToString
}