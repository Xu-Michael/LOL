// 导出接口
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
  flag: true,
  collectioncheck: false,
  numberup: false
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

  wxSearchKeyTap: function (e) {
    search(e.target.dataset.key);
  },

  collect: function (e) {
    let data = e.currentTarget.dataset;
    let page = this;
    page.setData({collectioncheck: true})
    page.setData({numberup: true})
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
    console.log(options);
    let page = this;
    wx.request({
      url: `http://gifme-api.wogengapp.cn/api/v1/gifs/${options.id}`,
      // url: `http://localhost:3000/api/v1/gifs/${options.id}`,
      method: 'GET',
      success(res) {
        const gif = res.data;
        page.setData({
          gif: gif
        });
        wx.hideToast();
      }
    });
    var getId = options.id;
        this.setData({
            currentId: getId
        });
        var user = wx.getStorageSync('user')
        const current_user_id = user.id
        wx.request({
          // url: `http://localhost:3000/api/v1/users/${current_user_id}/collections`,
          url: `https://gifme-api.wogengapp.cn/api/v1/users/${current_user_id}/collections`,
          method: 'GET',
            success(res) {
              const usercollection = res.data.collections;
              var i;
              var a = []
              for (i in usercollection) {
              console.log(usercollection[i].gif.id);
              a.push(usercollection[i].gif.id)
            }
            console.log(a)
            console.log(options.id)
            let numberfy = Number(options.id)

            if (a.includes(numberfy)) {
              page.setData({collectioncheck: true})
            } else {
              page.setData({collectioncheck: false})
            }
          }
    });
  },

  onReady: function () {

  },

  previewGif: function (e) {
    var current = e.target.dataset.gif

    wx.previewImage({
      current: current,
      urls: [current]
    });
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
