
export class Router {
    
    constructor() {
        this.separator = '/';
        this.empty = '';
        this.routes = [];
        this.root = '/';
        this.server = null;
        this.match = false;
        this.req = null;
        this.uri = null;
        this.method = null;
     }
    config(options) {
        this.root = (options && options.root)
            ? this.separator + this.clearUri(options.root) + this.separator
            : this.separator;
        this.server = (options && options.server)
            ? options.server
            : this.server;
        return this;
    }
    clearUri(path) {
        return path.toString().replace(/\/$/, this.empty).replace(/^\//, this.empty);
    }
    add(method, reg, handler) {
        if (typeof reg == 'function') {
            handler = reg;
            reg = this.empty;
        }
        this.routes.push({ method: method, reg: reg, handler: handler });
        return this;
    }
    check(req) {
        this.req = req;
        this.uri = this.clearUri(req.url);
        this.method = req.method;
        let methodMatch = false;
        for (var i = 0; i < this.routes.length; i++) {
            methodMatch = (req.method == this.routes[i].method);
            this.match = this.uri.match(this.routes[i].reg);
            if (this.match && methodMatch) {
                this.match.shift();
                this.routes[i].handler.apply({}, this.match);
                return this;
            }
        }
        return this;
    }
}