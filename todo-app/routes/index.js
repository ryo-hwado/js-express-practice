const express = require('express');
const router = express.Router();

const sqlite3 = require('sqlite3');

//データベースオブジェクトの取得
const db = new sqlite3.Database('db/todo-list-data.db');

let todos = [];

/* GET home page. */
router.get('/', function(req, res, next) {
  
  db.serialize(() => {
    db.all("SELECT * FROM todos", (err, rows) => {
      if(!err) {
        const data = {
          title: 'TODO メモ 一覧表示',
          todos: rows
        }
        res.render('index', data);
      }
    });
  });

});

router.post('/', function(req, res, next) {
  const todo = req.body.add;
  db.run('INSERT INTO todos (content) values (?)', todo);
  res.redirect('/');
});

module.exports = router;
