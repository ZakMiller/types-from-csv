const csvTypes = require('./index.js');

csvTypes.getTypesFromCSV('2018pit.csv')
    .then(res => console.log(res));
