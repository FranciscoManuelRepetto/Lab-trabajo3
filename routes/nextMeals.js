//Importa express
const express = require('express');
const routerNextMeals = express.Router();

//Importa libreria path
const path = require('path');
routerNextMeals.use(express.static('views'));

//Endpoint para mandar html con su css y js de las proximas comidas como respuesta
routerNextMeals.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'../views/proxComedor/proxComidas.html'));
});

module.exports = routerNextMeals;