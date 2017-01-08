/**
 * Dater
 * 
 */
const dater = {
    dsep : '-',
    tsep : ':',
    zop : ' ',    
    /**
     * leftPad
     * 
     * @param {Int} v
     * @param {String} l
     * @returns {nm$_dater.exports.leftPad.l|dater.leftPad.l|@var;l|String}
     */
    leftPad(v, l) {
        l = (l) ? l : '00';
        return (v + l).substring(0, l.length);
    },    
    /**
     * getDateTime
     * 
     * @returns {String}
     */
    getDateTime() {
        var date = new Date();
        return date.getFullYear() 
            + this.dsep + this.leftPad(date.getMonth() + 1) 
            + this.dsep + this.leftPad(date.getDate()) 
            + this.zop + this.leftPad(date.getHours()) 
            + this.tsep + this.leftPad(date.getMinutes()) 
            + this.tsep + this.leftPad(date.getSeconds()) 
            + this.tsep + this.leftPad(date.getMilliseconds(), '000');
    }
}

module.exports = dater;