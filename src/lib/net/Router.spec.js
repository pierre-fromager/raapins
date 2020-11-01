
import chaiPkg from 'chai';
import mochaPkg from 'mocha';
import { Router } from './Router.js';

const { expect,assert } = chaiPkg;
const { describe, it} = mochaPkg;

describe('test router', () => {

    it('router config', () => {
        const r = new Router();
        expect(r.config({ root: '/' })).to.be.an.instanceof(Object);
        assert.instanceOf(r, Router, 'chai is an instance of tea');
    });

});
