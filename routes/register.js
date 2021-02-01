
const express = require('express');
const path = require('path');
const router = express.Router();
const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const passport = require('passport');

router.get("/login",(req,res)=>{
    res.render('login.hbs')
})

router.post("/login",(req,res,next)=>{

    passport.authenticate('local',{

        successRedirect:'/admin',
        failureRedirect:'/register/login',
        failureFlash:true
    })(req,res,next);
   
   
    
})

router.get("/signup",(req,res)=>{
    res.render('signup')
})
router.get("/logout",(req,res)=>{
    
    req.logout();

    req.flash('success_msg','you are logOut !!!');
    
    res.redirect('login');
})

router.post("/signup",(req,res)=>{
   console.log(req.body); 
   const {name, email,password,confirmPassword }=req.body;
   let errors=[];

   if(!name || !email || !password || !confirmPassword){
    errors.push({msg:'All filds Required'});
   }

   if(password!==confirmPassword){
    errors.push({msg:'passwords not match'});
   }

   if(password.length< 8 ){
    errors.push({msg:'passwords should biger than 8 char'});
   }
   if(errors.length>0){
       res.render("signup",{errors,name ,email,password ,confirmPassword});
   }else{
        User.findOne({email:email})
        .then(user=>{
            if(user){
            errors.push({msg:'this email already exist'});
            res.render("signup",{errors,name ,email,password ,confirmPassword});
            }
            else{
                const newUser= new User({name ,email,password});
                bcryptjs.genSalt(10,(err,salt)=>{
                    if(err) throw err;

                    bcryptjs.hash(newUser.password,salt,(err,hash)=>{
                        if(err) throw err;
                        newUser.password=hash;
                        newUser.save()
                        .then(user=>{
                            req.flash('success_msg',"you are sign up")
                            res.redirect('login')
                        })
                        .catch(err=>console.log(err))
                    })
                })

            }
        })
   }

})

module.exports = router