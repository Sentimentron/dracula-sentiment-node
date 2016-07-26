/**
 * Analyse a given sentence of text and attempt
 * to determine if it is positive or negative.
 *
 * Return values are 'positive', or 'negative'.
 * Other return values may be added in the future.
 *
 * @param {String} sentence
 * @return {String}
 */

var fs = require('fs');
var path = require('path');
// Dirty include format to keep the node.js version as 
// similar to the browser version as possible.
var numeric = require('numeric');

eval(fs.readFileSync(path.join(__dirname, 'dracula.params.js'))+'');
eval(fs.readFileSync(path.join(__dirname, 'dracula.embeddings.js'))+'');
eval(fs.readFileSync(path.join(__dirname, 'dracula.lstm.js'))+'');
eval(fs.readFileSync(path.join(__dirname, 'dracula.softmax.js'))+'');
eval(fs.readFileSync(path.join(__dirname, 'dracula.tokenize.js'))+'');
eval(fs.readFileSync(path.join(__dirname, 'dracula.js'))+'');

 module.exports = {
    analyze: function(string) {
        return dracula(string, false);
    }
}
