const router = require("express").Router();
// var connection = require("../config/connection.js");

// Completes api path to .../nomnom/meals/...
router.get("/", function(req, res) {
    // connection.query("SELECT * FROM tasks;", function(err, data) {
    //     if (err) throw err;
    // }); 
    console.log("Meals API has been hit");
    res.send([
        {
            id: 1,
            name: "meal 1", 
        }, 
        {
            id: 2,
            name: "meal 2", 
        }, 
    ]);
});

module.exports = router;
