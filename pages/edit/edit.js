const app = getApp();
// pages/edit/edit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  bindSubmit: function (e) {
    //collect data from form
    let form_gif = e.detail.value
    let id = this.data.id

    //get that restaurant with the id from globaldata
    let gifs = app.globalData.gifs
    let index = gifs.findIndex(gif => gif.id === id);

    // change restaurant with data collected from form
    app.globalData.gifs[index] = form_gif

    // redirect to the index
    wx.reLaunch({
      url: '/pages/index/index'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const gifs = app.globalData.gifs
    let index = gifs.findIndex(gif => gif.id.toString() === options.id);
    this.setData(gifs[index]);
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