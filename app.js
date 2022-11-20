const express = require('express'); // Include ExpressJS
const app = express(); // Create an ExpressJS app
const port = 4000;
const bodyParser = require('body-parser'); // Middleware
const path = require('path');
const usuarios = require('./usuarios.json');
const { error } = require('console');

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('views'));
app.use(bodyParser.json());


// Route to Login Page
app.get('/api/login', (req, res) => {
    res.sendFile(path.join(__dirname,'/views/login.html'));
});

app.post('/api/login', (req, res) => {
    const legajo = req.body.legajo;
    const password = req.body.password;
    const resultado1 = usuarios.usuario.filter(usuario => usuario.legajo === legajo && usuario.password === password);
    console.log(resultado1);
    if (resultado1.length === 0) { 
        res.redirect('/api/login');
    }else{
        res.send(resultado1);
    }
});


// const express = require('express');
// const app = express();
// const port = 4000;
// const path = require('path');
// const bodyParser = require('body-parser');

// app.use(express.urlencoded({extended: true}));
// app.use(express.static('views'));
// app.use(bodyParser.json());




// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });

// app.get('/login', (req, res) => {
//     res.sendFile(path.join(__dirname,'/views/login.html'));//Dirname es el directorio raiz
// });

// app.post('/login/:legajo/:password', (req, res) => {
//     console.dir(req.body);
//     res.send("test");
    
//  });


