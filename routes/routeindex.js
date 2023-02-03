const { render } = require('ejs');
const express = require('express');
const router = express.Router();
//const Task = require('../model/task');
const Post = require('../model/post');


router.get('/', async function(req,res){
  let posts = await Post.find({user_id: req.userId});
  res.render('index', {posts});
});


router.get('/newPost', async (req,res) =>{
  let posts = await Post.find({user_id: req.userId});
  res.render('newPost', {posts});
});

router.post('/newPost', async (req,res) =>{
  let posts = new Post(req.body);
  await posts.save();
  res.redirect('/');
})

router.get('/edit/:id', async (req,res) =>{
  let id = req.params.id;
  let posts = await Post.findById(id);
  res.render('edit', {posts});
})

router.post('/edit/:id', async (req,res) =>{
  let id = req.params.id;
  await Post.updateOne({_id: id}, req.body)
  res.redirect('/');
})

router.get('/delete/:id', async (req,res) =>{
  let id = req.params.id;
  await Post.remove({_id:id})
  res.redirect('/');
})



module.exports = router;