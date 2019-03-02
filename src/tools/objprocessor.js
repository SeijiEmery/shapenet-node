module.exports = { process, reconstruct };
const THREE = require('three');
const OBJLoader = require('three-obj-loader');
OBJLoader(THREE);

function process (input, output) {
    console.log(`processing ${input} => ${output}`);
}
function reconstruct (input, output) {
    console.log(`reconstructing ${input} => ${output}`);
}


