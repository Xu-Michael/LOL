// pages/collection/collection.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  showGif: function (e) {
    const data = e.currentTarget.dataset;
    const gifId = data.gif.id;
    wx.navigateTo({
      url: `../show/show?id=${gifId}`
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.setData(app.globalData);
    let page = this;
    wx.request({
      url: `https://gif-me.herokuapp.com/api/v1/users/${options.id}`,
      method: 'GET',
      success(res) {
        const gifs = res.data.user_gifs;

        // Update local data
        page.setData({
          user_gifs: gifs
        });

        wx.hideToast();
      }
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