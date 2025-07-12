const posts = require("../data/posts");
const connection = require("../db/connection")

function index(req, res) {
  const sql = 'SELECT * FROM posts'
  connection.query(sql, (err, results)=> {
    if(err) return res.status(500).json({error: true, message: err.message})
    console.log(err)
    console.log(results)
    res.json(results)
  })
}


function show(req, res) {
  const id = parseInt(req.params.id);
  const sql = 'SELECT * FROM posts WHERE id = ?'
  connection.query(sql, [id], (err, results)=> {
    if (err) return res.status(500).json({error: 'Database Query Failed'})
      if (!results.length > 0) return res.status(404).json({error: 'Post not found'})
        res.json(results[0])
  })
}


function store(req, res) {
  console.log('This is the req.body')
  const {title, content, image} = req.body
  const sql = 'INSERT INTO posts (title, content, image) VALUES (?, ?, ?);'
  connection.query(sql, [title, content, image], (err, results)=> {
    if (err) return res.status(500).json({error: 'Database Query Failed'})
      console.log(results)
    res.status(201).json({id: results.insertId});
  })
}

function update(req, res) {
  const id = parseInt(req.params.id);
  const {title, content, image} = req.body
  const sql = 'UPDATE posts SET title = ?, content = ?, image = ? WHERE id = ?'
  connection.query(sql, [title, content, image, id], (err, results)=> {
    if (results.affectedRows === 0) {
      return res.status(404).json({
        error:true,
        message: 'Not Found'
      })
    }
    res.json({ message: 'Post update successfully'});
  })
}


function destroy(req, res) {
  const id = parseInt(req.params.id);
  const sql = 'DELETE FROM posts WHERE id = ?'
  connection.query(sql, [id], (err, results) =>{
    if (err) return res.status(500).json({error:'Failed to delete post'})
      console.log(results)
      res.sendStatus(204) 
    })
  }

module.exports = { index, show, store, update, destroy };
