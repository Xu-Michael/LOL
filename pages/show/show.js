const app = getApp();
// pages/show/show.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "tags": [
    ],
  shareData: {
    title: 'Gif Example',
    path: '/page/show/show'
    },
  scrollTop: 100,
  scrollLeft: 0,
  flag: true
  },

  onShareAppMessage: function () {
    return this.data.shareData
  },

  editGif: function (e) {
    const id = e.currentTarget.dataset.id
    console.log(e);
    wx.navigateTo({
      url: `../tagform/tagform?id=${id}`
    })
  },

  success: function (e) {

  },

  deleteGif: function (e) {
    const data = e.currentTarget.dataset;

    wx.showModal({
      title: 'Delete',
      content: 'Did this GIF make you cringe?',
      success: function() {
        wx.request({
          url: `https://gifme-api.wogengapp.cn/api/v1/gifs/${data.id}`,
          method: 'DELETE',
          success() {
            // set data on index page and show
            wx.redirectTo({
              url: '/pages/index/index'
            });
          }
        });

        //redirect to index
        wx.reLaunch({
          url: '/pages/index/index'
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    let page = this;
    wx.request({
      url: `http://localhost:3000/api/v1/gifs/${options.id}`,
      method: 'GET',
      success(res) {
        const gif = res.data;
        // Update local data
        page.setData({
          gif: gif
        }); 
        wx.hideToast();
      }
    });
    // Get api data
    // wx.request({
    //   url: `https://gifme-api.wogengapp.cn/api/v1/gifs/${options.id}`,
    //   method: 'GET',
    //   success(res) {
    //     const gif = res.data;

    //     // Update local data
    //     page.setData(
    //       gif
    //     );

    //     wx.hideToast();
    //   }
    // });
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

  }

  /**
   * 用户点击右上角分享
   */
})
