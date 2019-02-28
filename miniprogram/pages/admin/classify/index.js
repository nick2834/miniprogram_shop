const app = getApp();
var that;
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar
  },
  onLoad(){
    that = this;
  },
  handleSubmit(e){
    let typeName = e.detail.value.typeName;
    if (typeName == ''){
      wx.showToast({
        title: '分类名称不能为空',
        icon:"none"
      })
      return
    }
    wx.showLoading({
      title: '添加中'
    })
    wx.cloud.callFunction({
      name:"classify",
      data:{
        method:"get",
        typeName: typeName
      }
    }).then(res =>{
      console.log(res)
      wx.hideLoading()
      let data = res.result;
      wx.showToast({
        title: (data.errorCode) ? data.msg : "添加成功",
        icon: "none"
      })
    })
  }
})