const router = require("express").Router();

// Require routes from within api directory
const mealRoutes = require("./meals"); 

// Routes -- Appends api path to .../nomnom/...
router.use("/meals", mealRoutes); 

module.exports = router;
