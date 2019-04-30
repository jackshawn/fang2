const {city, platform} = require('../resource/config');
const log = '正在爬取链接:';

/**
 * 根据配置内容, 获取各房源平台的链接;
 * @param  {Object} config 控制台输入的配置内容;
 * {
 *     city: '南京',
 *     platform: ['链家'],
 *     areaMin: '1',
 *     areaMax: '2',
 *     priceMin: '3',
 *     priceMax: '4',
 *     room: '不限',
 *     tax: '不限'
 * }
 * @return {Promise};
 */

module.exports = function(config) {
    let urls = {
        'www.lianjia.com': (() => {
            let target_city = `https://${city[config.city]['www.lianjia.com']}.ke.com/ershoufang/pgPAGE`;
            let tax_room = {
                    '不限': '',
                    '满五年': 'mw1',
                    '满两年': 'mw1ty1',
                }[config.tax] +
                {
                    '不限': '',
                    '一室': 'l1',
                    '二室': 'l2',
                    '三室': 'l3'
                }[config.room];
            let area_price = `ba${config.areaMin}ea${config.areaMax}bp${config.priceMin}ep${config.priceMax}/`;
            return target_city + tax_room + area_price;
        })(),
        'www.5i5j.com': (() => {
            let target_city = `https://${city[config.city]['www.5i5j.com']}.5i5j.com/ershoufang/`;
            let tax_room = {
                    '不限': '',
                    '满五年': 't16',
                    '满两年': 't8',
                }[config.tax] +
                {
                    '不限': '',
                    '一室': 'r1',
                    '二室': 'r2',
                    '三室': 'r3'
                }[config.room];
            let area_price = `l${config.areaMin}h${config.areaMax}b${config.priceMin}e${config.priceMax}nPAGE/`;
            return target_city + tax_room + area_price;
        })(),
    }
    let r = {}

    config.platform.forEach(i => {
        let name = platform[i]
        r[name] = urls[name]
    })
    return new Promise((resolve, reject) => {
        resolve(r)
    })
};
