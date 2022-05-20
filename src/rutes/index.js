const  { Router } = require('express');
const express = require('express');
const ruter = express.Router();

ruter.get('/',(req, res )=>{
    res.render('index.html')
});





module.exports = ruter;