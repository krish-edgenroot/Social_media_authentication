const passport = require('passport');
const router = require('express').Router();
const db = require('../db.json');
const fs = require('fs');

router.get('/logout',(req,res)=>{
    let newData = {
        "isAuthenticated": false,
        "id": null,
        "email": null,
        "emailVerified": false,
        "avtar":null,
        "Name": null
    }
    fs.writeFileSync('db.json',JSON.stringify(newData));
    // req.logout(),
    return res.json(newData);
})
router.get('/login/failure',(req,res)=>{
    res.status(401).json({success:false,message:'failure'});
})

router.get('/google',passport.authenticate("google",{scope:["profile","email"]}))

router.get('/google/callback',passport.authenticate("google",{
    successRedirect:"http://localhost:3000/",
    failureRedirect:'/login/failure',
    successMessage:'Login'
}))

module.exports = router;