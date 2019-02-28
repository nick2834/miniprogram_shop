const app = getApp();
var that;
const wxPromise = require("../../../utils/promisify.js");
const wxChooseImage = wxPromise(wx.chooseImage)
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    thumbnail:[]
  },
  onLoad(){
    that = this;
  },
  chooseImage(e){
    wxChooseImage().then(res =>{
      that.setData({
        thumbnail: that.data.thumbnail.concat(res.tempFilePaths)
      })
    }).catch(err =>{console.log(err)})
  },
  deletePic(e){
    let targetIndex = e.currentTarget.dataset.index;
    let thumbnail = that.data.thumbnail
    thumbnail.splice(targetIndex, 1);
    that.setData({
      thumbnail: thumbnail
    })
  },
  previewPic(e){
    let targetSrc = e.currentTarget.dataset.src;
    wx.previewImage({
      current: targetSrc,
      urls: that.data.thumbnail 
    })
  }
})