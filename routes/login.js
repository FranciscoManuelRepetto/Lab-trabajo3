const express = require('express');
const routerLogin = express.Router();
const path = require('path');

const usuarios = require('../database/db_users');

routerLogin.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'../views/login/login.html'));
});

routerLogin.post('/', (req, res) => {
    const legajo = req.body.legajo;
    const password = req.body.password;
    const resultado1 = usuarios.filter(usuario => usuario.legajo === legajo && usuario.password === password);
    console.log(resultado1);
    if (resultado1.length === 0) { 
        res.redirect('/api/login');
    }else{
        res.send(resultado1);
    }
});

module.exports = routerLogin;