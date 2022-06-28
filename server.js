//npm install express
const express = require("express");

//MySQL database
const mysql = require("mysql2");

//add the ports for the server
const PORT = process.env.PORT || 3001;
const app = express();

//express.js middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Default response for any other request(Not Found), meaning not supported by the app
app.use((req, res) => {
  res.status(404).end();
});

//code that connects the application to MySQL database
const db = mysql.createConnection(
  {
    host: "localhost",
    //Your MySQL username for now it is root,
    user: "root",
    //Your MySQL password
    password: "Comefindme2!",
    database: "election",
  },
  console.log("Connected to the election database.")
);

//return all the data in the candidates table, query() method runs the SQL query and executes the callback with all the results rows that match the query.  call back function captures the response, if no err(error) and rows, which is the database query response.  if no errors in sql then err value is null.
// db.query(`SELECT * FROM candidates`, (err, rows) => {
//   console.log(rows);
// });

//return single candidate from the candidates table based on their id, we hard coded id = 1
// db.query(`SELECT * FROM candidates WHERE id = 1`, (err, row) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(row);
// });

//delete a candidate, ? is a place holder, for preparing, but we hardcoded 1 so it will delete id =1
// db.query(`DELETE FROM candidates WHERE id = ?`, 1, (err, result) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(result);
// });

//create/add a candidate
// const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected) VALUES(?,?,?,?)`;
// const params = [1, "Ronald", "Firbank", 1];

// db.query(sql, params, (err, result) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(result);
// });

//function that will start the Express.js server on port 3001, always at the bottom
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
