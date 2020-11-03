
import chaiPkg from 'chai';
import mochaPkg from 'mocha';
import { Router } from './Router.js';

const { expect, assert } = chaiPkg;
const { describe, it } = mochaPkg;

let routerInst;
const testMsg = {
    inst: 'Router instance',
    conf: 'Router config',
    clear: 'Router clearUri',
    instSuccMsg: 'Router instance Ok',
    clearUriMsg: 'Router clearUri Ok',
}

describe('Router', () => {

    beforeEach(() => {
        routerInst = new Router();
    })

    afterEach((done) => {
        routerInst = null;
        done();
    });

    describe('config', () => {

        it(testMsg.inst, () => {
            const exptected = '/';
            expect(routerInst).to.be.an.instanceof(Router);
            assert.instanceOf(routerInst, Router, testMsg.instSuccMsg);
            expect(routerInst.root).to.be.equal(exptected);
        });

        it(testMsg.conf, () => {
            const provider = '/test';
            const exptected = '/test/';
            expect(routerInst.config({ root: provider })).to.be.an.instanceof(Router);
            assert.instanceOf(routerInst, Router, testMsg.instSuccMsg);
            expect(routerInst.root).to.be.equal(exptected);
        });
    })

    describe('clearUri', () => {

        const routerClearUriDataProvider = [
            { p: '', r: '' },
            { p: '/', r: '' },
            { p: '/stat', r: 'stat' },
            { p: '/stat/girl', r: 'stat/girl' },
            { p: '/stat/girl/', r: 'stat/girl' },
            { p: '/api/v1/girl/10', r: 'api/v1/girl/10' },
            { p: '/api/v1/girl/10/', r: 'api/v1/girl/10' },
        ];

        routerClearUriDataProvider.forEach(({ p, r }) => {
            it(`${testMsg.clear} with '${p}' should return '${r}'`, () => {
                expect(routerInst.clearUri(p)).to.equal(r);
            });
        });
    })
});
