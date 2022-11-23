const express = require('express');
const routerHome = express.Router();

const menus = require('../database/db_menus');

const dayjs = require('dayjs');
const path = require('path');
routerHome.use(express.static('views'));

routerHome.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'../views/index-comedor/index.html'));
    //res.sendFile(path.join(__dirname,'../views/index-comedor/index.js'));
});

routerHome.get('/api/menus', (req, res) => {
    let todayMenu = getTodayMenus();
    if(todayMenu.length === 0){
        res.status(404).send('Error 404: Not Found');
    }
    res.status(200).send(todayMenu);
});    


const getTodayMenus = () => {
    let today = dayjs();
    const todayMenus = menus.find(menu => {
        let date = dayjs(`${menu.fecha.year}-${menu.fecha.month}-${menu.fecha.day}`);
        return date.isSame(today, 'day');
    });
    return todayMenus;
};


module.exports = routerHome;