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
    const gifId = e.currentTarget.dataset.gif;
    console.log(gifId);
    wx.showModal({
      title: 'Delete',
      content: 'Delete? :(',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: `https://gifme-api.wogengapp.cn/api/v1/gifs/${gifId}`,
            // url: `http://localhost:3000/api/v1/gifs/${gifId}`,
            method: 'DELETE',
            success() {
              // set data on index page and show
              wx.reLaunch({
                url: '../user/user',
              })
            }
          });
        } else if (res.cancel) {
          modalHidden: true;
        }
      }
    })
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
        wx.request({
          url: `https://gifme-api.wogengapp.cn/api/v1/users/${user.id}`,
          // url: `http://localhost:3000/api/v1/users/${user.id}`,
          method: 'GET',
          success(res) {
            if (res.statusCode == 200) {
              const user = res.data;
              const user_gifs = user.users_gifs
              console.log(res)
              // Update local data
              page.setData({
                user: user,
                gifs: user_gifs
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
