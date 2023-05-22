const Post = require('../models/Post');
const fs = require('fs');

exports.getAllPosts = async (req, res) => {
  const posts = await Post.find({}).sort('-dateCreated');
  res.render('index', {
    posts,
  });
};

exports.getPost = async (req, res) => {
  // console.log(req.params.id)
  const post = await Post.findById(req.params.id);
  res.render('post', {
    post,
  });
};

exports.updatePosts = async (req, res) => {
  const post = await Post.findOne({ _id: req.params.id });
  post.name = req.body.name;
  post.message = req.body.message;
  post.save();

  res.redirect(`/posts/${req.params.id}`);
};

exports.deletePosts = async (req, res) => {
  await Post.findByIdAndRemove(req.params.id);
  res.redirect('/');
};

exports.createPosts = async (req, res) => {
  await Post.create(req.body);
  res.redirect('/');
};
