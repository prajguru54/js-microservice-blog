const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = 4002;

const posts = {};

//Get all posts
app.get("/events", (req, res) => {
    res.send(posts);
});

app.post("/events", async (req, res) => {
    console.log("Event received in query service");
    console.log(`Event data : ${JSON.stringify(req.body)}`);
    console.log("--------------------------");

    let { type, data } = req.body.event;
    // console.log(`Data extracted- type:${type} data:${data}`)
    data = JSON.parse(data);

    if (type === "PostCreated") {
        const postId = data.id;
        const postTitle = data.title;
        posts[postId] = { postId: postId, content: postTitle, comments: [] };
    } else if (type === "CommentCreated") {
        const postId = data.postId;
        const post = posts[postId];
        console.log(post);
        const commentId = data.id;
        const commentText = data.commentText;
        post.comments.push({
            id: commentId,
            postId: postId,
            commentText: commentText,
        });
    }
    console.log(posts);

    res.send(posts);
    // res.send({id:postId})
    // res.send(postId)
});

app.listen(PORT, () => {
    console.log(`App running on http://localhost:${PORT}`);
});
