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
    connection.query(`
        INSERT IGNORE INTO meals(user_id, meal, prep_time, ingred1, ingred2, ingred3, ingred4, ingred5) 
        VALUES ('${req.body.uid}', 
        '${req.body.newMeal.meal}', 
        '${req.body.newMeal.prep_time}', 
        '${req.body.newMeal.ingred1}', 
        '${req.body.newMeal.ingred2}', 
        '${req.body.newMeal.ingred3}', 
        '${req.body.newMeal.ingred4}', 
        '${req.body.newMeal.ingred5}');`, (err, data) => {
        if (err) throw err;
        res.send(data);
    })
})

module.exports = router;
