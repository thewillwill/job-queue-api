const router = require("express").Router();
const scrapesController = require("../../controllers/scrapesController");
var validator = require('validator');
const { check, validationResult } = require('express-validator/check');

//Match posts routes to /api/scrapes
//check for valid URL
router.post("/", [
  check('url', 'No URL provided').exists(),
  check('url', 'Invalid URL').custom((value, { req }) => validator.isURL(req.body.url))
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.mapped() });
  }
  //URL is valid
  //save the request to database
  scrapesController.create(req, res)
});

// Matches with "/api/scrapes/:id"
router.get('/:id', (req, res) => {
  check('id', "No id provided").exists();
  const id = req.params.id;
  console.log('id', id)
  scrapesController.findById(id, res);

});


module.exports = router;