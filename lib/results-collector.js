


const { run, stub } = require('./adapter');
const { getMixerResults } = require('./mixer/api');
const TIMEOUT = 10000;
let _cachedResults = { ea: null, mixer: null }


const resultTimeCollector = () => {
    setTimeout(async () => {
        try {
            await aggregate();

        } catch (error) {
            console.error('failed to fetch data')
        }
        finally {
            resultTimeCollector();
        }
    }, TIMEOUT);
}

const aggregate = async () => {
    const ea = await stub();
    const mixer = await getMixerResults();
    _cachedResults = { ea, mixer };
    return { ea, mixer };
}


const getResults = async () => {

    if (_cachedResults.ea === null && _cachedResults.mixer === null) {
        await aggregate();
    }
    resultTimeCollector();
    return _cachedResults;

}

getResults();


module.exports = { getResults, init: resultTimeCollector };