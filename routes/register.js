const express = require('express');
const {body, validationResult} = require('express-validator');
const validLegajo = require('../validate/validator-legajo');

const routerRegister = express.Router();
const path = require('path');

const users = require('../database/db_users');


routerRegister.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'../views/register/register.html'));
});

const isUsed = (legajo) => {
    const index = users.findIndex(user => user.legajo === legajo);
   
    if(index >= 0){
        return true;
    }
    
    return false;
}

routerRegister.post('/',
    body('email').isEmail(),
    body('password').isLength({min: 8}),
    body('legajo').custom((legajo) => {
        console.log(isUsed(legajo));
        return validLegajo(legajo) && !isUsed(legajo)
    }
        ),
    (req, res) => {
        const error = validationResult(req);
        if(!error.isEmpty()){
            //return res.status(400).json({error: error.array()});
            console.log(error.array());
            res.redirect('/api/register');
        }
        else{
            users.push(req.body);
            res.json(users);
        }
});

module.exports = routerRegister;