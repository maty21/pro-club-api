const express = require('express');
const { getResults, init } = require('./lib/results-collector');
const app = express();

const port = 8091

app.get('/', async (req, res) => res.json(await getResults()))

app.listen(port, () => console.log(`app listening on port ${port}!`))