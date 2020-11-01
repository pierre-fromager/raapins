/**
 * Dater
 * 
 * provides accurate timestamp in ms
 * 
 */
export const dater = {
    ds: '-',
    ts: ':',
    zs: ' ',
    /**
     * leftPad
     * 
     * @param {Int} v
     * @param {String} l
     * @returns {String}
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
        const date = new Date();
        return date.getFullYear()
            + this.ds + this.leftPad(date.getMonth() + 1)
            + this.ds + this.leftPad(date.getDate())
            + this.zs + this.leftPad(date.getHours())
            + this.ts + this.leftPad(date.getMinutes())
            + this.ts + this.leftPad(date.getSeconds())
            + this.ts + this.leftPad(date.getMilliseconds(), '000');
    }
}
