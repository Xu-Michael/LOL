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
    let gif = data.gif
    try {
      var user = wx.getStorageSync('user')
      if (user) {
        // console.log(user)
        const current_user_id = user.id
        wx.request({
          url: `https://gifme-api.wogengapp.cn/api/v1/users/${user.id}`,
          // url: `http://localhost:3000/api/v1/users/${current_user_id}`,
          method: 'GET',
          success(res) {
            const user = res.data;
            // console.log(res.data)
            // Update local data
            page.setData({
              user: user
            });

            wx.hideToast();
            const collection = {
              user_id: current_user_id,
              gif_id: data.gif.id
            };
            
            // console.log(collection)
            wx.request({
              url: `https://gifme-api.wogengapp.cn/api/v1/users/${current_user_id}/collections`,
              // url: `http://localhost:3000/api/v1/users/${current_user_id}/collections`,
              method: 'POST',
              data: collection,
              success(res) {
                let response_data = res.data;
                let gifs_new = page.data.gifs_new;
                let gifs_trending = page.data.gifs_trending;
                // set data on index page and show
                var user = wx.getStorageSync('user');
                const user_id = user.id;
              
                if (response_data.user_id == collection.user_id && response_data.gif_id == collection.gif_id){
                  let gifs_new_index = gifs_new.findIndex(g => g.id == gif.id)
                  let gifs_trending_index = gifs_trending.findIndex(g => g.id == gif.id)
                  if (res.statusCode === 202) {
                    gifs_new[gifs_new_index].collected = false
                    gifs_trending[gifs_trending_index].collected = false
                    gifs_new[gifs_new_index].collection_count = response_data.collection_count
                    gifs_trending[gifs_trending_index].collection_count = response_data.collection_count
                  } else {
                    gifs_new[gifs_new_index].collected = true
                    gifs_trending[gifs_trending_index].collected = true
                    gifs_new[gifs_new_index].collection_count = response_data.collection_count
                    gifs_trending[gifs_trending_index].collection_count = response_data.collection_count
                  }
                }
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
    // this.setData(app.globalData);
    let page = this;
    var user = wx.getStorageSync('user')
    const user_id = user.id
    wx.request({
      url: `https://gifme-api.wogengapp.cn/api/v1/gifs?user_id=${user_id}`,
      // url: "http://localhost:3000/api/v1/gifs?user_id=${user_id}",
      method: 'GET',
      success(res) {
        // console.log(res)
        // page.setData(res.data)
        // // console.log(page.data.gifs)
        // let gifs = page.data.gifs
        // gifs = gifs.map(g => {
        //   g["collectGifIcon"] = false
        //   return g
        // })
        // page.setData({ gifs: gifs })

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
    wx.showNavigationBarLoading() //在标题栏中显示加载

    //模拟加载
    setTimeout(function () {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1500);
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
