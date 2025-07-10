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
  // let filteredPosts = posts;
  // if (req.query.tags) {
  //   filteredPosts = posts.filter((post) => post.tags.includes(req.query.tags));
  // }
  // res.json(filteredPosts);

function show(req, res) {
  const id = parseInt(req.params.id);
  const sql = 'SELECT * FROM posts WHERE id = ?'
  connection.query(sql, [id], (err, results)=> {
    if (err) return res.status(500).json({error: 'Database Query Failed'})
      if (!results.length > 0) return res.status(404).json({error: 'Post not found'})
        res.json(results[0])
  })
}
  // const post = posts.find((p) => p.id === id);
  // console.log(post);
  // if (!post) {
  //   return res.status(404).json({
  //     error: "Not Found",
  //     message: "Post not found",
  //   });
  // }
  // res.json(post);

function store(req, res) {
  const id = req.params.id;
  res.send(`Create a new post`);
}

function update(req, res) {
  const id = req.params.id;
  res.send(`Integral update of post with id: ${id}`);
}

function modify(req, res) {
  const id = req.params.id;
  res.send(`Partial modify of post with id: ${id}`);
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
  // const post = posts.find((p) => p.id === id);
  // if (!post) {
  //   return res.status(404).json({
  //     error: "Not Found",
  //     message: `Post with id ${id} not found`,
  //   });
  // }
  // const postIndex = posts.indexOf(post);
  // if (postIndex > -1) {
  //   posts.splice(postIndex, 1);
  // }
  // console.log(posts);
  // res.sendStatus(204);

module.exports = { index, show, store, update, modify, destroy };
