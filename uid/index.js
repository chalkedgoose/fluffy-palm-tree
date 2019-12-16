/** Generates a URL Safe Unique ID String */
module.exports.generateID = function () {
    const bits = (Math.random() * 46656) | 0;
    const pre = `000${bits.toString(36)}`.slice(-3);
    const post = `000${bits.toString(36)}`.slice(-3);
    return pre + post;
}