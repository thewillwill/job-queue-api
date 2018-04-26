const router = require("express").Router();
const validator = require('validator');
const { check, validationResult } = require('express-validator/check');
const scrapesController = require("../../controllers/scrapesController");

/**
* Match posts routes to /api/scrapes
* and check for valid URL in body
*/
router.post("/", [
  check('url', 'No URL provided').exists(),
  check('url', 'Invalid URL').custom((value, { req }) => validator.isURL(req.body.url))
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    //validation error
    return res.status(422).json({ errors: errors.mapped() });
  }
  //URL is valid
  //save the request to database
  scrapesController.create(req, res)
});

/**
* Matches with "/api/scrapes/:id"
* find scrape by ID and return status
*/
router.get('/:id', (req, res) => {
  check('id', "No id provided").exists();
  const id = req.params.id;
  scrapesController.findById(id, res);
});

module.exports = router;