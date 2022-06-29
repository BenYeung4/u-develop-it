//adding the connections file
const db = require("./db/connection");

//npm install express
const express = require("express");

//most of the stuff have been transfered to the routes folder now
const apiRoutes = require("./routes/apiRoutes");

//add the ports for the server
const PORT = process.env.PORT || 3001;
const app = express();

//import the module in order for us to add more candidates, this is used hand to hand with the inputCheck express function below
const inputCheck = require("./utils/inputCheck");

//express.js middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//use this with ApiRouters
app.use("/api", apiRoutes);

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

//Default response for any other request(Not Found), meaning not supported by the app, always make sure this is at the end
app.use((req, res) => {
  res.status(404).end();
});

// Start server after DB connection
db.connect((err) => {
  if (err) throw err;
  console.log("Database connected.");
  //function that will start the Express.js server on port 3001, always at the bottom
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
