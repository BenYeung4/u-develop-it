const express = require("express");
const router = express.Router();

router.use(require("./candidateRoutes"));

//uses the party routes file
router.use(require("./partyRoutes"));

module.exports = router;
