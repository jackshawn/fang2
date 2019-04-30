const fs= require('fs');
const opn = require('opn');
/**
 * 保存爬取结果为data.js, 用于index.html引入;
 * @param {Array} arr
 */
const save = arr => {
    console.log(`共${arr.length}条数据, 正在保存...`)
    fs.writeFile(('data.js'), 'window.data = ' + JSON.stringify(arr), err => {
        if(err) throw err;
        opn('index.html', {wait: false})
    });
}

module.exports = save