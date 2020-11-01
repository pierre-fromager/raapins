
import { serviceStat } from './stat.js'

/**
 * serviceRest
 * 
 * rest service dealing rest requests without hook, returns 404 if no data.
 * 
 */
export default class serviceRest extends serviceStat {

    /**
     * constructor
     * 
     * to instanciate a service
     * 
     * @param {type} storage
     * @param {type} pK
     * @returns {nm$_rest.service}
     */
    constructor(storage, pK) {
        super(storage, pK);
    }

    /**
     * svcGet
     * 
     * returns existing data for given entity and id or all datas without params
     * 
     * @param {function} callback
     * @param {array} params
     * @returns {nm$_rest.service}
     */
    svcGet = (callback, params) => {
        const id = (params.id || null);
        const entityName = (params.entityName || null);
        callback = (callback || this.noop);
        let collection = [];
        if (id) {
            collection = this.setFilter(obj => obj.id == id).find();
        } else {
            collection = this.setFilter(obj => obj.entityName == entityName).find();
            collection = (collection.length > 0) ? collection : null;
        }
        callback(collection);
        return (this);
    };

    /**
     * svcPost
     * 
     * returns created data, entityName manadatory
     * 
     * @param {function} callback
     * @param {array} params
     * @returns {nm$_rest.service}
     */
    svcPost = (callback, params) => {
        callback = (callback || this.noop);
        const entity = {
            id: ++this.pK,
            entityName: params.entityName
        };
        this.storage[entity.id] = (params)
            ? this.hydrate(entity, params, true)
            : entity;
        callback(entity);
        return (this);
    }

    /**
     * svcDelete
     * 
     * delete existing data, entityName & id mandatories
     * 
     * @param {function} callback
     * @param {array} params
     * @returns {nm$_rest.service}
     */
    svcDelete = (callback, params) => {
        const id = (params.id || null);
        callback = (callback || this.noop);
        let svcity = (this.storage[id] || null);
        if (id && this.storage[id]) {
            delete this.storage[id];
        }
        callback(svcity);
        return (this);
    }

    /**
     * svcPut
     * 
     * totaly replace existing data, entityName & id mandatories
     * 
     * @param {function} callback
     * @param {array} params
     * @returns {nm$_rest.service}
     */
    svcPut = (callback, params) => {
        const id = (params.id || null);
        callback = (callback || this.noop);
        let collection = null;
        if (id && this.storage[id]) {
            collection = this.hydrate(this.storage[id], params, false);
        }
        callback(collection);
        return (this);
    };

    /**
     * svcPatch
     * 
     * update existing data, entityName & id mandatories
     * 
     * @param {function} callback
     * @param {array} params
     * @returns {nm$_rest.service}
     */
    svcPatch = (callback, params) => {
        const id = (params.id || null);
        callback = (callback || this.noop);
        let collection = null;
        if (id && this.storage[id]) {
            collection = this.hydrate(this.storage[id], params, true);
        }
        callback(collection);
        return (this);
    };
}

