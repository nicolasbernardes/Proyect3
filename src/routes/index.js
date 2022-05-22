const router = require('express').Router();
const passport = require('passport');

router.get('/', (req, res, next) => {
  res.render('index');
});

// crear usuario
router.get('/signup', (req, res, next) => {
  res.render('signup');
});

//escuchar los datos del usuario
router.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/profile',
  failureRedirect: '/signup',
  failureFlash: true
})); 


// login
router.get('/signin', (req, res, next) => {
  res.render('signin');
});

//escuchar los datos del usuario
router.post('/signin', passport.authenticate('local-signin', {
  successRedirect: '/profile',
  failureRedirect: '/signin',
  failureFlash: true
}));


router.get('/profile',isAuthenticated, (req, res, next) => {
  res.render('profile');
});


router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/');
});


function isAuthenticated(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }

  res.redirect('/')
}

module.exports = router;