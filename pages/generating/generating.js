// pages/generating/generating.js
let key;
let gif_id;
let user_id;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag1: false,
    flag2: false
  },


  show1: function () {
    console.log("show1success")
    this.setData({ flag1: true })
  },
  hide1: function () {
    this.setData({ flag1: false })
  },
  show2: function () {
    console.log("show2success")
    this.setData({ flag2: true })
  },
  hide2: function () {
    this.setData({ flag2: false })
  },

  generateGif: function () {
    let page = this
    const form_gif = {
      tags: "testing",
      video: 'https://gifme-1256511506.cos.ap-shanghai.myqcloud.com/' + key,
      author: "testing",
      collected: 12,
      user_id: user_id
    };
    wx.request({
      url: `https://gifme-api.wogengapp.cn/api/v1/gifs`,
      // url: "http://localhost:3000/api/v1/gifs",
      method: 'POST',
      data: form_gif,
      success(res) {
        gif_id = res.data.id
        page.show1();
        // wx.redirectTo({
        //   url: `../show/show?id=${res.data.id}`
        // });
      }
    });
  },

  // bindSubmit: function(e) {

  //   console.log(e)
  //   wx.getLocation({
  //     type: 'wgs84',
  //     success: function (res) {
  //       console.log(res)
  //       lat = res.latitude
  //       lng = res.longitude
  //       location = {
  //         name: e.detail.value.name,
  //         prize: e.detail.value.prize,
  //         longitude: lng,
  //         latitude: lat,
  //         user_id: user_id,
  //       }
  //       wx.request({
  //         url: `http://localhost:3000/api/v1/users/${user_id}/locations`,
  //         method: 'POST',
  //         data: {
  //           location: location
  //         },
  //         success() {
  //           // set data on index page and show
  //           wx.redirectTo({
  //             url: '/pages/index/index'
  //           });
  //         }
  //       });
  //     }
  //   });

  bindSubmit: function (e) {
    let page = this
    console.log(e)
    console.log(e.detail.value.content)
    page.show2();
    const updated_gif = {
      tags: e.detail.value.content
    };
    wx.request({
      url: `https://gifme-api.wogengapp.cn/api/v1/gifs/${gif_id}`,
      // url: `http://localhost:3000/api/v1/gifs/${gif_id}`,
      method: 'PUT',
      data: updated_gif,
      success(e) {
        // set data on index page and show
      }
    });
  },


  onContinueClicked() {
    wx.switchTab({
      url: `../index/index`
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    key = options.key
    user_id = options.user_id
    setTimeout(that.generateGif, 3000);
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
