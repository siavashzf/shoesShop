const express = require('express');
const path = require('path');
const data = require('../models/data');
const router = express.Router();


router.put('/:id', (req, res) => {
    // res.send(req.body.stars, typeof(req.body.stars))
    const Products = data.one[req.params.id];

    Products.im.lableCss=req.body.lable;

    if(req.body.lable == "lable-black") Products.im.lableVal = "فروش";
    if(req.body.lable == "lable-white") Products.im.lableVal = "جدید";
    if(req.body.lable == "hiden") Products.lableVal = "";



    if(req.body.name){
        Products.im.title = `${req.body.name}`;
    }
    Products.im.price = `${req.body.price}`;
    let IMg = '';
    if(req.file){
        IMg = `images/items/${req.file.originalname}`;
    }else{
        IMg = Products.im.srcimg;
    }
    Products.im.srcimg = IMg;
    const stars = req.body.stars;
    switch (stars) {
        case '1':
            Products.im.detailsBox = [
                { title: "fa fa-star checked" },
                { title: "fa fa-star" },
                { title: "fa fa-star" },
                { title: "fa fa-star" },
                { title: "fa fa-star" },
            ];
            break;
        case '2':
            Products.im.detailsBox = [
                { title: "fa fa-star checked" },
                { title: "fa fa-star checked" },
                { title: "fa fa-star" },
                { title: "fa fa-star" },
                { title: "fa fa-star" },
            ];
            break;
        case '3':
            Products.im.detailsBox = [
                { title: "fa fa-star checked" },
                { title: "fa fa-star checked" },
                { title: "fa fa-star checked" },
                { title: "fa fa-star" },
                { title: "fa fa-star" },
            ];
            break;
        case '4':
            Products.im.detailsBox = [
                { title: "fa fa-star checked" },
                { title: "fa fa-star checked" },
                { title: "fa fa-star checked" },
                { title: "fa fa-star checked" },
                { title: "fa fa-star" },
            ];
            break;
        case '5':
            Products.im.detailsBox = [
                { title: "fa fa-star checked" },
                { title: "fa fa-star checked" },
                { title: "fa fa-star checked" },
                { title: "fa fa-star checked" },
                { title: "fa fa-star checked" },
            ];
            break;
        default:
            Products.im.detailsBox = [
                { title: "fa fa-star" },
                { title: "fa fa-star" },
                { title: "fa fa-star" },
                { title: "fa fa-star" },
                { title: "fa fa-star" },
            ];
            break;
    }
    // res.send(Products.im.price);
    // res.send((stars).toString());
    res.redirect('/');
});

router.post('/', (req, res) => {
    const Products = data.one;
    const name = (req.body.name).toString();
    const price = req.body.price;
    const lastItem = parseInt(Products.length);
    let IMg = '';
    if(req.file){
        IMg = `images/items/${req.file.originalname}`;
    }
    Products.push(
        {
            im: {
                number: lastItem,
                srcimg: IMg,
                title: name,
                detailsBox: [
                    { title: "fa fa-star" },
                    { title: "fa fa-star" },
                    { title: "fa fa-star" },
                    { title: "fa fa-star" },
                    { title: "fa fa-star" },
                ],
                price: `${price}`,
                del: "X",
                change: "ویرایش"
            }
        }
    )
    res.redirect('/');
});

router.delete('/:id', (req, res) => {
    const number = parseInt(req.params.id);
    const datats = data.one;
    const found = datats.some((element) => {
        return element.im.number === number;
    });
    if (found) {
        const index = datats.find((element) => {
            return element.im.number === number;
        });
        const item = index.im.number;
        for (let i = item + 1, max = datats.length; i < max; i += 1) {
            datats[i].im.number -= 1;
        }
        if (index) {
            datats.splice(item, 1);
        }
    }
    else {
        res.send("404 page not fount");
    }
    res.redirect('/');
});


module.exports = router