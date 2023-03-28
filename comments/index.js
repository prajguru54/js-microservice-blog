const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const axios = require('axios')
const app = express()
app.use(bodyParser.json())
app.use(cors())

const PORT = 4001

const comments = []

app.get('/comments', (req, res)=>{
    console.log(`All comments : ${JSON.stringify(comments)}`)
    res.send(comments)
})

app.get('/posts/:id/comments', (req, res)=>{
    console.log(`Postid: ${req.params.id}`)
    const commentsForPost = comments.filter((comment)=>comment.postId == req.params.id)
    console.log(commentsForPost)
    res.send(commentsForPost)
})

app.post('/posts/:id/comments', async (req, res)=>{
    const commentId = Math.floor(Math.random() * 10000000)
    const comment = {id:commentId, postId:req.params.id, commentText:req.body.text}
    // console.log(comment)
    console.log(`Request body: ${JSON.stringify(req.body)}`)
    // console.log(`comment text: ${JSON.stringify(req.body.text)}`)
    console.log(`comment text: ${req.body.text}`)
    comments.push(comment)

    await axios.post('http://localhost:4005/events', {
        type:"CommentCreated",
        data:JSON.stringify(comment)
    })

    res.send("OK")
})

app.post('/events', async (req, res)=>{
    console.log("Event received in comment service") 
    console.log(`Event data : ${JSON.stringify(req.body)}`)  
    console.log("--------------------------") 
    res.send({})
})


app.listen(PORT, ()=>{
    console.log(`App running on http://localhost${PORT}`)
})
