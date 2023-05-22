const ejs = require('ejs');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Post = require('./models/Post');
const methodOverride = require('method-override');
const fs = require('fs');
const postControllers = require('./controllers/postControllers');
const pageControllers = require('./controllers/pageControllers');

const app = express();
mongoose.connect('mongodb://127.0.0.1:27017/pcat-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
//Template Engine
app.set('view engine', 'ejs');
// middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

// routs
app.post('/posts', postControllers.createPosts);
app.get('/', postControllers.getAllPosts);
app.put('/posts/:id', postControllers.updatePosts);
app.delete('/posts/:id', postControllers.deletePosts);
app.get('/posts/:id', postControllers.getPost);

app.get('/about', pageControllers.getAboutPage);

app.get('/add_post', pageControllers.getAddPage);

app.get('/post', pageControllers.getPostPage);

app.get('/posts/edit/:id', pageControllers.getEditPage);

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı..`);
});
