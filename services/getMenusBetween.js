//Importa informacion de los menus
const menus = require('../database/db_menus');

const {getDayjsFormat} = require('../services/getDayjsFormat.js');

//Funcion que retorna los menus entre dos fechas especificas
const getMenusBetween = (date1, date2) => {
    const dateMenus = menus.filter(menu => {
        let dateLook = getDayjsFormat(menu.fecha);
        return  dateLook.isAfter(date1, 'day') &&
                dateLook.isBefore(date2, 'day');
    });
    return dateMenus;
};

module.exports.getMenusBetween = getMenusBetween;