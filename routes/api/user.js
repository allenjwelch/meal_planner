const router = require("express").Router();
var connection = require("../../config/connection.js");

// Completes api path to .../nomnom/user/...
router.get("/", function(req, res) {
    console.log("Users API has been hit");

    connection.query("SELECT * FROM users WHERE user = 'demo';", function(err, data) {
        if (err) throw err;
        res.send(data);
    }); 
    
    // TESTING ------
    // res.send([
    //     {
    //         id: 1,
    //         name: "user 1", 
    //     }, 
 
    // ]);
});

module.exports = router;
