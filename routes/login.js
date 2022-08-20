var express = require('express');
var router = express.Router();
var User = require('../model/User').User;


/* GET login page. */
router.get('/', (req, res) => {
  res.render('../views/pages/login', { pageTitle: "Login" });
});

router.post('/', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log(username);
  
  User.find(username)
  .then(user => {
    if(user.username != username){
      res.redirect('/login');
    }else{
      if(user.password == password){
        res.cookie("userid", String(user.userid));
        res.cookie("username", user.username);
        res.cookie("loggedin", "true");
        res.redirect('/');
      }else{
        res.redirect('/login');
      }
    }
  }).catch(error =>{
    res.redirect('/login');
  }); 
});


module.exports = router;