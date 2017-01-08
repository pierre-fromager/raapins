/**
 * color ANSI
 */
const color = {
    
    fg : 0,
    bg : 0,
    st : 0,
    /**
     * Ansi colors
     */
    codes : {
        black : 0,
        red : 1,
        green : 2,
        orange : 3,
        blue : 4,
    },
    /**
     * Ansi styles
     */
    styles : {
        normal : 0,
        bold : 1,
        faint : 2,
        italic : 3,
        underline : 4,
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
    getAnsi(code){
        return '\x1b[' + ((code => 30 && code <= 40) ? this.st : '') + code + 'm';
    },
    /**
     * get return ansi escaped text
     * 
     * @param {type} color
     * @param {type} text
     * @param {type} mode
     * @returns {String}
     */
    get(text, fg, bg, style) {
        this.setFg(fg).setBg(bg).setSt(style);
        return this.getAnsi(this.bg) + this.getAnsi(this.fg)
            + text
            + this.getAnsi(this.codes.black);
    },
    /**
     * setFg
     * 
     * @param {Int} color
     * @returns {nm$_color.color}
     */
    setFg(color){
        color = (color) ? color : 0;
        this.fg = 30 + color;
        return this;
    },
    /**
     * setBg
     * 
     * @param {Int} color
     * @returns {nm$_color.color}
     */
    setBg(color){
        color = (color) ? color : 0;
        this.bg = 40 + color;
        return this;
    },
    /**
     * setSt
     * 
     * @param {Int} style
     * @returns {nm$_color.color}
     */
    setSt(style){
        style = (this.isArray(style)) ? style.join(';') : style;
        this.st = (style) ? style + ';' : '';
        return this;
    },
    /**
     * isArray
     * 
     * @param {Variant} v
     * @returns {Boolean}
     */
    isArray(v) {
        return (!!v) && (v.constructor === Array);
    }
}

module.exports = color;