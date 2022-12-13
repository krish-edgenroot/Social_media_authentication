const cookieSession = require('cookie-session');
const express = require('express');
const passport = require('passport');
const passportSetup = require('./passport-setup');
const authRoute = require('./route/auth');
const session = require('express-session');
const db = require('./db.json');
const cors = require('cors');
const app = express();

// app.use(cookieSession({name:"session",keys:['kai'],maxAge:1000*5*60}))
app.use(passport.initialize())
app.use(session({secret: 'keyboard cat',
resave: false,
saveUninitialized: true,
cookie: { secure: true }}))
// app.use(passport.session())
app.use(cors({
    origin:'http://localhost:3000',
    methods:'GET,POST',
    credentials:true
}))

app.get('',(req,res)=>{
    setTimeout(()=>{
        return res.json(db);
    },1000)
})

app.use('',authRoute);

app.listen('3001',()=>{console.log('server is running :)')})