//npm install express
const express = require("express");

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

//function that will start the Express.js server on port 3001, always at the bottom
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
