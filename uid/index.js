
/** Generates a Unique ID String */
module.exports.generateID = function(){
    // A random number between min and max used to determine ID length 
    const randInt =  (max, min) => Math.floor(Math.random() * (max - min + 1)) + min
    return [...Array(randInt(3, 5)).keys()]
    .map(String.fromCharCode(randInt(32, 100)))
    .join('');
}