const express = require('express');

const router = new express.Router();

const Post = require('./../models/post');
const User = require('./../models/user');

router.get('/:userId', (req, res, next) => {
  const userId = req.params.userId;
  let user;
  User.findById(userId)
    .then(document => {
      user = document;
      return Post.find({ author: userId }).populate('author');
    })
    .then(posts => {
      res.render('profile', { user, posts });
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;
