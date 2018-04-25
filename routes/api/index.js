const router = require("express").Router();
const scrapeRoutes = require("./scrapes");

// Articles routes
router.use("/scrapes", scrapeRoutes);

module.exports = router;
