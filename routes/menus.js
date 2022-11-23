const express = require('express');
const routerMenu = express.Router();

const menus = require('../database/db_menus');

const logger = require('./login')

const dayjs = require('dayjs');
const path = require('path');
const request = require('request');

routerMenu.get('/:date', (req, res) => {
    let todayMenu = getMenuDate(dayjs(req.body.date));
    if(todayMenu.length === 0){
        res.status(404).send('Error 404: Not Found');
    }
    res.status(200).send(todayMenu);
});

routerMenu.get('/', (req, res) => {
    res.json(menus);
});

routerMenu.post('/', (req, res) => {
    let dateReq = getDayjsFormat(req.body.fecha);
    let menuObtained = menus.find(menu => getDayjsFormat(menu.fecha).isSame(dateReq));
    if(menuObtained === null){
        menus.push(req.body);
        return res.status(200).json(menus);
    }
    res.status(503);
});

//FALTA PUT, PATCH Y DELETE

const getDayjsFormat = (dateJSON) => {
    return dayjs(`${dateJSON.year}-${dateJSON.month}-${dateJSON.day}`);
};

const getMenuDate = (date) => {
    const dateMenus = menus.find(menu => {
        let dateLook = getDayjsFormat(menu.fecha);
        return dateLook.isSame(date, 'day');
    });
    return dateMenus;
};

module.exports = routerMenu;