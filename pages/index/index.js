const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: ['New', 'Trending'],
    currentTab: 0 
  },

  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  }, 

  showGif: function (e) {
    console.log(e);
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
      url: "http://localhost:3000/api/v1/gifs",
      method: 'GET',
      success(res) {
        console.log(res)
        const gifs_trending = res.data.gifs_by_collections;
        const gifs_new = res.data.gifs_by_new;
        // Update local data
        page.setData({
          gifs_trending: gifs_trending,
          gifs_new: gifs_new
        });

        wx.hideToast();
      }
    });
  },

  wxSearchTab: function () {
    wx.redirectTo({
      url: '../search/search'
    })
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