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
        {
            id: 3,
            name: "meal 3", 
        },
        {
            id: 4,
            name: "meal 4", 
        },
        {
            id: 5,
            name: "meal 5", 
        },
        {
            id: 6,
            name: "meal 6", 
        },
        {
            id: 7,
            name: "meal 7", 
        },
        {
            id: 8,
            name: "meal 8", 
        },
        {
            id: 9,
            name: "meal 9", 
        },
        {
            id: 10,
            name: "meal 10", 
        }
    ]);
});

module.exports = router;
