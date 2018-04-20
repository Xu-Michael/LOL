// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  login: function() {
    wx.login({
      success: function (res) {
        if (res.code) {
          const code = res.code
          wx.getUserInfo({
            success: function (res) {
              var userInfo = res.userInfo
              var nickName = userInfo.nickName
              var avatarUrl = userInfo.avatarUrl
              var gender = userInfo.gender
              var province = userInfo.province
              var city = userInfo.city
              var country = userInfo.country
              const user = {
                name: nickName,
                avatar: avatarUrl
              }
              wx.request({
                url: 'https://gifme-api.wogengapp.cn/api/v1/users',
                // url: 'http://localhost:3000/api/v1/users',
                method: 'POST',
                data: {
                  user: user,
                  code: code
                },
                success: function (res) {
                  const id = res.data.id
                  wx.setStorage({
                    key: "user",
                    data: res.data
                  });
                  wx.switchTab({
                    url: `../user/user`
                  });
                }
              })
            }
          });
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    });
  },

  cancel: function() {

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
