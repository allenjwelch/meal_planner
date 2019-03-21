const router = require("express").Router();
var connection = require("../../config/connection.js");

// Completes api path to .../nomnom/meals/...
router.get("/:uid", (req, res) => {
    console.log("Meals API has been hit");

    // console.log(req);
    // console.log(req.params);
    console.log("uid:" , req.params.uid);
    connection.query(`
        SELECT * 
        FROM meals
        WHERE meals.user_id = ${req.params.uid};`, function(err, data) {
        if (err) throw err;
        // console.log(data);
        res.send(data); 
    }); 
});

router.post('/new', (req, res) => {
    console.log("POST meal data: ", req.body)

    connection.beginTransaction(function(err) {
        if (err) throw err;

        connection.query(`
            SELECT * FROM meals 
            WHERE meal = '${req.body.newMeal.meal}' 
            AND user_id = ${req.body.uid};`, function(err, result) {
            if (err) {
                console.log(err);
                return connection.rollback(function() {
                  throw err;
                });
            }

            console.log(result); 

            if (result.length > 0) {
                console.log('Meal Exists')
                connection.commit(function(err) {
                    if (err) {
                      return connection.rollback(function() {
                        throw err;
                      });
                    }
                });
                // res.json()
                res.end();
                return;
            } else {
                console.log('Meal does NOT exist')
                connection.query(`
                    INSERT INTO meals(user_id, meal, prep_time, ingred1, ingred2, ingred3, ingred4, ingred5, ingred6, ingred7, ingred8) 
                    VALUES ('${req.body.uid}', 
                    '${req.body.newMeal.meal}', 
                    '${req.body.newMeal.prep_time}', 
                    '${req.body.newMeal.ingred1}', 
                    '${req.body.newMeal.ingred2}', 
                    '${req.body.newMeal.ingred3}', 
                    '${req.body.newMeal.ingred4}', 
                    '${req.body.newMeal.ingred5}',
                    '${req.body.newMeal.ingred6}',
                    '${req.body.newMeal.ingred7}',
                    '${req.body.newMeal.ingred8}');`, (err, data) => {
                    if (err) throw err;
                    res.send(data);

                    connection.commit(function(err) {
                        if (err) {
                            console.log(err);
                            return connection.rollback(function() {
                                throw err;
                            });
                        }
                        console.log('success!');
                    });
                })
            }

        }); 

        connection.commit(function(err) {
            if (err) {
              return connection.rollback(function() {
                throw err;
              });
            }
        });

    }); 
})

router.put("/update", (req, res) => {
    console.log("Meals API has been hit");

    // console.log(req);
    // console.log(req.params);
    console.log("uid:" , req.body.uid);
    console.log("meal:" , req.body.updatedMeal);
    connection.query(`
        UPDATE meals SET 
        meal = '${req.body.updatedMeal.meal}', 
        prep_time = '${req.body.updatedMeal.prep_time}', 
        ingred1 = '${req.body.updatedMeal.ingred1}', 
        ingred2 = '${req.body.updatedMeal.ingred2}', 
        ingred3 = '${req.body.updatedMeal.ingred3}', 
        ingred4 = '${req.body.updatedMeal.ingred4}', 
        ingred5 = '${req.body.updatedMeal.ingred5}',
        ingred6 = '${req.body.updatedMeal.ingred6}',
        ingred7 = '${req.body.updatedMeal.ingred7}',
        ingred8 = '${req.body.updatedMeal.ingred8}' 
        WHERE user_id = '${req.body.uid}' 
        AND id = '${req.body.updatedMeal.id}';`, (err, data) => {
            if (err) throw err;
            res.send(data);
        }) 
});

module.exports = router;
