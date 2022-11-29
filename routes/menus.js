//Importa express
const express = require('express');
const routerMenu = express.Router();

//Importa informacion de los menus
const menus = require('../database/db_menus');
const validator = require('../validate/ValidateMenus');

//Importa libreria para utilizar fechas
const dayjs = require('dayjs');

//Endpoint que envia como respuestas todos los menus en formato json
routerMenu.get('/', (req, res) => {
    res.status(200).json(menus);
});

//Endpoint que le llega por parametro una fecha y retorna el menu de esa fecha si existe
routerMenu.get('/:date', (req, res) => {
    let date = dayjs(req.params.date);
    if(date === null){
        //Si la fecha ingresada no corresponde con el formato solicita, envia un error 400  
        res.status(400).json({Error: 'Date format is invalid, use YYYY-MM-DD'});
    }

    let dateMenu = getMenuDate(date) || null;

    if(dateMenu === null){
        //Si no existe un menu con la fecha ingresada entonces se envia un error 406
        res.status(404).json({Error: 'Not Found'});
    }

    res.status(200).send(dateMenu);
});

//Endpoint que le llega por parametro dos fechas y retorna los menus con fechas en el medio
routerMenu.get('/:dateInit/:dateEnd', (req, res) => {
    let date1 = dayjs(req.params.dateInit);
    let date2 = dayjs(req.params.dateEnd);
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
    res.status(200).send(menus);
});

//Endpoint que recibe en el body un menu y si los datos son validos crea un menu y lo almacena
//Envia como respuesta el menu que se almaceno
routerMenu.post('/', (req, res) => {
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

    res.status(201).json(menu);
});

//Funcion que retorna un objeto daysjs con el formato YYYY/MM/DD
const getDayjsFormat = (dateJSON) => {
    return dayjs(`${dateJSON.year}-${dateJSON.month}-${dateJSON.day}`);
};

//Funcion que retorna el menu de una fecha especifica
const getMenuDate = (date) => {
    const dateMenus = menus.find(menu => {
        let dateLook = getDayjsFormat(menu.fecha);
        return dateLook.isSame(date, 'day');
    });
    return dateMenus;
};

//Funcion que retorna los menus entre dos fechas especificas
const getMenusBetween = (date1, date2) => {
    const dateMenus = menus.filter(menu => {
        let dateLook = getDayjsFormat(menu.fecha);
        return  dateLook.isAfter(date1, 'day') &&
                dateLook.isBefore(date2, 'day');
    });
    return dateMenus;
};

//Funcion para validar si el menu ingresado por parametro es valido
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

//Funcion para asignarle un id a cada submenu del menu ingresado por parametro
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