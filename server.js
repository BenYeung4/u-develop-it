//npm install express
const express = require("express");

//MySQL database
const mysql = require("mysql2");

//add the ports for the server
const PORT = process.env.PORT || 3001;
const app = express();

//import the module in order for us to add more candidates, this is used hand to hand with the inputCheck express function below
const inputCheck = require("./utils/inputCheck");

//express.js middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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

//returning all candidates but its wrapped in an Express.js route
app.get("/api/candidates", (req, res) => {
  //   const sql = `SELECT * FROM candidates`;
  const sql = `SELECT candidates.*, parties.name 
             AS party_name 
             FROM candidates 
             LEFT JOIN parties 
             ON candidates.party_id = parties.id`;
  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

//return single candidate from the candidates table based on their id, we hard coded id = 1
// db.query(`SELECT * FROM candidates WHERE id = 1`, (err, row) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(row);
// });

//getting single candidate in express.js route
app.get("/api/candidate/:id", (req, res) => {
  //   const sql = `SELECT * FROM candidates WHERE id = ?`;
  const sql = `SELECT candidates.*, parties.name 
  AS party_name 
  FROM candidates 
  LEFT JOIN parties 
  ON candidates.party_id = parties.id 
  WHERE candidates.id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: row,
    });
  });
});

// Update a candidate's party
app.put("/api/candidate/:id", (req, res) => {
  const errors = inputCheck(req.body, "party_id");

  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }
  const sql = `UPDATE candidates SET party_id = ? 
                 WHERE id = ?`;
  const params = [req.body.party_id, req.params.id];
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      // check if a record was found
    } else if (!result.affectedRows) {
      res.json({
        message: "Candidate not found",
      });
    } else {
      res.json({
        message: "success",
        data: req.body,
        changes: result.affectedRows,
      });
    }
  });
});

//delete a candidate, ? is a place holder, for preparing, but we hardcoded 1 so it will delete id =1
// db.query(`DELETE FROM candidates WHERE id = ?`, 1, (err, result) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(result);
// });

// Delete a candidate with express.js route, can use insomnia to review this function
app.delete("/api/candidate/:id", (req, res) => {
  const sql = `DELETE FROM candidates WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.statusMessage(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({
        message: "Candidate not found",
      });
    } else {
      res.json({
        message: "sucessfully deleted",
        changes: result.affectedRows,
        id: req.params.id,
      });
    }
  });
});

//create/add a candidate
// const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected) VALUES(?,?,?,?)`;
// const params = [1, "Ronald", "Firbank", 1];

// db.query(sql, params, (err, result) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(result);
// });

// Create a candidate with the express
app.post("/api/candidate", ({ body }, res) => {
  const errors = inputCheck(
    body,
    "first_name",
    "last_name",
    "industry_connected"
  );
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }
  const sql = `INSERT INTO candidates (first_name, last_name, industry_connected, party_id) VALUES (?,?,?,?)`;
  const params = [
    body.first_name,
    body.last_name,
    body.industry_connected,
    body.party_id,
  ];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: body,
      changes: result.affectedRows,
    });
  });
});

//showing all the parties
app.get("/api/parties", (req, res) => {
  const sql = `SELECT * FROM parties`;
  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

//showing the single party
app.get("/api/party/:id", (req, res) => {
  const sql = `SELECT * FROM parties WHERE id = ?`;
  const params = [req.params.id];
  db.query(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: row,
    });
  });
});

//Deleting the parties
app.delete("/api/party/:id", (req, res) => {
  const sql = `DELETE FROM parties WHERE id = ?`;
  const params = [req.params.id];
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: res.message });
      // checks if anything was deleted
    } else if (!result.affectedRows) {
      res.json({
        message: "Party not found",
      });
    } else {
      res.json({
        message: "deleted",
        changes: result.affectedRows,
        id: req.params.id,
      });
    }
  });
});

//Default response for any other request(Not Found), meaning not supported by the app, always make sure this is at the end
app.use((req, res) => {
  res.status(404).end();
});

//function that will start the Express.js server on port 3001, always at the bottom
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
