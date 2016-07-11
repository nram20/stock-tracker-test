'use strict';


const express = require('express');

const request = require('request');


let router = express.Router();

let Stock = require('../models/stock');




router.get('/:sym', (req,res) => {
  request.get(`http://dev.markitondemand.com/MODApis/Api/v2/Quote/json?symbol=${req.params.sym}`, (err,response,body) => {
    if(err) return res.status(400).send(err);
    // console.log('body:', body);
    res.send(JSON.parse(body));
  });
});






module.exports = router;