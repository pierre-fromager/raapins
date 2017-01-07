/**
 * profiler
 * 
 * calculate ellapse from 
 */
const profiler = {
    
    /**
     * profiler stack container
     */
    stack: {},
    /**
     * microtime 
     * return current ts as nano
     * in that case we dont care about SIG nature
     * 
     * @returns {Int}
     */
    microtime() {
        return process.hrtime()[1];
    },
    /**
     * get
     * returns either entire profiler stack or mark ts
     * 
     * @param {type} mark
     * @returns {nm$_profiler.profiler.stack}
     */
    get(mark) {
        return (mark) ? this.stack[mark] : this.stack;
    },
    /**
     * add
     * 
     * @param {String} markAdd
     */
    add(markAdd) {
        this.stack[markAdd] = this.microtime();
    },
    /**
     * remove
     * 
     * @param {String} markRemove
     * @returns {undefined}
     */
    remove(markRemove) {
        delete(this.stack[markRemove]);
    },
    /**
     * ellapse
     * 
     * @param {String} markin
     * @param {String} markout
     * @returns {Number}
     */
    ellapse(markin, markout) {
        return this.stack[markout] - this.stack[markin];
    }
}

module.exports = profiler;