const connection = require("../db/connection")

function index(req, res) {
  const sqlIndex = 'SELECT * FROM posts'
  connection.query(sqlIndex, (err, results)=> {
    if(err) return res.status(500).json({error: true, message: err.message})
    console.log(err)
    console.log(results)
    res.json(results)
  })
}


function show(req, res) {
  const id = parseInt(req.params.id);
  const sqlSinglePost = 'SELECT * FROM posts WHERE id = ?'
  connection.query(sqlSinglePost, [id], (err, results)=> {
    if (err) return res.status(500).json({error: 'Database Query Failed'})
      if (!results.length > 0) return res.status(404).json({error: 'Post not found'})
        res.json(results[0])
  })
}


function store(req, res) {
  console.log('This is the req.body')
  const {title, content, image} = req.body
  const sqlNewPost = 'INSERT INTO posts (title, content, image) VALUES (?, ?, ?);'
  connection.query(sqlNewPost, [title, content, image], (err, results)=> {
    if (err) return res.status(500).json({error: 'Database Query Failed'})
      console.log(results)
    res.status(201).json({id: results.insertId});
  })
}

function update(req, res) {
  const id = parseInt(req.params.id);
  const {title, content, image} = req.body
  const sqlUpdatePost = 'UPDATE posts SET title = ?, content = ?, image = ? WHERE id = ?'
  connection.query(sqlUpdatePost, [title, content, image, id], (err, results)=> {
    if (results.affectedRows === 0) {
      return res.status(404).json({
        error:true,
        message: 'Not Found'
      })
    }
    return res.json(results[0])
  })
}


function destroy(req, res) {
  const id = parseInt(req.params.id);
  const sqlDestroyPost = 'DELETE FROM posts WHERE id = ?'
  connection.query(sqlDestroyPost, [id], (err, results) =>{
    if (err) return res.status(500).json({error:'Failed to delete post'})
      console.log(results)
      res.sendStatus(204) 
    })
  }

module.exports = { index, show, store, update, destroy };
