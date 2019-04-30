const request = require('request');
const cheerio = require('cheerio');

let result = [];
let page = 1;
const total = 30;
let options = {
    url: '',
    headers: {
        'Connection': 'keep-alive',
        'Cache-Control': 'max-age=0',
        'Upgrade-Insecure-Requests': '1',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
        'Referer': 'https://nj.5i5j.com/ershoufang/a2p2r2t8/',
        'Accept-Language': 'zh,en;q=0.9,zh-CN;q=0.8',
        'Cookie': 'morCon=open; yfx_c_g_u_id_10000001=_ck18100619503612939715535153255; PHPSESSID=9inthubn2cv0dj7au46d4ojnoa; domain=nj; _ga=GA1.2.2093357451.1556626974; _gid=GA1.2.304438601.1556626974; yfx_f_l_v_t_10000001=f_t_1538826636291__r_t_1556626974137__v_t_1556626974137__r_c_4; Hm_lvt_94ed3d23572054a86ed341d64b267ec6=1556626975; _Jo0OQK=23028D1F9445D89F6105F37736E4A7C59D7765809EF111B1E4194F6671F549A06865A6A2AC02DBCFC560CDCFE7412DCF0AC02258DAA5359C6230248BC1F893FCC50320F815665BDDC96973DD699586A37A2973DD699586A37A228903DDB3C1C36CEE5CE5706E006946DGJ1Z1VA==; Hm_lpvt_94ed3d23572054a86ed341d64b267ec6=1556627110'
    }
};

const fetch = (url) => {
    return new Promise((resolve, reject) => {
        options.url = url.replace(/PAGE/g, page);

        request(options, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                let $ = cheerio.load(body);
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
                if(items.length === total) {
                    page++;
                    resolve(fetch(url))
                } else {
                    resolve(result)
                }
            }
        });
    })
}

module.exports = fetch