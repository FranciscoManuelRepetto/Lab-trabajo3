const express = require('express');
const routerNextMeals = express.Router();

const menus = require('../database/db_menus');
const dayjs = require('dayjs');
const path = require('path');
routerNextMeals.use(express.static('views'));

routerNextMeals.get('/proxComedor', (req, res) => {
    res.sendFile(path.join(__dirname,'../views/proxComedor/proxComidas.html'));
});

routerNextMeals.get('/api/nextMeals', (req, res) => {
    let nextMenu = getNextMenus();
    if(nextMenu.length === 0){
        res.status(404).send('Error 404: Not Found');
    }
    res.status(200).send(nextMenu);
});    


const getNextMenus = () => {
    let today = dayjs();
    const next = menus.filter(menu => {
        let date = dayjs(`${menu.fecha.year}-${menu.fecha.month}-${menu.fecha.day}`);
        return date.isAfter(today, 'day');
    });
    return next;
};


module.exports = routerNextMeals;