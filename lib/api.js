const axios = require('axios');
const axiosRetry = require('axios-retry');
const API_URL = 'https://www.easports.com/iframe/fifa17proclubs/api/platforms';
axiosRetry(axios, { retries: 5 });
let platformType = null;

function* values(obj) {
  for (let prop of Object.keys(obj)) yield obj[prop];
}

const newPlatformType = platform => platformType = platform;

const get = async (endpoint) => {
  try {
    const response = await axios.get(`${API_URL}/${platformType}/${endpoint}?filters=pretty,sum`);
    //return Array.from(values(response.data.raw))[0];
    return response.data
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  newPlatformType,
  get
};