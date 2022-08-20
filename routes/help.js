var express = require('express');
var router = express.Router();

/* GET  page. */
router.get('/', (req, res) => {
  console.log("request for help page");
  res.render('../views/pages/help', { pageTitle: "Help" });
});

module.exports = router;