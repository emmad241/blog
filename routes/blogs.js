var express = require('express');
var router = express.Router();
var Blog = require('../model/Blog').Blog;
var User = require('../model/User').User;

function formatDate(inputDate){
  let date, month, year;

  date = inputDate.getDate();
  month = inputDate.getMonth() + 1; // take care of the month's number here ⚠️
  year = inputDate.getFullYear();

  date = date
  .toString()
  .padStart(2, '0');

  month = month
  .toString()
  .padStart(2, '0');

  let formattedDate = `${date}/${month}/${year}`;
  return formattedDate;
}

router.get('/', (req, res) => {
  console.log('Request for blogs page recieved');

  let blog = Blog.all(rows =>{
      res.render('../views/pages/blogs', {blogs : rows, pageTitle : "Blogs"});
  });
});

router.get('/view/:id', (req, res) => {
  console.log('Request for view one blog recieved');
  const id = req.params.id;

  Blog.find(id)
  .then(blog => {
    res.render('../views/pages/view', {blog : blog, pageTitle : "View"});
    console.log(blog);
  }).catch(error =>{
    res.redirect('/blogs');
  }); 
});

router.post('/search', (req, res) => {
  console.log('Request for search one blog');
  const searchTerm = req.body.searchTerm;

  Blog.search(searchTerm)
  .then(blog => {
    console.log(blog.title);
    res.render('../views/pages/view', {blog : blog, pageTitle : "Search"});
  }).catch(error =>{
    res.render('../views/pages/404', {pageTitle : "404"});
  }); 
});

router.get('/delete/:id', (req, res) => {
  console.log('Request for delete one blog recieved');
  const id = req.params.id;

  Blog.find(id)
  .then(blog => {
    const username = String(blog.creator);
    const userCookie = req.cookies.username;
    
    if(userCookie == username){
      res.render('../views/pages/delete', {blog : blog, pageTitle : "Delete"});
    }else{
      res.redirect('/blogs');
    }
  }).catch(error =>{
    res.redirect('/blogs');
  }); 
});

router.post('/delete/:id', (req, res) => {
  const id = req.params.id;
  console.log("delete" + id);
  Blog.delete(id, (err, result) =>{
    if (err)
      console.error(err.message);
    res.redirect('/blogs');
  });
});

router.get('/create/', (req, res) => {
  console.log('Request for create one blog recieved');

  if(req.cookies.loggedin == "true"){
    res.render('../views/pages/create', {pageTitle : "Create"});
  }else{
    res.redirect('/blogs');
  }
  
});

router.post('/create/', (req, res) => {
  console.log('Request for create one blog recieved');

  const data = req.body;
  console.log(data);
  const creator = req.cookies.username;
  console.log(data.title);

  let date = formatDate(new Date());

  Blog.create(data, date, creator, (err, result) => {
    if (err)
      console.error(err.message);
    res.redirect('/blogs');
  });
});

router.get('/edit/:id', (req, res) => {
  console.log('Request for edit one blog recieved');
  const id = req.params.id;
  
  Blog.find(id)
  .then(blog => {
    const username = String(blog.creator);
    const userCookie = req.cookies.username;

    if(userCookie == username){
      res.render('../views/pages/edit', {blog : blog, pageTitle : "Edit"});
    }else{
      res.redirect('/blogs');
    }
  }).catch(error =>{
    console.log(error);
    res.redirect('/blogs');
  }); 
});

router.post('/edit/:id', (req, res) => {
  const id = req.params.id;
  const data = req.body;

  Blog.edit(data, id, (err, result) =>{
    if (err)
      console.error(err.message);
    res.redirect('/blogs');
  });
});

module.exports = router;