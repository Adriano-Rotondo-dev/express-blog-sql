const express = require("express");
const app = express();
const PORT = process.env.PORT || 3030;
const postsRouter = require("./routing/posts");

app.listen(PORT, () => {
  console.log(`Server is running on port https://localhost:${PORT}`);
});
app.use(express.static('public'))
app.use(express.json())

//TODO: ROUTES

app.get("/", (req, res) => {
  res.send("Wecolme to the POSTS API");
});

//*define posts router

app.use("/posts", postsRouter);
