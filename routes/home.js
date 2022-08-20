var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('../views/pages/home', { pageTitle: "Emma's Blog" });
});



module.exports = router;
