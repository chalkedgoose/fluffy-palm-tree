
/** Generates a Unique ID String */
module.exports.generateID = function(){
    // A random number between 3 and 6 used to determine ID length 
    const randInt = Math.floor(Math.random() * (3 - 6 + 1)) + 3
    return [...Array(randInt).keys()]
    .map(String.fromCharCode(randInt(32, 100)))
    .join('');
}