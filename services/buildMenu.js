const {checkMenu} = require('../services/ValidateMenus.js');

//Funcion para asignarle un id a cada submenu del menu ingresado por parametro
const setId = (menuJSON) => {
    const times = ["desayunos","almuerzos","meriendas"];
    const date = `${menuJSON.fecha.year}-${menuJSON.fecha.month}-${menuJSON.fecha.day}`;
    for (let index = 0; index < 3; index++) {
        const menuSize = (menuJSON[times[index]]).length;
        
        for (let i = 0; i < menuSize; i++) {
            menuJSON[times[index]][i].id = `${date}${times[index]}${i}`;
        }
    }

    return menuJSON;
};

//Agregar fecha creacion "CreadoEn":"Date"
//Funcion para validar si el menu ingresado por parametro es valido
const buildMenu = (menuBody) => {
    try{
        checkMenu(menuBody);
    }
    catch(err){
        return {"Error": `${err}`};
    }

    const menuJSON = setId(menuBody);

    return menuJSON;
};

module.exports.buildMenu = buildMenu;
