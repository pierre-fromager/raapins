
import chaiPkg from 'chai';
import mochaPkg from 'mocha';
import { Router } from './Router.js';

const { expect, assert } = chaiPkg;
const { describe, it } = mochaPkg;

let routerInst;

const instSuccMsg = 'Router is an instance of Router';

describe('test router', () => {

    beforeEach(() => {
        routerInst = new Router();
    })

    /*
    afterEach(function (done) {
        routerInst = null;
    });*/

    it('Router instance', () => {
        expect(routerInst).to.be.an.instanceof(Router);
        assert.instanceOf(routerInst, Router, instSuccMsg);
    });

    it('Router config', () => {
        expect(routerInst.config({ root: '/' })).to.be.an.instanceof(Router);
        assert.instanceOf(routerInst, Router, instSuccMsg);
    });

});
