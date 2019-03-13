const router = require("express").Router();
var connection = require("../../config/connection.js");

// Completes api path to .../nomnom/user/...
router.get("/", (req, res) => {
    console.log("Users API has been hit");
    connection.query("SELECT * FROM users WHERE user = 'demo';", (err, data) => {
        if (err) throw err;
        res.send(data);
    }); 
});

router.get('/:uid', (req, res) => {
    connection.query(`
        SELECT * FROM users 
        WHERE id = '${req.params.uid}'; `, (err, data) => {
        if (err) throw err;
        res.send(data);
    }); 
})

router.get("/:user/:pass", (req, res) => {
    connection.query(`
        SELECT * FROM users 
        WHERE user = '${req.params.user}' 
        AND password = '${req.params.pass}';`, (err, data) => {
        if (err) throw err;
        res.send(data);
    }); 
})

router.post('/register', (req, res) => {
    console.log("POST user data: ", req.body)

    connection.beginTransaction(function(err) {
        if (err) throw err;

        connection.query(`
            SELECT * FROM users WHERE user = '${req.body.user}'`, function(err, result) {
            if (err) {
                console.log(err);
                return connection.rollback(function() {
                  throw err;
                });
            }

            if (result.length > 0) {
                console.log('User Exists')
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
                console.log('User does NOT exist')
                connection.query(`
                    INSERT INTO users(user, password, last_logged) 
                    VALUES ('${req.body.user}', '${req.body.pass}', '${req.body.currentDate}');`, (err, data) => {
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
        })
    })
})

router.put('/:uid', (req, res) => {
    console.log("PUT user data: ", req.body)
    connection.query(`
    UPDATE users
    SET last_logged = '${req.body.currentDate}'
    WHERE id = '${req.params.uid}';` , (err, data) => {
        if (err) throw err;
        res.send(data);
    })
})

router.put('/meals/:uid', (req, res) => {
    console.log("PUT user data: ", req.body)
    connection.query(`
    UPDATE users
    SET meals_list = '${req.body.currentMealPlan}'
    WHERE id = '${req.params.uid}';` , (err, data) => {
        if (err) throw err;
        res.send(data);
    })
})

module.exports = router;
