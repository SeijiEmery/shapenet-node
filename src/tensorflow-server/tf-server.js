module.exports = { trainer, generator };
// const tf = require('tensorflow');

function trainer (args) { return new Trainer(args); }
function generator (args) { return new Generator(args); }

class Trainer {
    constructor (args) {
        console.log(`creating tf-trainer with args ${args}`);
    }
    train () {
        console.log(`training...`);
    }
}
class Generator {
    constructor (args) {
        console.log(`creating tf-generator with args ${args}`);
    }
    generate () {
        console.log(`generating...`);
    }
}
