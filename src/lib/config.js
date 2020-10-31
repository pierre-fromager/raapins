
var config = {
    dirname : __dirname,
    server : {
        port : 8088
        , address : '127.0.0.1'
        , timeout : 500
        , startmessage : 'Listen'
        , messagestartend : '♬ ♫ ♬'
        , debug : true
    },
    process : {
        maxlisteners : 1000
    },
    get routes() {
        const routes = require('./routes.js');
        return routes;
    },
    getServerStartMessage: function() {
        return this.server.startmessage + '@' + this.server.address 
            + ':' + this.server.port + ' ' + this.server.messagestartend;
    }
};

module.exports = config