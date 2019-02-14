const express = require('express');
const router = express.Router();
const path = require('path');
const User = require('../models/User');

const bcrypt = require('bcrypt');
const bcryptSalt = 10;

//Signup

router.get('/signup', (req, res, next) => {  //hacemos get para redirigirlo a la página de signup
  res.render('auth/signup');
});

router.post('/signup', (req, res, next) => {  //cambiar todo el post a promesas cuando pueda
   const { username, email, password } = req.body;

  if(username === "" || email === "" || password === ""){
    res.render('auth/signup', { message: 'Insert name, email and password' });
    return;
  }
  User.findOne({ email }, 'email', (err, user) => {

    if(user !== null){
      res.render('auth/signup', { message: 'The user already exists' });
      return;
    }
      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashPass
    });

    newUser.save((err) => {
      if(err) {
        res.render('auth/signup', { message: 'Something went wrong'});
      } else{
        res.redirect('/auth/login');
      }
     });

  });
 });

//Login

router.get('/login', (req, res, next) => {
  res.render('auth/login');
});

router.post('/login', (req, res, next) => {
console.log("cacahuete");
  const { username, email, password } = req.body;

  if(username === "" || email === "" || password === ""){
    res.render('auth/login', { message: "Please insert name, email and password"});
    return;
  }
  User.findOne({ 'email': email }, (err, user) => {
    if(err || !user) {
      res.render('auth/login', { message: 'The email doesn´t exist'});
      return;
    }
    if(bcrypt.compareSync(password, user.password)) {
      req.session.currentUser = user;
      res.redirect('/artist/artist');
    }else {
      res.render('auth/login', { message: 'Incorrect password'});
    }
  });

});

//Logout

router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('auth/home');
})

//HOME
router.get('/home', (req, res, next) => {
  res.render('auth/home');
})
module.exports = router;
