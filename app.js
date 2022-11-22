const express = require('express');
const app = express();
const PORT = process.env.port || 4000;

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

app.get('/*', (req, res) => {
    res.status(404).send('Error 404: Not Found');
});

app.listen(PORT, () => {
    console.log(`Server is running in ${PORT}`);
});
