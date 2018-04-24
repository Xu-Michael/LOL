const app = getApp()
// const baseUrl = "你服务部署的网址/weather/";
var WxSearch = require('../../wxSearchView/wxSearchView.js');
let error_camera;
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
    const data = e.currentTarget.dataset;
    const gifId = data.gif;
    wx.navigateTo({
      url: `../show/show?id=${gifId}`
    });
  },

  showUser: function (e) {
    let data = e.currentTarget.dataset;
    const userId = data.gif.user_id;
    let current_user = wx.getStorageSync('user')
    if (userId == current_user.id) {
      wx.switchTab({
        url: `../user/user`
      });
    } else {
      wx.navigateTo({
        url: `../otheruser/otheruser?id=${userId}`
      });
    }
  },

  collect: function (e) {
    let data = e.currentTarget.dataset;
    let page = this;
    try {
      var user = wx.getStorageSync('user')
      if (user) {
        console.log(user)
        const current_user_id = user.id
        wx.request({
          url: `https://gifme-api.wogengapp.cn/api/v1/users/${user.id}`,
          // url: `http://localhost:3000/api/v1/users/${current_user_id}`,
          method: 'GET',
          success(res) {
            const user = res.data;
            console.log(res.data)
            // Update local data
            page.setData({
              user: user
            });

            wx.hideToast();
            const collection = {
              user_id: current_user_id,
              gif_id: data.gif.id
            };
            console.log(collection)
            wx.request({
              url: `https://gifme-api.wogengapp.cn/api/v1/users/${current_user_id}/collections`,
              // url: `http://localhost:3000/api/v1/users/${current_user_id}/collections`,
              method: 'POST',
              data: collection,
              success(e) {
                console.log(e)
                // set data on index page and show
              }
            });
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.setData(app.globalData);
    let page = this;
    var user = wx.getStorageSync('user')
    const user_id = user.id
    wx.request({
      url: `https://gifme-api.wogengapp.cn/api/v1/gifs?user_id=${user_id}`,
      // url: "http://localhost:3000/api/v1/gifs?user_id=${user_id}",
      method: 'GET',
      success(res) {
        console.log()
        console.log(res)
        const gifs_trending = res.data.gifs_by_collections;
        const gifs_new = res.data.gifs_by_new;
        // gifs_new.forEach((gif) => {
        //    gif.collected = collected: true
        // })
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

  },

  wxSearchTab: function () {
    wx.redirectTo({
      url: '../search/search'
    })
  }
})
