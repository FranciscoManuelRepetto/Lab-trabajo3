const { Validator } = require('jsonschema');

const validator = new Validator();

const dateSchema = {
    "id": "/DateSchema",
    "type": "object",
    "properties":{
        "year":{"type":"integer", "minimun":1},
        "month":{"type":"integer", "minimun":1, "maximun":12},
        "day":{"type":"integer", "minimun":1, "maximun":31}
    },
    "required": ["year", "month", "day"]
}

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

const menuSchema = {
    "id": "/MenuSchema",
    "type": "object",
    "properties":{
        "fecha":{"$ref":"/DateSchema"},
        "desayunos":{
            "type":"array",
            "items":{
                "$ref":"/SubmenuSchema",
                "$ref":"/SubmenuSchema"
            }
        },
        "almuerzos":{
            "type":"array",
            "items":{
                "$ref":"/SubmenuSchema",
                "$ref":"/SubmenuSchema"
            }
        },
        "meriendas":{
            "type":"array",
            "items":{
                "$ref":"/SubmenuSchema",
                "$ref":"/SubmenuSchema"
            }
        }
    },
    "required": ["fecha", "desayunos", "almuerzos", "meriendas"]
}

validator.addSchema(dateSchema, '/DateSchema');
validator.addSchema(submenuSchema, '/SubmenuSchema');

const checkMenu = (menu) => {
    let validate = validator.validate(menu, menuSchema, {required: true});

    if(validate.errors.length !== 0){
        throw new Error(validate.errors.toString());
    }

    return validate.valid
}

module.exports.checkMenu = checkMenu;