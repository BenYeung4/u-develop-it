const express = require("express");
const router = express.Router();
const db = require("../../db/connection");
const inputCheck = require("../../utils/inputCheck");

//for all the voters, also make it into decending order
router.get("/voters", (req, res) => {
  const sql = `SELECT * FROM voters ORDER BY last_name`;

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: "sucess",
      data: rows,
    });
  });
});

//gettting single voter
router.get("/voter/:id", (req, res) => {
  const sql = `SELECT * FROM voters WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "sucess",
      data: row,
    });
  });
});
module.exports = router;
