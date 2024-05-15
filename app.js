const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('views'));
app.use(express.json());

app.get('env')

//Cross origin policy
const corsOption = {
    origin:
        (origin, callback) => {
            //Mover a .env para prod
            const whiteList = process.env.WHITE_LIST.split(",");
            callback(null, whiteList);
        }
};
app.use(cors(corsOption));

// Routers

//Ruta de la pestaña del menu de hoy
const routerHome = require('./routes/home');
app.use('/', routerHome);

//Ruta de la pestaña de menu de proximos dias
const routerNextMeals = require('./routes/nextMeals');
app.use('/proxComedor',routerNextMeals);

//Ruta de los menus
const routerMenu = require('./routes/menus');
app.use('/api/menus', routerMenu);
app.use('/api/menus/coming', routerMenu);

//Ruta generica que redirige a un 404, para cualquier ruta no declarada arriba
app.get('/*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname,'./views/error404/error.html'));
});

app.listen(PORT,  () => {
    console.log(`Server is running in ${PORT}`);
});
