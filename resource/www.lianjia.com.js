const https = require('https');
const cheerio = require('cheerio');

let result = [];
let page = 1;
const total = 30;

const fetch = (url) => {
    return new Promise((resolve, reject) => {
        let newURL = url.replace(/PAGE/g, page);
        console.log('正在爬取:' + newURL)

        https.get(newURL, res => {
            let html = '';
            res.on('data', data => {
                html += data;
            });
            res.on('end', () => {
                let $ = cheerio.load(html);
                let items = $('.sellListContent li.clear');
                for(let i = 0; i < items.length; i++){
                    result.push({
                        price: items.eq(i).find('.totalPrice span').text().trim(),
                        area: items.eq(i).find('.houseInfo').text().split('厅 | ')[1].trim().split('平米')[0],
                        location: items.eq(i).find('.positionInfo').text().trim(),
                        unitPrice: items.eq(i).find('.unitPrice span').text().trim().substr(2).split('元/平米')[0],
                        url: items.eq(i).find('a.CLICKDATA').attr('href'),
                        from: 'lianjia'
                    })
                }
                if(items.length === total) {
                // if(page < 3) {
                    page++;
                    resolve(fetch(url))
                } else {
                    resolve(result)
                }
            })
            res.on('error', e => {
                console.error('错误:' + e.message);
            });
        });
    })
}

module.exports = fetch