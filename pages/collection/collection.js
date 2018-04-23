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
    let page = this;
    try {
      var user = wx.getStorageSync('user')
      if (user) {
        wx.request({
          url: `https://gifme-api.wogengapp.cn/api/v1/users/${user.id}/collections`,
          // url: `http://localhost:3000/api/v1/users/${user.id}/collections`,
          method: 'GET',
          success(res) {
            if (res.statusCode == 200) {
              const gifs = res.data.collections;
              page.setData({
                gifs: gifs
              });
              wx.hideToast();
            } else {
              wx.reLaunch({
                url: '../login/login'
              });
            }
          }
        });
      } else {
        wx.reLaunch({
          url: '../login/login'
        });
      }
    } catch (e) {
      console.log(e)
    }
  },
  showUser: function (e) {
    console.log(e);
    let data = e.currentTarget.dataset;
    console.log(data)
    const userId = data.gif.user_id;
    wx.navigateTo({
      url: `../user/user?id=${userId}`
    });
  },
  showGif: function (e) {
    console.log(e);
    const data = e.currentTarget.dataset;
    const gifId = data.gif;
    wx.navigateTo({
      url: `../show/show?id=${gifId}`
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
