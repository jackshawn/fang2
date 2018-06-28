const readLine = require('./utils/readLine');
const togetURL = require('./utils/togetURL');
const resource = require('./resource/resource');
const save = require('./utils/save');
const fetch = require('./resource/fetchAll');
const open = require('opn');

let result = [];


(async () => {
    let config = await readLine();
    let getURL = togetURL(config);
    for(let i = 0; i < config.resource.length; i++) {
        let a = config.resource[i]; // '链家' '我爱我家' ...
        let b = resource[a]; // 'www.lianjia.com' 'www.5i5j.com' ...
        let c = getURL[b]; // page => {return URL}
        result = result.concat(await fetch[b](c));
    }

    save(result);
    console.log('正在打开结果...')
    setTimeout(() => {open('./index.html', {wait: false})}, 1500)
})()