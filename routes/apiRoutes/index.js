const express = require("express");
const router = express.Router();

//retrieves the candidateroutes
router.use(require("./candidateRoutes"));

//uses the party routes file
router.use(require("./partyRoutes"));

//retrieves the voter routes
router.use(require("./voterRoutes"));

//retrieving and using the vote route
router.use(require("./voteRoutes"));

module.exports = router;
