
import chaiPkg from 'chai';
import mochaPkg from 'mocha';
import { Router } from './Router.js';

const { expect, assert } = chaiPkg;
const { describe, it } = mochaPkg;

let routerInst;
const testMsg = {
    inst: 'Router instance',
    conf: 'Router config',
    instSuccMsg: 'Router instance Ok'
}

describe('test router', () => {

    beforeEach(() => {
        routerInst = new Router();
    })

    /*
    afterEach(function (done) {
        routerInst = null;
    });*/

    it(testMsg.inst, () => {
        expect(routerInst).to.be.an.instanceof(Router);
        assert.instanceOf(routerInst, Router, testMsg.instSuccMsg);
    });

    it(testMsg.conf, () => {
        expect(routerInst.config({ root: '/' })).to.be.an.instanceof(Router);
        assert.instanceOf(routerInst, Router, testMsg.instSuccMsg);
    });

});
