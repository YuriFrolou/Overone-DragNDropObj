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

const fordPropertiesArray = [];
const renaultPropertiesArray = [];

for (let j in fordCar) {
    let value = fordCar[j];
    if (typeof value === 'function') {
        value = j;
    }
    fordPropertiesArray.push(value);
}

for (let j in renaultCar) {
    let value = renaultCar[j];
    if (typeof value === 'function') {
        value = j;
    }
    renaultPropertiesArray.push(value);
}