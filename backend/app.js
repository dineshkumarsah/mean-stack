const express = require('express');
const bodyParser = require('body-parser')
const Post = require('./models/post')
const mongoose = require('mongoose')

const app = express();
mongoose.connect('mongodb+srv://dinesh123:dinesh123@cluster0.yflfo.mongodb.net/node-angular?retryWrites=true&w=majority').then(
  ()=>{
    console.log('connected to database');
  }
).catch(
  ()=>{
    console.log('connection faild');
  }
)


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save();
  console.log(post);
  res.status(201).json({
    message: 'Post added successfully'
  });
});

app.get('/api/posts',(req,res,next)=>{
Post.find().then(document=>{
  res.status(200).json({
    message: 'post fatch sucessfully',
    posts: document
  })
});

});


app.delete('/api/posts/:id',(req,res,next)=>{
  Post.deleteOne({_id:req.params.id}).then(()=>{
    console.log(req.params.id);
    res.status(200).json({message: "post deleted"})
  })

})



module.exports=app;
