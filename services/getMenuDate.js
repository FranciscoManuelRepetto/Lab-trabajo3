//Importa informacion de los menus
const menus = require('../database/db_menus');

const {getDayjsFormat} = require('../services/getDayjsFormat.js');

//Funcion que retorna el menu de una fecha especifica
const getMenuDate = (date) => {
    const menuFromDate = menus.find(menu => {
        const dateLook = getDayjsFormat(menu.fecha);
        return dateLook.isSame(date, 'day');
    });
    return menuFromDate;
};

module.exports.getMenuDate = getMenuDate;