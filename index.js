const csv = require('csvtojson');

const Types = Object.freeze({
    String: 'string',
    Bit: 'bit',
    Number: 'number',
    Character: 'character',
    Date: 'date'
});

function getPossibleTypes() {
    return {
        isBit: true,
        isNumber: true,
        isDate: true,
        isChar: true
    };
}

function isDate(str) {
    const date = new Date(str);
    return !isNaN(date.valueOf());
}

function updatePossibleTypes(possibleTypes, newData) {
    if (typeof possibleTypes === 'undefined') {
        possibleTypes = getPossibleTypes();
    }
    if (newData !== "") {
        if (newData != 0 && newData != 1) {
            possibleTypes.isBit = false;
        }
        if (isNaN(newData)) {
            possibleTypes.isNumber = false;
        }
        if (!isDate(newData)) {
            possibleTypes.isDate = false;
        }
        if (newData.length !== 1) {
            possibleTypes.isChar = false;
        }
    }

    return possibleTypes;
}

function getType({
                     isBit: isBit,
                     isNumber: isNumber,
                     isDate: isDate,
                     isChar: isChar
                 })
{
    if (isBit) {
        return Types.Bit;
    }
    if (isNumber) {
        return Types.Number;
    }
    if (isChar) {
        return Types.Character;
    }
    if (isDate) {
        return Types.Date;
    }
    return Types.String;
}

function getTypesFromTypeDictionary(typeDictionary) {
    const keys = Object.keys(typeDictionary);
    const types = keys.map(k => {
        const possibleTypes = typeDictionary[k];
        return [k, getType(possibleTypes)];
    });
    return types;
}

function getTypes(data, columns, typeDictionary) {
    data.forEach(d => {
        columns.forEach(c => {
            typeDictionary[c] = updatePossibleTypes(typeDictionary[c], d[c]);
        })
    });
    const types = getTypesFromTypeDictionary(typeDictionary);
    return types;
}

function getColumns(object) {
    return Object.keys(object);
}

async function read(filepath) {
    return await csv().fromFile(filepath);
}

exports.getTypesFromCSV = async function getTypesFromCSV(filepath) {
    const data = await read(filepath);
    let columns = getColumns(data[0]);
    let columnsWithTypes = getTypes(data.slice(1), columns, {});
    return columnsWithTypes;
};
