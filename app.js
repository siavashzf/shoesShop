const path = require('path');
const express = require('express');
const hbs = require('hbs');
const multer = require('multer');
const bodyParser = require('body-parser');
const methodOverride= require("method-override");
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport')

//passport cnofig
require('./config/passport')(passport);

const app = express();
const port = process.env.PORT || 3003;




/// database
const URI="mongodb+srv://siavash:siavash7257482@cluster0.oth6f.mongodb.net/task?retryWrites=true&w=majority"
const mongoose = require('mongoose');
mongoose.connect(URI,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{console.log("mogodb conected")})
.catch(err=>console.log(err))
//session
app.use(session({
    secret:'secret',
    resave:true,
    saveUninitialized:true,
}));

///passport midelwer
app.use(passport.initialize());
app.use(passport.session());



///flash
app.use(flash());

//global
app.use((req,res,next)=>{
    res.locals.success_msg=req.flash("success_msg");
    res.locals.error_msg=req.flash("error_msg");
    res.locals.error=req.flash("error")
    next();
});
//method-override
app.use(methodOverride("_method"))
// body-parser
app.use(bodyParser.urlencoded({ extended: false }));
// hbs views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
// static file
app.use(express.static('public'));
// api

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join('public/images/items'))
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload = multer({ storage });

app.use('/register',require('./routes/register'))
app.use('/', require('./routes/main'));
app.use('/item', upload.single('fileupload'), require('./routes/item'));

app.listen(port, () => {
    console.log(`Port ${port} is runnimg`)
}); 
