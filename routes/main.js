const express = require('express');
const data = require('../models/data');
const router = express.Router();

function setlinkDecoration (route){
    for (let i = 0; i <data.nav.navMain.length; i++) {
        data.nav.navMain[i].Active="";
    }
    switch (route) {
        case '/':
            data.nav.navMain[0].Active="active";
            break;
        case '/pages':
            data.nav.navMain[1].Active="active";
                break;
        case '/price':
            data.nav.navMain[2].Active="active";
                break;
        case '/contact':
            data.nav.navMain[3].Active="active";
                break;

    
        default:
            break;
    }
}

router.get('/', (req, res) => {
    setlinkDecoration('/');
    res.render('index.hbs', {
        data
    })
});
router.get('/pages', (req, res) => {
    setlinkDecoration('/pages');
    res.render('pages.hbs', {
        data
    })
});
router.get('/price', (req, res) => {
    setlinkDecoration('/price');
    res.render('prices.hbs', {
        data
    })
});
router.get('/contact', (req, res) => {
    setlinkDecoration('/contact');
    res.render('contact.hbs', {
        data
    })
});



router.get('/search', (req, res) => {
    amoung = {
        im:[]
    };
    let min = parseInt(data.search[0]);
    let max = parseInt(data.search[1]);
    const Products = data.one;
    for (let i = 0; i < Products.length; i += 1) {
        let x = parseInt(Products[i].im.price);
        if (x <= max && x>=min) {
            amoung.im.push(Object.assign({}, Products[i]));
        }
    }
    res.render('search.hbs', {
        data,
        amoung
    })
});
router.post('/search', (req, res) => {
    const priceone = (req.body.priceone).toString();
    const pricetwo = (req.body.pricetwo).toString();
    data.search[0] = priceone;
    data.search[1] = pricetwo;
    // res.send(priceone);
    res.redirect('/search');
});

router.get('/change', (req, res) => {
    const caseObject = data.one[data.change]
    res.render('change.hbs', {
        data,
        caseObject
    })
});
router.post('/:id/change', (req, res) => {
    data.change = parseInt(req.params.id);
    res.redirect('/change');
});


module.exports = router
