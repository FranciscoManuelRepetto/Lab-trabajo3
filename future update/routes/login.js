const express = require('express');
const routerLogin = express.Router();
const path = require('path');

const usuarios = require('../database/db_users');

routerLogin.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'../views/login/login.html'));
});

//NUNCA SE DEBE HACER ESTO
//AQUI VA UN TOKEN
//POR MOTIVOS DE TIEMPO SE HIZO ASI
//NO IMPLEMENTAR EN EL MUNDO REAL JAMAS
let isLogged = false;

const killLogger = async () => {
    setTimeout(() => {isLogged = false}, 10*60000)
}

routerLogin.post('/', (req, res) => {
    if(!isLogged){
        let legajo = req.body.legajo;
        let password = req.body.password;
        const resultado1 = usuarios.filter(usuario => usuario.legajo === legajo && usuario.password === password);
        if (resultado1.length === 0) { 
            res.redirect('/api/login');
        }else{
            isLogged = true;
            killLogger();
            res.redirect('/api/menus');
        }
    }
});

routerLogin.get('/auth', (req, res) => {
    res.send(isLogged);
});

module.exports = routerLogin;