const app = getApp();
var that;
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    TabCur: 0,
    VerticalNavTop: 0,
    loadModal:true
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      VerticalNavTop: (e.currentTarget.dataset.id - 1) * 50
    })
  },
  VerticalMain(e) {
    console.log(e.detail);
  },
  onLoad(){
    that = this;
    that.getClassify()
  },
  getClassify(){
    wx.cloud.callFunction({
      name:"classify",
      data:{
        method:"get"
      }
    }).then(res =>{
      console.log(res)
      that.setData({
        loadModal:false
      })
    })
  }
})