//Importa servicios
const {buildPagination} = require('../services/buildPagination.js');
const {buildMenu} = require('../services/buildMenu.js');
const {getDayjsFormat} = require('../services/getDayjsFormat.js');
const {getMenuDate} = require('../services/getMenuDate.js');
const {getMenusBetween} = require('../services/getMenusBetween.js');


//Importa express
const express = require('express');
const routerMenu = express.Router();

//Importa informacion de los menus
const menus = require('../database/db_menus');

//Importa libreria para utilizar fechas
const dayjs = require('dayjs');

//Endpoint que envia como respuestas todos los menus en formato json
routerMenu.get('/', (req, res) => {
    res.status(200).json(menus);
});

//Endpoint que retorna el menu correspondiente al fecha de mañana
routerMenu.get('/coming',
        (req, res, next) => {
            queryIsNotEmpty = JSON.stringify(req.query) !== '{}';
            if(queryIsNotEmpty) next('route');
            else next();
        },
        (req, res, next) => {
            let date = dayjs().add(1, 'day');
            let firstMenu = getMenuDate(date) || null;

            if(firstMenu === null){
                //Si no existe un menu entre las fechas ingresada entonces se envia un error 406
                res.status(406).json({Error: 'Menus between dates was not found'});
            }

            let firstMenuPaged = buildPagination(firstMenu, 1, date);

            res.header(`Access-Control-Allow-Origin`);
            res.status(200).send(firstMenuPaged);
});

//Endpoint que retorna un menu correspondiente a, la fecha de mañana sumado una cantidad de dias
routerMenu.get('/coming', 
        (req, res, next) => {
            existsPage = (JSON.stringify(req.query.page) || null) !== null;
            if(!existsPage) next('route');
            else next();
        },
        (req, res, next) => {
            let date = dayjs().add(req.query.page, 'day');

            let menu = getMenuDate(date) || null;

            if(menu === null){
                //Si no existe un menu para la pagina ingresada se envia un error 404
                res.status(404).json({Error: 'Not Found'});
            }
            
            const menuPaged = buildPagination(menu, req.query.page, date);

            res.header(`Access-Control-Allow-Origin`);
            res.status(200).send(menuPaged);
});

//Endpoint que recibe por query dos fechas y retorna los menus con fechas en el medio
routerMenu.get('/coming',
        (req, res, next) => {
            let date1 = dayjs(req.query.dateInit);
            let date2 = dayjs(req.query.dateEnd);

            if(date1 === null || date2 === null){
                //Si la fechas ingresadas no corresponde con el formato solicita, envia un error 400  
                res.status(400).json({Error: 'Date format is invalid, use YYYY-MM-DD'});
            }

            if(date1.isAfter(date2)){
                res.status(400).json({Error: 'Date initial is after date end'});
            }

            date2 = date2.add(1, 'day');

            let menus = getMenusBetween(date1, date2) || null;

            if(menus.length === 0){
                //Si no existe un menu entre las fechas ingresada entonces se envia un error 406
                res.status(406).json({Error: 'Menus between dates was not found'});
            }
            res.header(`Access-Control-Allow-Origin`);
            res.status(200).send(menus);
});

//Endpoint que le llega por parametro una fecha y retorna el menu de esa fecha si existe
routerMenu.get('/:date', (req, res) => {
    let date = dayjs(req.params.date);
    if(date === null){
        //Si la fecha ingresada no corresponde con el formato solicita, envia un error 400  
        res.status(400).json({Error: 'Date format is invalid, use YYYY-MM-DD'});
    }

    let menu = getMenuDate(date) || null;

    if(menu === null){
        //Si no existe un menu con la fecha ingresada entonces se envia un error 406
        res.status(404).json({Error: 'Not Found'});
    }

    res.header(`Access-Control-Allow-Origin`);
    res.status(200).send(menu);
});

//Endpoint que recibe en el body un menu y si los datos son validos crea un menu y lo almacena
//Envia como respuesta el menu que se almaceno
routerMenu.post('/', (req, res) => {
    console.log(req.body);
    let menu = buildMenu(req.body);

    if(menu.Error){
        //Como no cumple el formato requerido del menu, se envia un error 400 
        res.status(400).json(menu.Error);
    }

    let dateReq = getDayjsFormat(menu.fecha);
    let menuObtained = menus.find(menu => getDayjsFormat(menu.fecha).isSame(dateReq)) || null;

    if(menuObtained !== null){
        //Si existe un menu con la misma fecha, se envia un error 409
        res.status(409).json({Error:'Already menu with date loaded'});
    }

    menus.push(menu);

    res.header(`Access-Control-Allow-Origin`);
    res.status(201).json(menu);
});

module.exports = routerMenu;
