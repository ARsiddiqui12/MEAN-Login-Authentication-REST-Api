const express = require("express");
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
//model
const User = require('../models/user');
const Contact = require('../models/contact');



//Register

router.post('/register',(req,res,next)=>{

let newUser = new User({

name:req.body.name,
email:req.body.email,
username:req.body.username,
password:req.body.password

});

User.addUser(newUser,(err,user)=>{

if(err){

res.json({success:false,msg:'Failed to register user'});

}else{

res.json({success:true,msg:'User Register Successfully!'});

}

});

});


//Authenticate
router.post('/authenticate',(req,res,next)=>{

    username = req.body.username;
    password = req.body.password;

    User.getUserByUsername(username,(err,user)=>{

        if(err) throw err;
        if(!user){
            return res.json({success:false,msg:'user not found!'});
        }

        User.comparePassword(password,user.password,(err,isMatch)=>{

            if(err) throw err;
            if(isMatch){

                const token = jwt.sign(user.toJSON(),config.secret,{
                        expiresIn:604800 //1 week
                });

                res.json({success:true,
                          token:'JWT '+token,
                          user:{
                          id:user._id,
                          name:user.name,
                          username:user.username,
                          email:user.email
                          }
                });

                

            }else{
                return res.json({success:false,msg:'wrong password!'}); 
            }

        });

    });

});


router.post('/contact',(req,res,next)=>{

let newContact = new Contact({

name:req.body.name,
email:req.body.email,
message:req.body.message

});


Contact.addContact(newContact,(err,contact)=>{

if(err){

res.json({success:false,msg:'Failed to register user'});

}else{

res.json({success:true,msg:'User Register Successfully!'});

}

});



});

//profile
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({
        user: req.user
    })
})



module.exports = router;