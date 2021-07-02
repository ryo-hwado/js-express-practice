const express = require('express');
const router = express.Router();

let todos = [];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'TODOリスト', 
    todos: todos});
});

router.post('/', function(req, res, next) {
  console.log(req.body);
  const todo = req.body.add;
  console.log(todo);
  todos.push(todo);

  res.redirect('/');
});


module.exports = router;
