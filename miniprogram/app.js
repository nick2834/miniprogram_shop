wx.hideTabBar();
const wxPromise = require("./utils/promisify.js");
const wxGetUserInfo = wxPromise(wx.getUserInfo)
const wxGetSetting = wxPromise(wx.getSetting)
App({
  onLaunch: function() {
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        this.globalData.CustomBar = e.platform == 'android' ? e.statusBarHeight + 50 : e.statusBarHeight + 45;
      }
    })
    if (wx.cloud) {
      wx.cloud.init({
        traceUser: true,
      })
      // db = wx.cloud.database()
    }
  },
  getUserInfo(cb) {
    let that = this
    if (that.globalData.authorize) {
      typeof cb == 'function' && cb(that.globalData.authorize)
    } else {
      wx.cloud.callFunction({
        name: 'getInfo',
        data: {}
      }).then(res => {
        that.globalData.openId = res.result.openid;
        wxGetSetting().then(res =>{
          if (res.authSetting['scope.userInfo']) {
            wxGetUserInfo().then(res =>{
              that.globalData.userInfo = res.userInfo;
              that.globalData.authorize = true;
              typeof cb == 'function' && cb(that.globalData.authorize)
            })
          } else {
            that.globalData.authorize = false;
            typeof cb == 'function' && cb(that.globalData.authorize)
          }
        })      
      })
    }
  },
  globalData: {
    userInfo: null,
    authorize: false,
    appid: "wx5e8181cdeefeb3ca",
    openId:""
  }
})