/**
 * cors
 * 
 */
class cors {

    /**
     * constructor
     * 
     * @returns {nm$_cors.cors}
     */
    constructor() {}

    /**
     * getHeaders
     * 
     * @returns {nm$_cors.cors.getHeaders.corsAnonym$0}
     */
    getHeaders() {
        return {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Credentials': false,
            'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE, PATCH',
            'Access-Control-Max-Age': '3600', // 1 hour
            'Access-Control-Allow-Headers': 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept',
            'Content-Type': 'application/json'
        }
    }

}

module.exports = cors;