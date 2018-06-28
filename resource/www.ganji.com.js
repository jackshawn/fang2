const http = require('http');
const cheerio = require('cheerio');

let result = [];
let page = 1;

const fetchGanji = url => {
    console.log('正在爬取赶集网房源...')
    return new Promise((resolve, reject) => {
        let hunt = () => {
            http.get(url(page), res => {
                let html = '';
                res.on('data', data => {
                    html += data;
                });
                res.on('end', () => {
                    let $ = cheerio.load(html);
                    let items = $('.f-main-list .f-list-item');
                    for(let i = 0; i < items.length; i++){
                        result.push({
                            price: items.eq(i).find('.js-price').text().trim(),
                            area: items.eq(i).find('.size>span').eq(2).text().split('㎡')[0],
                            location: items.eq(i).find('.address').text().replace(/ /g, '').replace(/\n/g, ''),
                            unitPrice: items.eq(i).find('.time').text().split('元/㎡')[0],
                            url: 'http://nj.ganji.com' + items.eq(i).find('a.js-title').attr('href'),
                            from: 'ganji'
                        })
                    }

                    if(items.length === 40) {
                        page++;
                        hunt();
                    } else {
                        resolve(result)
                    }
                })
                res.on('error', e => {
                    console.error('错误:' + e.message);
                });
            });
        }

        hunt()
    })
}
module.exports = fetchGanji