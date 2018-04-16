const app = getApp();
// pages/show/show.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  editGif: function (e) {
    const id = e.currentTarget.dataset.id
    console.log(e);
    wx.navigateTo({
      url: `../edit/edit?id=${id}`
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
          url: `https://gif-me.herokuapp.com/api/v1/gifs/${data.id}`,
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
      url: `https://gif-me.herokuapp.com/api/v1/gifs/${options.id}`,
      method: 'GET',
      success(res) {
        const video = res.data;
        console.log(video)
        // Update local data
        page.setData({
          video: video
        }); 
        wx.hideToast();
      }
    });
    // Get api data
    // wx.request({
    //   url: `https://gif-me.herokuapp.com/api/v1/gifs/${options.id}`,
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
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})