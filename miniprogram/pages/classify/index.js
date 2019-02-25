const app = getApp();
var that
const db = wx.cloud.database()
Page({
  data: {
    loadModal:true,
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    navLeftItems: [],
    navRightItems: [],
    curNav: '',
    curIndex: 0
  },
  onLoad: function (options) {
    that = this;
    that.getClassify();
    that.getGoods();
  },
  //Classify
  getClassify: function (e) {
    wx.cloud.callFunction({
      name: "getClassify",
      data: {},
      success: res => {
        that.setData({
          loadModal: false,
          navLeftItems: res.result.data
        })
      }
    })
  },
  //Goods
  getGoods: function (e) {
    wx.cloud.callFunction({
      name:"getClassify",
      data:{},
      success:res =>{
        console.log(res)
      }
    })
  },
  classifyCompare: function (obj1, obj2) {
    if (obj1.id < obj2.id) {
      return -1;
    } else if (obj1.id > obj2.id) {
      return 1;
    } else {
      return 0;
    }
  }, 
  //事件处理函数
  switchRightTab: function (e) {
    let id = e.target.dataset.id,
      index = parseInt(e.target.dataset.index);
    this.setData({
      curNav: id,
      curIndex: index,
    })
  }
})