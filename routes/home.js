const express = require('express');
const routerHome = express.Router();

const menus = require('../database/db_menus');

const dayjs = require('dayjs');
const path = require('path');
routerHome.use(express.static('views'));

routerHome.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'../views/home/index.html'));
});

module.exports = routerHome;