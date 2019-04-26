const https = require('https');
const cheerio = require('cheerio');

let result = [];
let page = 1;

const fetchLianjia = url => {
    console.log('正在爬取链家房源...')
    return new Promise((resolve, reject) => {
        let hunt = () => {
            https.get(url(page), res => {
                let html = '';
                res.on('data', data => {
                    html += data;
                });
                res.on('end', () => {
                    let $ = cheerio.load(html);
                    let items = $('.sellListContent li');
                    for(let i = 0; i < items.length; i++){
                        result.push({
                            price: items.eq(i).find('.totalPrice span').text().trim(),
                            area: items.eq(i).find('.houseInfo').text().split('|')[2].trim().split('平米')[0],
                            location: items.eq(i).find('.houseInfo').text().split('|')[0].trim(),
                            unitPrice: items.eq(i).find('.unitPrice span').text().trim().substr(2).split('元/平米')[0],
                            url: items.eq(i).find('a.CLICKDATA').attr('href'),
                            from: 'lianjia'
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
module.exports = fetchLianjia