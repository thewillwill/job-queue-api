const router = require("express").Router();
const scrapesController = require("../../controllers/scrapesController");


// Matches with "/api/scrapes"
router.get('/', scrapesController.findAll);

router.post("/", scrapesController.create);
//check for valid URL -> maybe check for http:// or https://
//create UUID
//send UUID and url scrape queue
//save id and url to database

// Matches with "/api/scrapes/:id"
router
    .route("/:id")
    .get(scrapesController.findById)
    .put(scrapesController.update) 
    .delete(scrapesController.remove);


module.exports = router;