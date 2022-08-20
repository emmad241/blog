var express = require('express');
var router = express.Router();

/* GET about page. */
router.get('/', (req, res) => {
  res.render('../views/pages/about', { pageTitle: "About" });
});

module.exports = router;