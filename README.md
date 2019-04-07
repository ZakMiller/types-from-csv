# Types From CSV

## Overview

types-from-csv is a package I wrote to help me infer SQL types given a CSV file. It's very rudimentary. It takes in the path to a CSV and returns a list of lists. Sample result:

```javascript
[
    ['columnOneName', 'bit'],
    ['columnTwoName', 'date'],
    ['columnThreeName', 'char'],
    ['columnFourName', 'number'],
    ['columnFiveName', 'string']
]

```

Currently, it only detects those types. 'string' is the fallback if nothing else matches.

## Usage

``` javascript
const csvTypes = require('csv-types');

const typeData = csvTypes.getTypesFromCSV('yourpath.csv');
console.log(typeData);
```

