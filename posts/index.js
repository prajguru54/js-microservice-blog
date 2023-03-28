const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
// import cors from 'cors'
const cors = require("cors");
const { json } = require("express");
// const uuid = require('uuid')
// const {randomBytes} = require('crypto')

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = 4000;

const posts = [];

//Get all posts
app.get("/posts", (req, res) => {
    res.send(posts);
});

//Create a post
app.post("/posts", async (req, res) => {
    const postId = Math.floor(Math.random() * 10000000);
    const post = { id: postId, title: req.body.title };
    console.log(`Post -- ${JSON.stringify(post)}`);
    posts.push(post);
    // posts[postId] = post

    //send the event to event-bus
    try {
        await axios.post("http://localhost:4005/events", {
            type: "PostCreated",
            data: JSON.stringify(post),
        });
    } catch {
        console.log("Error occurred while sending the event to event-bus");
    }

    res.send({ id: postId });
    // res.send(postId)
});

app.post("/events", async (req, res) => {
    console.log("Event received in post service");
    console.log(`Event data : ${JSON.stringify(req.body)}`);
    console.log("--------------------------");
    res.send({});
});

app.listen(PORT, () => {
    console.log(`App running on http://localhost:${PORT}`);
});
