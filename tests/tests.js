const { expect, describe } = require('chai');
const { init, getResults } = require('../lib/results-collector');

//init();


describe('getResults', () => {
    it('simple', async () => {
        const res = await getResults()
        expect(res.ea).not.be.equal(null)
    });
});