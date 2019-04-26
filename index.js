const readLine = require('./utils/readLine');
const getURL = require('./utils/getURL');
const fetch = require('./utils/fetch');
const save = require('./utils/save');

(async () => {
    let config = await readLine();
    let url = await getURL(config);
    let result = await fetch(url);
    save(result);
})();