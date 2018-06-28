const needle = require('needle');
const cheerio = require('cheerio');

let result = [];
let page = 1;

const fetchAnjuke = url => {
    console.log('正在爬取安居客房源...')
    return new Promise((resolve, reject) => {
        let hunt = () => {
            console.log('正在爬取第' + page + '页...');
            needle.get(url(page), {encoding:'gb2312'}, (error, response, body) => {
                if(error) {
                    console.log('error:' + error);
                } else {
                    let $ = cheerio.load(body);
                    let items = $('.houselist-mod li');
                    for(let i = 0; i < items.length; i++){
                        result.push({
                            price: items.eq(i).find('.price-det strong').text().trim(),
                            area: items.eq(i).find('.details-item span').eq(1).text().split('m²')[0].trim(),
                            location: items.eq(i).find('.comm-address').text().replace(/ /g, '').replace(/\n/g, ''),
                            unitPrice: items.eq(i).find('.unit-price').text().trim().split('元/m²')[0],
                            url: items.eq(i).find('a.houseListTitle').attr('href'),
                            from: 'anjuke'
                        })
                    }
                    if(items.length === 60) {
                        page++;
                        hunt();
                    } else {
                        resolve(result)
                    }
                }
            })
        }

        hunt()
    })
}
module.exports = fetchAnjuke;