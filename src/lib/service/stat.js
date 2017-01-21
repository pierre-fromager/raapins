const serviceManager = require('./manager');

/**
 * serviceStat
 * 
 */
class serviceStat extends serviceManager {
    
    /**
     * constructor
     * 
     * @param {type} storage
     * @param {type} pK
     * @returns {nm$_rest.service}
     */
    constructor(storage, pK) {
        super(storage, pK);
    }
    
    svcCount(callback, params) {
        let id = (params.id || null);
        let entityName = (params.entityName || null);
        callback = (callback || this.noop);
        let collection = null;
        if (id) {
            //collection = this.storage[id];
            collection = this.setFilter(function( obj ) {
                return (obj.id == id);
            }).find();
        } else {
            collection = [];
            for (var i = 1; i <= this.pK; i++) {
                if (this.storage[ i ]) {
                    if (this.storage[i]['entityName'] == entityName)
                        collection.push(this.storage[i]);
                }
            }
            collection = (collection.length > 0) ? collection : null;
        }
        callback(collection);
        return(this);
    };
}

module.exports = serviceStat;