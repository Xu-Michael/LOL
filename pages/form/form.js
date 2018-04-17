const app = getApp();
// pages/new/new.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  bindButtonTap: function () {
    var that = this
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 10,
      camera: 'back',
      success: function (res) {
        that.setData({
          src: res.tempFilePath
        })
      }
    })
  },

  bindSubmit: function (e) {

    let tags = e.detail.value.tags;
    let image = e.detail.value.image;
    let author = e.detail.value.author;
    let collected = parseInt(e.detail.value.collected);

    let form_gif = {
      tags: tags,
      image: image,
      author: author,
      collected: collected
    }

    // Get api data
    wx.request({
      url: `https://gifme-api.wogengapp.cn/api/v1/gifs`,
      method: 'POST',
      data: form_gif,
      success() {
        console.log("Submit succcess!")
        // set data on index page and show
        wx.redirectTo({
          url: '/pages/index/index'
        });
      }
    });
    wx.reLaunch({
      url: '/pages/index/index'
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})