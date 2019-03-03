const router = require("express").Router();
var connection = require("../../config/connection.js");

// Completes api path to .../nomnom/meals/...
router.get("/:uid", (req, res) => {
    console.log("Meals API has been hit");

    // console.log(req);
    // console.log(req.params);
    console.log(req.params.uid);
    connection.query(`
        SELECT * 
        FROM meal_planner.meals
        WHERE meals.user_id = ${req.params.uid};`, function(err, data) {
        if (err) throw err;
        console.log(data);
        res.send(data); 
    }); 
});

router.post('/new-meal', (req, res) => {
    console.log('API hit')
    console.log(req.body)

})

module.exports = router;
