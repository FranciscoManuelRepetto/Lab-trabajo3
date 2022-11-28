const express = require('express');
const routerHome = express.Router();

const path = require('path');
routerHome.use(express.static('views'));

routerHome.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname,'../views/home/index.html'));
});

module.exports = routerHome;