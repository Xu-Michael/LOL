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

  // showDeletes: function (e) {
  //   var x = document.getElementById("myDIV");
  //   if (x.style.display === "none") {
  //       x.style.display = "block";
  //   } else {
  //       x.style.display = "none";
  //   }
  // }

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let page = this;
    wx.request({
      url: `https://gifme-api.wogengapp.cn/api/v1/users/${options.id}`,
      method: 'GET',
      success(res) {
        const user = res.data;
        console.log(user)
        // Update local data
        page.setData({
          users: user
        });

        wx.hideToast();
      }
    });
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
