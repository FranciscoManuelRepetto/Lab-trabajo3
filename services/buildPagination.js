const {getMenuDate} = require('../services/getMenuDate.js');

//Funcion que construye la respuesta json para paginado infinito
const buildPagination = (menuJSON, currentPage, currentDate) => {
    const newDate = currentDate.add(1, 'day');
    const nextMenu = getMenuDate(newDate) || null;

    const nextPage = nextMenu === null? "null" : '"'+process.env.URL_COMING+"?page="+(parseInt(currentPage)+1)+'"';
    
    const prevPage = currentPage === 1 ? "null" : '"'+process.env.URL_COMING+"?page="+(parseInt(currentPage)-1)+'"';
    
    const menuPaged = 
        '{"info": {"next":'+nextPage+', "prev":'+prevPage+'},'+
        '"result":'+JSON.stringify(menuJSON)+'}';
    return menuPaged;
};

module.exports.buildPagination = buildPagination;