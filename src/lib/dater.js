/**
 * Dater
 * 
 */
const dater = {
    dsep : '-',
    tsep : ':',
    zop : ' ',
    zero : '0',
    ten : 10,
    /**
     * zPad
     * 
     * @param {type} v
     * @returns {String}
     */
    zPad(v) {
        return (v < this.ten) ? padvalue + v : v;
    },    
    /**
     * getDateTime
     * 
     * @returns {Number|String}
     */
    getDateTime() {
        var date = new Date();
        return date.getFullYear() + this.dsep + this.zPad(date.getMonth() + 1) 
            + this.dsep + this.zPad(date.getDate()) + this.zop + this.zPad(date.getHours()) 
            + this.tsep + this.zPad(date.getMinutes()) + this.tsep 
            + this.zPad(date.getSeconds()) + this.tsep + date.getMilliseconds();
    }
}

module.exports = dater;