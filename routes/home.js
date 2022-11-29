//Importa express
const express = require('express');
const routerHome = express.Router();

//Importa libreria path
const path = require('path');
routerHome.use(express.static('views'));

//Endpoint para mandar html con su css y js de la pestaña principal como respuesta
routerHome.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname,'../views/home/index.html'));
});

module.exports = routerHome;