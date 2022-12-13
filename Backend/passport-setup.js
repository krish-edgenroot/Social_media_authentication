const passport = require('passport');
const isAutheticated = require('./index');
const db = require('./db.json');
const fs = require('fs');
require('dotenv').config();

const GoogleStrategy = require('passport-google-oauth20').Strategy;

let GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
let GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: "/google/callback"
},
   function (accessToken, refreshToken, profile, cb) {
    // console.log(accessToken,refreshToken,profile);
    // done(null,profile)
    let newData = {
      "isAuthenticated": true,
      "id": profile.id,
      "email": profile.emails[0].value,
      "emailVerified": profile.emails[0].verified,
      "avtar": profile.photos[0].value,
      "Name": profile.displayName
    }
    // console.log(JSON.stringify());
    // console.log(profile);
    fs.writeFileSync('db.json',JSON.stringify(newData));
    cb(null, profile);
  }
));

passport.serializeUser((user, done) => {
  done(null, user);
})
passport.deserializeUser((user, done) => {
  done(null, user);
})