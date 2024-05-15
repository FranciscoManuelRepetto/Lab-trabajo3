const getWeekDay = (fecha) => {
    const dias = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
    const numeroDia = new Date(fecha).getDay();
    return dias[numeroDia];
}

export const createDate = (fecha) => {
    let dd = fecha.day;
    let mm = fecha.month;
    let yyyy = fecha.year;
    let today = dd + '/' + mm + '/' + yyyy;
    let aux = yyyy+'-'+mm+'-'+dd+' 00:00:00';
    today = getWeekDay(aux)+' '+today;
    return today;
}