const router = require("express").Router();
const scrapesController = require("../../controllers/scrapesController");


// Matches with "/api/urls"
router.route("/")
    .get(scrapesController.findAll)
    .post(scrapesController.create);

// Matches with "/api/urls/:id"
router
    .route("/:id")
    .get(scrapesController.findById)
    .put(scrapesController.update)
    .delete(scrapesController.remove);


module.exports = router;