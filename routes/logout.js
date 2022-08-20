var express = require('express');
var router = express.Router();

/* GET  page. */
router.get('/', (req, res) => {
  console.log("request for logout page");
  res.render('../views/pages/logout', { pageTitle: "Logout" });
});

router.post('/', (req,res) => {
  res.cookie("userid", null);
  res.cookie("loggedin", "false");
  res.redirect('/');
});

module.exports = router;