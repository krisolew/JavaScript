const Module = require('./module');

/**first argument form command line */
var first = parseInt(process.argv[2]);
/**second argument form command line */
var second = parseInt(process.argv[3]);

const obiekt = new Module(first, second);
console.log(obiekt.sum());