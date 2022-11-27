const posibilities = ['FAI-', 'FAEA-', 'FAHU-', 'FAIN-'];

const validate = (legajo) => {
    const index = posibilities.findIndex(posibility => 
        legajo.toUpperCase().startsWith(posibility)
    );
    return index !== -1;
};

module.exports = validate;