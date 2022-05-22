 
const express = require('express');
const app = express();
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const PassportLocal = require('passport-local').Strategy;
let PORT = 8080;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser('mi ultra hiper secreto'));
app.use(session({
    secret: 'mi ultra hiper secreto',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
  
passport.use(new PassportLocal(function(username, password, done){
    
    if(username === 'nicolas' && password === '12345678')
        return done(null, {id:1, name:'Cody'});
        
    done(null, false);
    
}));


passport.serializeUser(function(user, done){
    done(null, user.id);
});

passport.deserializeUser(function(id, done){
    done(null, {id:1, name:'Cody'});
});

app.get('/', (req, res,next) => {
    if(req.isAuthenticated()) return next();

    res.redirect('/login');

},(req, res) => {

   res.send('Hola Mundo');
});


app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
})); 
    



app.get('/login', (req, res) => {
    res.render('login')
});

 
app.listen(PORT, () => {
    console.log('Servidor corriendo en el puerto:', PORT);
});


