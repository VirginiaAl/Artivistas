const express = require('express');
const authRoutes = express.Router();  //CAMBIAR authRoutes A router

const User = require('../models/User');

const bcrypt = require('bcrypt');
bcryptSalt = 10;

authRoutes.get('/signup', (req, res) => {  //hacemos get para redirigirlo a la página de signup
  res.render('auth/signup');
});

authRoutes.post('/signup', (req, res) =>{                  //cambiar todo el post a promesas cuando pueda
  const { username, email, password } = req.body;

  if(!username || !email || !password){
    res.render('auth/signup', { message: 'Insert name, email and password' });
    return;
  }
  User.findOne({ email }, 'email', (err, user) => {
    if(user !== null){
      res.render('auth/signup', { message: 'The user already exists' });
      return;
    }
    const salt = bcrypt.genSanltSync(bcryptSalt);
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
        res.redirect('auth/login');
      }
    });

  });
});

module.exports = authRoutes;
