// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  showGif: function (e) {
    const data = e.currentTarget.dataset;
    const gifId = data.gif;
    wx.navigateTo({
      url: `../show/show?id=${gifId}`
    });
  },

  showDeletes: function () {
    this.setData({ deleteflag: true })
  },

  hideDeletes: function () {
    this.setData({ deleteflag: false })
  },

  gifDelete: function (e) {
    const data = e.currentTarget.dataset;
    console.log(data);
    const gifId = data.gif.id;
    console.log(gifId);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.setData(app.globalData);
    let page = this;
    let user_id = options.id
    var user = wx.getStorageSync('user')
    wx.request({
      url: `https://gifme-api.wogengapp.cn/api/v1/users/${user_id}?current_user_id=${user.id}`,
      // url: `http://localhost:3000/api/v1/users/${user_id}?current_user_id=${user.id}`,
      method: 'GET',
      success(res) {
        console.log(res)
        const user = res.data
        console.log(user)
        // Update local data
        page.setData({
          user: user
        });
        wx.hideToast();
      }
    });
  },
})