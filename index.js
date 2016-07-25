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

 module.exports = {
    analyse: function(string) {
        return dracula(string, false);
    }
}
