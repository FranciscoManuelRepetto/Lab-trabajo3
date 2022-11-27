const express = require('express');
const routerNextMeals = express.Router();

const path = require('path');
routerNextMeals.use(express.static('views'));

routerNextMeals.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'../views/proxComedor/proxComidas.html'));
});

module.exports = routerNextMeals;