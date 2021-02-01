module.exports={
    ensureAuth:(req,res,next)=>{
        if(req.isAuthenticated()){
            return next();
        }
        else{
            req.flash('error',"Please Log In First");
            res.redirect("/register/login");
        }
    }
}