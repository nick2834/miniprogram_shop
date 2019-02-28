const app = getApp();
var that;
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    list: [{
      title: '分类管理',
      img: 'https://image.weilanwl.com/color2.0/plugin/sylb2244.jpg',
      url: '../classify/index'
    },
    {
      title: '商品管理',
      img: 'https://image.weilanwl.com/color2.0/plugin/wdh2236.jpg',
      url: '../list/index'
    }
    ]
  },
  onLoad: function (options) {

  },
})