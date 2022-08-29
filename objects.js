const car = {
    year: 2005,
    color: 'black',
    engine: 1.9,
    move: function () {
        console.log("Moving")
    },
    stop: function () {
        console.log("Stopping")
    },
    turn: function () {
        console.log("Turning")
    },
};

const fordCar = Object.create(car);
fordCar.mark = 'ford';
fordCar.model = 'galaxy';

const renaultCar = Object.create(car);
renaultCar.mark = 'renault';
renaultCar.model = 'stepway';

const comparedCarObj = createComparedObject(car);
const comparedFordObj = createComparedObject(fordCar);
const comparedRenaultObj = createComparedObject(renaultCar);

let carStr = createStrFromObj(comparedCarObj);
let fordStr = createStrFromObj(comparedFordObj);
let renaultStr = createStrFromObj(comparedRenaultObj);


function createStrFromObj(obj) {
    let str = JSON.stringify(obj);
    str = str.slice(1);
    str = str.slice(0, -1);
    str = str.split(',').sort().join(',');
    return str;
}

function createComparedObject(obj) {
    let comparedObject = {};
    for (let j in obj) {
        let value = obj[j];
        if (typeof value === 'function') {
            value = j;
        }
        if (typeof value === 'number') {
            value = value.toString();
        }
        if (obj.hasOwnProperty(j)) {
            comparedObject[j] = value;
        }
    }
    return comparedObject;
}