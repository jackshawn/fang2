const inquirer = require('inquirer');
const {city, platform} = require('../resource/config');

let areaMin = undefined;
let priceMin = undefined;

/**
 * 获取控制台输入;
 * @return {Promise};
 */

module.exports = function() {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'city',
            message: '选择目标城市',
            default: '南京',
            choices: Object.keys(city)
        },
        {
            type: 'checkbox',
            name: 'platform',
            message: '选择房源',
            default: Object.keys(platform),
            choices: Object.keys(platform)
        },
        {
            type: 'input',
            name: 'areaMin',
            message: '面积大小(m²), 最小:',
            validate(input) {
                let n = input * 1;
                if(!n){
                    return ' 请输入大于0的有效数值!!';
                } else {
                    areaMin = n;
                    return true;
                }
            }
        },
        {
            type: 'input',
            name: 'areaMax',
            message: '面积大小(m²), 最大:',
            validate(input) {
                let n = input * 1;
                if(!n || n <= areaMin){
                    return ` 请输入大于${areaMin}的有效数值!!`;
                } else {
                    return true;
                }
            }
        },
        {
            type: 'input',
            name: 'priceMin',
            message: '总价(万), 最小:',
            validate(input) {
                let n = input * 1;
                if(!n){
                    return ' 请输入大于0的有效数值!!';
                } else {
                    priceMin = n;
                    return true;
                }
            }
        },
        {
            type: 'input',
            name: 'priceMax',
            message: '总价(万), 最大:',
            validate(input) {
                let n = input * 1;
                if(!n || n <= priceMin){
                    return ` 请输入大于${priceMin}的有效数值!!`;
                } else {
                    return true;
                }
            }
        },
        {
            type: 'list',
            name: 'room',
            message: '选择房型',
            default: '不限',
            choices: [
                '不限',
                '一室',
                '二室',
                '三室'
            ]
        },
        {
            type: 'list',
            name: 'tax',
            message: '选择类型',
            default: '不限',
            choices: [
                '不限',
                '满两年',
                '满五年'
            ]
        },
    ])
};
