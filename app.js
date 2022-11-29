const express = require('express');
const app = express();
const PORT = process.env.port || 3000;

const path = require('path');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('views'));
app.use(express.json());

// Routers

//Ruta de la pestaña del menu de hoy
const routerHome = require('./routes/home');
app.use('/', routerHome);

//Ruta de la pestaña de menu de proximos dias
const routerNextMeals = require('./routes/nextMeals');
app.use('/proxComedor',routerNextMeals);

//Ruta de la pestaña del menu de hoy
const routerMenu = require('./routes/menus');
app.use('/api/menus', routerMenu);

//Ruta generica que redirige a un 404, para cualquier ruta no declarada arriba
app.get('/*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname,'./views/error404/error.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running in ${PORT}`);
});
