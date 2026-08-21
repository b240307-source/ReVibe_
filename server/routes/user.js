const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/WrapAsync");
const passport = require("passport");
const User = require("../models/user.js");
const {saveRedirectUrl} = require("../middleware.js");
const {isLoggedIn} = require("../middleware.js");

router.get("/signup", (req,res)=>{
    res.render("user/signup.ejs");
});

router.post("/signup", async(req,res)=>{
    try {
        let {username, email, password, phone} = req.body;
        const newUser = new User({email, username, phone});
        const regUser = (await User.register(newUser, password));
        req.login(regUser, (err)=>{   //automatically login after signup
            if(err) {
                return next(err);
            }
            req.flash("success", "Welcome to ReVibe!");
        res.redirect("/listings");
        })
    } catch(e) {
        req.flash("failure",e.message);
        res.redirect("/signup");
    }
});

router.get("/login", (req,res)=>{
    res.render("user/login.ejs");
});

router.post("/login", saveRedirectUrl, passport.authenticate("local", {failureFlash:true, failureRedirect:"/login",}), wrapAsync(async (req,res)=>{
    req.flash("success", "Logged in successfully!!!");
    let redirectUrl = res.locals.redirectUrl || "/listings";  //Iske bina home page se login karne pe isLoggedIn trigger nahi hoga in middleware to redirectUrl empty hoga isiliye isse save karna zaroori hai
    res.redirect(redirectUrl);
}));

router.get("/logout", (req,res, next)=>{
    req.logOut((err)=>{
        if(err) {
            return next(err);
        }
        req.flash("success","Successfully logged out");
        res.redirect("/listings");
    });
});




module.exports = router;