// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  showCollection: function (e) {
    const data = e.currentTarget.dataset;
    console.log(data)
    const userId = data.user.id;
    wx.navigateTo({
      url: `../collection/collection?id=${userId}`
    });
  },

  showGif: function (e) {
    console.log(e)
    const data = e.currentTarget.dataset;
    console.log(data);
    const gifId = data.gif.id;
    console.log(gifId);
  },

  showDeletes: function () {
    this.setData({ deleteflag: true })
  },

  hideDeletes: function () {
    this.setData({ deleteflag: false })
  },

  gifDelete: function(e) {
    const data = e.currentTarget.dataset;
    console.log(data);
    const gifId = data.gif.id;
    console.log(gifId);
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let page = this;
    try {
      var user = wx.getStorageSync('user')
      if (user) {
        const user_id = user.id
        wx.request({
          // url: `https://gifme-api.wogengapp.cn/api/v1/users/${user.id}`,
          url: `http://localhost:3000/api/v1/users/${user.id}`,
          method: 'GET',
          success(res) {
            const user = res.data;
            console.log(user)
            // Update local data
            page.setData({
              user: user
            });

            wx.hideToast();
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
