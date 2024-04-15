const dayjs = require('dayjs');
//Funcion que retorna un objeto daysjs con el formato YYYY/MM/DD
const getDayjsFormat = (dateJSON) => {
    return dayjs(`${dateJSON.year}-${dateJSON.month}-${dateJSON.day}`);
};

module.exports.getDayjsFormat = getDayjsFormat;