var express = require('express');
var router = express.Router();
var User = require('../model/User').User;

/* GET  page. */
router.get('/', (req, res) => {
  res.render('../views/pages/registration', { pageTitle: "Registration" });
});

router.post('/', (req, res) => {
  const data = req.body;
  
  User.create(data, (err, result) =>{
    if (err)
      console.error(err.message);
    res.redirect('../');
  })
});

module.exports = router;