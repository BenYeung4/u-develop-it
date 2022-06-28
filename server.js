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

//testing express, a GET test route, type in npm start and should see result in localhost:3001 on browser
// app.get("/", (req, res) => {
//   res.json({
//     message: "Hello World",
//   });
// });

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

//function that will start the Express.js server on port 3001, always at the bottom
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
