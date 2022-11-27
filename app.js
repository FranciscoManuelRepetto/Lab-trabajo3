const express = require('express');
const app = express();
const PORT = process.env.port || 3000;

const path = require('path');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('views'));
app.use(express.json());

// Routers
const routerHome = require('./routes/home');
app.use('/', routerHome);

const routerLogin = require('./routes/login');
app.use('/api/login', routerLogin);

const routerRegister = require('./routes/register');
app.use('/api/register', routerRegister);

const routerNextMeals = require('./routes/nextMeals');
app.use('/nextMeals',routerNextMeals);

const routerMenu = require('./routes/menus');
app.use('/api/menus', routerMenu);

app.get('/*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname,'./views/error404/error.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running in ${PORT}`);
});
