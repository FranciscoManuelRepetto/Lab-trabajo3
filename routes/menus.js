const express = require('express');
const routerMenu = express.Router();

const menus = require('../database/db_menus');

const dayjs = require('dayjs');

routerMenu.get('/', (req, res) => {
    res.json(menus);
});

routerMenu.get('/:date', (req, res) => {
    let date = dayjs(req.params.date);
    if(date === null){
        res.status(400).json({Error: 'Date format is invalid, use YYYY-MM-DD'});
    }

    let todayMenu = getMenuDate(date) || null;

    if(todayMenu === null){
        res.status(404).json({Error: 'Not Found'});
    }

    res.status(200).send(todayMenu);
});

routerMenu.get('/:dateInit/:dateEnd', (req, res) => {
    let date1 = dayjs(req.params.dateInit);
    let date2 = dayjs(req.params.dateEnd);
    if(date1 === null && date2 === null){
        res.status(400).json({Error: 'Date format is invalid, use YYYY-MM-DD'});
    }

    if(date1.isAfter(date2)){
        res.status(400).json({Error: 'Date initial is after date end'});
    }

    let menus = getMenusBetween(date1, date2) || null;

    if(menus.length === 0){
        res.status(406).json({Error: 'Menus between dates was not found'});
        
    }
    res.status(200).send(menus);
});

routerMenu.post('/', (req, res) => {
    let dateReq = getDayjsFormat(req.body.fecha);
    let menuObtained = menus.find(menu => getDayjsFormat(menu.fecha).isSame(dateReq)) || null;

    if(menuObtained !== null){
        res.status(409).json({Error:'Already menu with date loaded'});
    }
    menus.push(req.body);
    res.status(201).json(menus);
});

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

const getMenusBetween = (date1, date2) => {
    const dateMenus = menus.findAll(menu => {
        let dateLook = getDayjsFormat(menu.fecha);
        return dateLook.isBetween(date1, date2, 'day');
    });
    return dateMenus;
};

module.exports = routerMenu;