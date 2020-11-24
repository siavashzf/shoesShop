const path = require('path');
const express = require('express');
const hbs = require('hbs');
const multer = require('multer');
const bodyParser = require('body-parser');
const methodOverride= require("method-override");

const app = express();
const port = process.env.PORT || 3003;

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

app.use('/', require('./routes/main'));
app.use('/item', upload.single('fileupload'), require('./routes/item'));

app.listen(port, () => {
    console.log(`Port ${port} is runnimg`)
}); 
