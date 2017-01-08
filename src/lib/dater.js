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
     * @param {type} v
     * @returns {String}
     */
    leftPad(v,l) {
        l = (l) ? l : '00';
        return (v + l).substring(0, l.length);
    },    
    /**
     * getDateTime
     * 
     * @returns {Number|String}
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