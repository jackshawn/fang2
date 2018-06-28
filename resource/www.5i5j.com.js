const https = require('https');
const cheerio = require('cheerio');

let result = [];
let page = 1;

const fetch5i5j = url => {
    console.log('正在爬取我爱我家房源...')
    return new Promise((resolve, reject) => {
        let hunt = () => {
            https.get(url(page), res => {
                let html = '';
                res.on('data', data => {
                    html += data;
                });
                res.on('end', () => {
                    let $ = cheerio.load(html);
                    let items = $('.pList li');
                    for(let i = 0; i < items.length; i++){
                        result.push({
                            price: items.eq(i).find('.redC strong').text().trim(),
                            area: items.eq(i).find('.listX p').eq(0).text().replace(/ /g,'').split('·')[1].trim().split('平米')[0],
                            location: items.eq(i).find('.listX p').eq(1).find('a').text().trim(),
                            unitPrice: items.eq(i).find('.jia p').eq(1).text().trim().substr(2).split('元/m²')[0],
                            url: 'https://nj.5i5j.com' + items.eq(i).find('.listTit a').attr('href'),
                            from: '5i5j'
                        })
                    }

                    if(items.length === 30) {
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
module.exports = fetch5i5j