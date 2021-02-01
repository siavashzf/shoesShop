
const paaport = require("passport")
const localSterategy = require('passport-local').Strategy

const bcryptjs = require('bcryptjs');

const User = require('../models/User');

module.exports=function (passport) {
  passport.use(
    new localSterategy({usernameField:'email',passwordField: 'password'},(email,password,done)=>{
       //Match User
       
       User.findOne({email:email})
       .then(user=>{
        
           if(!user){ 
               return done(null ,false,{message:'that email not sign up'});
              
           }
           //Match password
           bcryptjs.compare(password,user.password,(err,isMatch)=>{
               if(err) console.log (err);
               
               if(isMatch) return done(null,user) 
               return done(null ,false,{message:'incorrect password'});
           })
       })
       .catch(err=>console.log(err));


    })

  );

  passport.serializeUser((user, done) =>{
    done(null, user.id);
  });
  
  passport.deserializeUser((id, done)=> {
    User.findById(id, (err, user)=> {
      done(err, user);
    });
  });
}