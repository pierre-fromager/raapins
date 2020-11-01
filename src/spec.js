
import chaiPkg from 'chai';
import mochaPkg from 'mocha';

const { expect } = chaiPkg;
const { describe, it } = mochaPkg;

describe('test suite', () => {
  it('true is true', () => {
    expect(true).to.eql(true);
  });

  it('false is false', () => {
    expect(false).to.eql(false);
  });
});
