const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const result = require('dotenv').config();

if (result.error) {
  console.error(result.error);
}

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/auth/google/callback",
    scope: ['profile','email']
  },
  function(accessToken, refreshToken, profile, done) {
    const email = profile._json.email;
    done(null, {email, profile});
  }
));

passport.serializeUser((user,done)=>{
    done(null, user);
});

passport.deserializeUser((user,done)=>{
    done(null, user);
})