/**
 * profiler
 * 
 * is fluent profiler marker/calculator for ts marker
 * 
 */
const profiler = {
    
    /**
     * profiler stack container
     */
    stack: {},
    /**
     * nanotime 
     * return current time as nano time, dont care about SIG event
     * 
     * @returns {Int}
     */
    nanotime() {
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
        this.stack[markAdd] = this.nanotime();
        return this;
    },
    /**
     * remove
     * 
     * @param {String} markRemove
     * @returns {undefined}
     */
    remove(markRemove) {
        delete(this.stack[markRemove]);
        return this;
    },
    /**
     * reset
     * 
     * @returns {undefined}
     */
    reset() {
        this.stack = {};
        return this;
    },
    /**
     * elapse
     * 
     * @param {String} markin
     * @param {String} markout
     * @returns {Number}
     */
    elapse(markin, markout) {
        return this.stack[markout] - this.stack[markin];
    }
}

module.exports = profiler;