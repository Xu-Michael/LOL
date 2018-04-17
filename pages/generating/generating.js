// pages/generating/generating.js
let key;
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  generateGif: function () {
    const form_gif = {
      tags: "testing",
      image: 'https://gifme-1256511506.cos.ap-shanghai.myqcloud.com/' + key,
      // image: filePath,
      author: "testing",
      collected: 12,
      user_id: 1
    };
    wx.request({
      url: `http://localhost:3000/api/v1/gifs`,
      method: 'POST',
      data: form_gif,
      success(res) {
        console.log(res)
        // wx.redirectTo({
        //   url: `../show/show?id=${res.data.id}`
        // });
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    key = options.key
    setTimeout(this.generateGif, 3000);
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