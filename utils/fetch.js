let fetch = {
    // 'www.lianjia.com': require('../resource/www.lianjia.com'),
    'www.5i5j.com': require('../resource/www.5i5j.com'),
}

async function fetchAll(url) {
    let result = [];

    let platform = Object.keys(fetch);
    for(let i = 0; i < platform.length; i++) {
        let fn = fetch[platform[i]]
        let newURL = url[platform[i]]
        result = result.concat(await fn(newURL))
    }
    return result;
}

module.exports = function(url) {
    return new Promise((resolve, reject) => {
        let result = fetchAll(url)
        resolve(result)
    })
}