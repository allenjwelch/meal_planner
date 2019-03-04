CREATE DATABASE meal_planner; 

USE meal_planner; 

CREATE TABLE users (
    id Int( 11 ) AUTO_INCREMENT NOT NULL,
    user VARCHAR( 255) NOT NULL,
    password VARCHAR( 255 ) NOT NULL,
    -- DATE 'YYYY-MM-DD'
    last_logged VARCHAR( 255 ) NOT NULL,
    meals_list VARCHAR(255), 
    PRIMARY KEY (id) 
);

CREATE TABLE meals (
    id INT(11) AUTO_INCREMENT NOT NULL, 
    user_id INT(11) NOT NULL, 
    meal VARCHAR(255) NOT NULL,
    prep_time INT(255),
    ingred1 VARCHAR(255), 
    ingred2 VARCHAR(255), 
    ingred3 VARCHAR(255), 
    ingred4 VARCHAR(255), 
    ingred5 VARCHAR(255), 
    FOREIGN KEY (user_id) REFERENCES users(id),
    PRIMARY KEY (id)
);

-- DEMO DATA
INSERT INTO users(user, password, last_logged, meals_list) VALUES ('demo', 'demo', 'Sun Mar 03 2019 15:18:16 GMT-0500', '1,2,3,4,5,6,7');

INSERT INTO meals(user_id, meal, prep_time)
VALUES (1, 'Vegetarian Chili', 45 ), 
(1, 'Tofu Stir Fry', 30 ),
(1, 'Soup and Salad', 30 ),
(1, 'Veggie Burgers', 45 ),
(1, 'Taco Salads', 20 ),
(1, 'Veggetti', 35 ),
(1, 'Homemade Pizza', 45 ),
(1, 'Buffalo Cauliflower', 30 ),
(1, 'Wildcard! (takout)', 20 ),
(1, 'Tofu Tikka Masala', 60 );

SELECT * FROM meal_planner.meals;
SELECT * FROM meal_planner.users;

SELECT * FROM meal_planner.meals where meal_planner.meals.user_id = meal_planner.users.id; 

-- SELECT * FROM table1 INNER JOIN table2 ON table1.column_name = table2.column_name;
SELECT * FROM meal_planner.meals INNER JOIN meal_planner.users ON meals.user_id = users.id;
SELECT * FROM meal_planner.meals INNER JOIN meal_planner.users ON meals.user_id = 1;

SELECT meals.id, meals.meal, meals.prep_time 
FROM meal_planner.meals 
INNER JOIN meal_planner.users 
ON meals.user_id = users.id;

SELECT meals.id, meals.meal, meals.prep_time 
FROM meal_planner.meals 
WHERE meals.user_id = 1;

SELECT * 
FROM meal_planner.meals 
WHERE meals.user_id = 1;

-- UPDATE `meal_planner`.`users` SET `meals_list`='1,2,3,4,5,6,7' WHERE `id`='1';
