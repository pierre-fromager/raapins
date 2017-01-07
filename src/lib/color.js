/**
 * color
 * 
 */
const color = {
    /**
     * Ansi color codes
     */
    codes : {
        black : 0,
        red : 31,
        green : 32,
        orange : 33,
        blue : 34,
    },
    /**
     * Ansi styles codes
     */
    styles : {
        normal : 0,
        bold : 1,
        faint : 2,
        italic : 3,
        undeline : 4,
        slowblink : 5,
        rapidblick : 6,
        negative : 7,
        conceal : 8,
        crossedout : 9
    },
    /**
     * getAnsi returns ansi escape seq
     * 
     * @param {int} colorCode
     * @param {string} mode
     * @returns {String}
     */
    getAnsi(colorCode, mode){
        var primaryFont = 10;
        
        mode = (mode) 
            ? "\\x" + mode.toString(16)  + '['
            : '\x1b[';
        var cch = colorCode.toString(16);
        console.log('ccc : ' + cch);
        return mode + colorCode + 'm';
    },
    /**
     * get return ansi escaped text
     * 
     * @param {type} color
     * @param {type} text
     * @param {type} mode
     * @returns {String}
     */
    get(color, text, mode){
        console.log(this.getAnsi(color, mode));
        var colorizedText = this.getAnsi(color, mode) 
            + text 
            + this.getAnsi(this.codes.black);
        return colorizedText;
    },
}

module.exports = color;