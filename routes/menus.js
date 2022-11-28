const express = require('express');
const routerMenu = express.Router();

const menus = require('../database/db_menus');
const validator = require('../validate/ValidateMenus');

const dayjs = require('dayjs');

routerMenu.get('/', (req, res) => {
    res.status(200).json(menus);
});

routerMenu.get('/:date', (req, res) => {
    let date = dayjs(req.params.date);
    if(date === null){
        res.status(400).json({Error: 'Date format is invalid, use YYYY-MM-DD'});
    }

    let dateMenu = getMenuDate(date) || null;

    if(dateMenu === null){
        res.status(404).json({Error: 'Not Found'});
    }

    res.status(200).send(dateMenu);
});

routerMenu.get('/:dateInit/:dateEnd', (req, res) => {
    let date1 = dayjs(req.params.dateInit);
    let date2 = dayjs(req.params.dateEnd);
    if(date1 === null || date2 === null){
        res.status(400).json({Error: 'Date format is invalid, use YYYY-MM-DD'});
    }

    if(date1.isAfter(date2)){
        res.status(400).json({Error: 'Date initial is after date end'});
    }

    date2 = date2.add(1, 'day');

    let menus = getMenusBetween(date1, date2) || null;

    if(menus.length === 0){
        res.status(406).json({Error: 'Menus between dates was not found'});
    }
    res.status(200).send(menus);
});

routerMenu.post('/', (req, res) => {
    let menu = buildMenu(req.body);

    if(menu.Error){
        res.status(400).json(menu.Error);
    }

    let dateReq = getDayjsFormat(menu.fecha);
    let menuObtained = menus.find(menu => getDayjsFormat(menu.fecha).isSame(dateReq)) || null;

    if(menuObtained !== null){
        res.status(409).json({Error:'Already menu with date loaded'});
    }

    menus.push(menu);

    res.status(201).json(menu);
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
    const dateMenus = menus.filter(menu => {
        let dateLook = getDayjsFormat(menu.fecha);
        return  dateLook.isAfter(date1, 'day') &&
                dateLook.isBefore(date2, 'day');
    });
    return dateMenus;
};

const buildMenu = (menuBody) => {
    try{
        validator.checkMenu(menuBody);
    }
    catch(err){
        return {"Error": `${err}`};
    }

    let menuJSON = setId(menuBody);

    return menuJSON;
};

const setId = (menuJSON) => {
    let times = ["desayunos","almuerzos","meriendas"];
    let date = `${menuJSON.fecha.year}-${menuJSON.fecha.month}-${menuJSON.fecha.day}`;
    for (let index = 0; index < 3; index++) {
        let menuSize = (menuJSON[times[index]]).length;
        
        for (let i = 0; i < menuSize; i++) {
            menuJSON[times[index]][i].id = `${date}${times[index]}${i}`;
        }
    }

    return menuJSON;
};

module.exports = routerMenu;