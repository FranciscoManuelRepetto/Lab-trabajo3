//Importa la libreria jsonschema
const { Validator } = require('jsonschema');
const validator = new Validator();

//Define tipo de datos de los elementos de la fecha
const dateSchema = {
    "id": "/DateSchema",
    "type": "object",
    "properties":{
        "year":{"type":"integer", "minimum":1},
        "month":{"type":"integer", "minimum":1, "maximum":12},
        "day":{"type":"integer", "minimum":1, "maximum":31}
    },
    "required": ["year", "month", "day"]
}

//Define tipo de datos de los elementos del submenu
const submenuSchema = {
    "id": "/SubmenuSchema",
    "type": "object",
    "properties":{
        "nombre":{"type":"string"},
        "ingredientes":{"type":"string"},
        "precio":{"type":"integer"},
        "precioCarnet":{"type":"integer"},
        "foto":{"type":"string"},
        "reservas":{"type":"integer"},
        "likes":{"type":"integer"}
    },
    "required": ["nombre", "ingredientes", "precio",
            "precioCarnet", "foto", "reservas", "likes"]
}

//Define tipo de datos de los elementos del menu completo
// Define tipo de datos de los elementos del menu completo
const menuSchema = {
    "id": "/MenuSchema",
    "type": "object",
    "properties": {
      "fecha": { "$ref": "/DateSchema" },
      "desayunos": {
        "type": "array",
        "minItems": 1,
        "maxItems": 2,
        "items": { "$ref": "/SubmenuSchema" }
      },
      "almuerzos": {
        "type": "array",
        "minItems": 1,
        "maxItems": 2,
        "items": { "$ref": "/SubmenuSchema" }
      },
      "meriendas": {
        "type": "array",
        "minItems": 1,
        "maxItems": 2,
        "items": { "$ref": "/SubmenuSchema" }
      }
    },
    "required": ["fecha", "desayunos", "almuerzos", "meriendas"]
};

validator.addSchema(dateSchema, '/DateSchema');
validator.addSchema(submenuSchema, '/SubmenuSchema');

//Funcion que verifica si el menu ingresado por parametro cuenta con datos validos
const checkMenu = (menu) => {
    let validate = validator.validate(menu, menuSchema, {required: true});

    if(validate.errors.length !== 0){
        throw new Error(validate.errors.toString());
    }

    return validate.valid
}

module.exports.checkMenu = checkMenu;