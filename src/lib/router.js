const router = {
    separator: '/',
    empty: '',
    routes: [],
    root: this.separator,
    server: null,
    match: false,
    req: null,
    uri: null,
    method: null,
    config: function (options) {
        this.root = (options && options.root)
            ? this.separator + this.clearUri(options.root) + this.separator
            : this.separator;
        this.sever = (options && options.server)
            ? options.server
            : this.sever;
        return this;
    },
    clearUri: function (path) {
        return path.toString().replace(/\/$/, this.empty).replace(/^\//, this.empty);
    },
    add: function (method, reg, handler) {
        if (typeof reg == 'function') {
            handler = reg;
            reg = this.empty;
        }
        this.routes.push({ method: method, reg: reg, handler: handler });
        return this;
    },
    check: function (req) {
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

module.exports = router;