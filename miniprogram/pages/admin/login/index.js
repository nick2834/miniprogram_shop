const app = getApp();
var that;
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    form:{
      phoneId:"",
      password:""
    }
  },
  onLoad(){
    that = this
  },
  inputName(evnet) {
    that.setData({
      ['form.phoneId']: evnet.detail.value
    })
  },
  inputPassword(evnet) {
    that.setData({
      ['form.password']: evnet.detail.value
    })
  },
  handleLogin(e){
    let data = that.data.form;
    data['isLogin'] = true;
    if (data.phoneId == '' || data.password == ''){
      wx.showToast({
        title: '账户或密码不能为空',
        icon:"none"
      })
      return
    }
    wx.showLoading({
      title: '登录中',
    })
    wx.cloud.callFunction({
      name: "checkUser", data: data
    }).then(res => {
      wx.hideLoading()
      let data = res.result;
      console.log(data)
      if (data.errorCode == 200){
        console.log('注册成功')
        wx.navigateTo({
          url: '../index/index',
        })
      }else{
        wx.showToast({
          title: data.msg,
          icon:"none"
        })
      }
    }).catch(err => {
      wx.hideLoading()
    })
  },
  handleRegister(){
    let data = that.data.form;
    data['isLogin'] = false;
    if (data.phoneId == '' || data.password == '') {
      wx.showToast({
        title: '账户或密码不能为空',
        icon: "none"
      })
      return
    }
    wx.showLoading({
      title: '注册中',
    })
    wx.cloud.callFunction({
      name: "checkUser", data: data
    }).then(res =>{
      wx.hideLoading()
      console.log(res)
    }).catch(err =>{
      wx.hideLoading()
    })
  }
})