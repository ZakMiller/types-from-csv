# Types From CSV

## Overview

types-from-csv is a package I wrote to help me infer SQL types given a CSV file. It's very rudimentary. It takes in the path to a CSV and returns a list of objects of the form:

```javascript
[
    {name: 'columnOneName', type: 'bit'},
    {name: 'columnTwoName', type: 'date'},
    {name: 'columnThreeName', type: 'char'},
    {name: 'columnFourName', type: 'number'},
    {name: 'columnFiveName', type: 'string'}
]

```

Currently, it only detects those types. 'string' is the fallback if nothing else matches.

## Usage

``` javascript
const csvTypes = require('types-from-csv');

csvTypes.getTypesFromCSV('your-path.csv')
    .then(d => {
        console.log(d);
    });
```

