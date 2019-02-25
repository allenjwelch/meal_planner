const router = require("express").Router();

// Require routes from within api directory
const mealRoutes = require("./meals"); 
const userRoutes = require("./user"); 

// Routes -- Appends api path to .../nomnom/...
router.use("/meals", mealRoutes); 
router.use("/user", userRoutes); 

module.exports = router;
