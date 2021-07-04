const express = require('express');
const router = express.Router();

const sqlite3 = require('sqlite3');

// データベースオブジェクトの取得
const db = new sqlite3.Database('db/todo-list-data.db');

let todos = [];

// ルートディレクトリ配下のルーティング
// GET
router
.get('/', function(req, res, next) {  
  db.serialize(() => {
    db.all("SELECT * FROM todos", (err, rows) => {
      if(!err) {
        res.render('index', {
          title: 'TODO メモ 一覧表示',
          todos: rows
        });
      }
    });
  });
})
.post('/', function(req, res, next) {
  const todo = req.body.add;
  db.run('INSERT INTO todos (content) values (?)', todo, (err) => {
    if (!err) {
      res.redirect('/');
    }
  });
});

// /:id 以下のルーティングを指定
router
.get('/:id', function(req, res, next) {
  db.all("SELECT * FROM todos WHERE id = ?", req.params.id, (err, rows) => {
      if(!err) {
          res.render('edit', {
              title: "ID: " + req.params.id,
              todo: rows[0]
          });
      }
  });
})
.post('/:id', function(req, res, next) {
  db.run("UPDATE todos SET content = ? WHERE id = ?", req.body.modify ,req.params.id, (err, rows) => {
      if(!err) {
          res.redirect('/');
      }
  });
})
.get('/:id/delete', function(req, res, next) {
  db.run("DELETE FROM todos WHERE id = ?", req.params.id, (err, rows) => {
      if(!err) {
          res.redirect('/');
      }
  });
})

router.get('/favicon.ico', (req, res) => {
  res.sendFile("/public/favicon.ico");
});

module.exports = router;
