// 代码中会兼容本地 service mock 以及部署站点的静态数据
export default {
  // GET POST 可省略
  'GET /api/goods': {
    data: {
      list: [
        {
          sn: 'SHD89SDJ0',
          imageUrl: 'https://cbu01.alicdn.com/img/ibank/2019/531/659/10434956135_1177513472.jpg',
          desc: 'V亚马逊爆款 新款吸盘磨刀器 韩国迷你钨钢磨刀器 家用户外便携',
          createdAt: '20230410',
        },
      ],
    },
  },
};
