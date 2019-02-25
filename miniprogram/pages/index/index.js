const app = getApp();
var that
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    cardCur: 0,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    hasLogin: false,
    loadModal: true,
    userInfo: null
  },
  onLoad() {
    that = this;
    app.getUserInfo(function(authorize) {
      if (authorize) {
        wx.showTabBar()
        that.setData({
          loadModal: false,
          userInfo: app.globalData.userInfo,
          hasLogin: false
        })
      } else {
        that.setData({
          loadModal: false,
          hasLogin: true
        })
      }
    })
  },
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  bindGetUserInfo(e) {
    if (e.detail.userInfo != null) { //用户点击允许授权
      app.globalData.userInfo = e.detail.userInfo;
      app.globalData.authorize = true;
      that.setData({
        hasLogin: false
      })
      that.onLoad()
    }
  }
});