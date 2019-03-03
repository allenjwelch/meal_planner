const router = require("express").Router();
var connection = require("../../config/connection.js");

// Completes api path to .../nomnom/user/...
router.get("/", (req, res) => {
    console.log("Users API has been hit");
    connection.query("SELECT * FROM users WHERE user = 'demo';", (err, data) => {
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
    console.log(req.body)
    connection.query(`
        INSERT IGNORE INTO users(user, password, last_logged) 
        VALUES ('${req.body.user}', '${req.body.pass}', '2019-02-26');`, (err, data) => {
        if (err) throw err;
        res.send(data);
    })
})

module.exports = router;
