// 房源平台
const platform = {
    '链家': 'www.lianjia.com',
    '我爱我家': 'www.5i5j.com',
    // '安居客': 'www.anjuke.com',
    // '58同城': 'www.58.com',
    // '赶集网': 'www.ganji.com',
    // '搜狐网': 'www.focus.cn',
    // '房天下': 'www.fang.com',
    // '搜房网': 'www.sofang.com',
};

// 城市在不同平台上的拼音简写, 用于拼接URL
const city = {
    '北京': {
        'www.lianjia.com': 'bj',
        'www.5i5j.com': 'bj',
    },
    '南京': {
        'www.lianjia.com': 'nj',
        'www.5i5j.com': 'nj',
    },
};
module.exports = {
    city,
    platform
};
