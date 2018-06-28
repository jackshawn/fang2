const cities = require('../resource/city');
const log = '正在爬取链接:';

/**
 * 根据配置内容, 获取各房源平台的链接;
 * @param  {Object} config 控制台输入的配置内容;
 * @return {Object} 获取链接的函数对象;
 */

const getURL = config => {
    return {
        'www.lianjia.com': page => {
            let city = `https://${cities[config.city]['www.lianjia.com']}.ke.com/ershoufang/pg${page}`;
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
            let area_price = `ba${config.areaMin}ea${config.areaMax}bp${config.priceMin}ep${config.priceMax}/`
            console.log(log + city + tax_room + area_price)
            return city + tax_room + area_price;
        },
        'www.5i5j.com': page => {
            let city = `https://${cities[config.city]['www.5i5j.com']}.5i5j.com/ershoufang/`;
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
            let area_price = `l${config.areaMin}h${config.areaMax}b${config.priceMin}e${config.priceMax}n${page}/`
            console.log(log + city + tax_room + area_price)
            return city + tax_room + area_price;
        },
        'www.anjuke.com': page => {
            let city = `https://${cities[config.city]['www.anjuke.com']}.anjuke.com/sale/`;
            let room = {
                    '不限': '',
                    '一室': `b67-${page}/`,
                    '二室': `b69-${page}/`,
                    '三室': `b75-${page}/`
                }[config.room];
            let area_price = `?from_price=${config.priceMin}&to_price=${config.priceMax}&from_area=${config.areaMin}&to_area=${config.areaMax}`
            console.log(log + city + room + area_price)
            return city + room + area_price;
        },
        'www.58.com': page => {

        },
        'www.ganji.com': page => {

        },
        'www.focus.cn': page => {

        },
        'www.fang.com': page => {

        },
        'www.sofang.com': page => {

        },
    }
}

module.exports = getURL;
