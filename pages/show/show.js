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
  flag: true,
  collectioncheck: false
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
                var cache = wx.getStorageSync('collection_id');
                var currentCache = cache[this.data.currentId];
                currentCache = !currentCache;
                cache[this.data.currentId] = currentCache;
                wx.setStorageSync('collection_id',cache);
                this.setData({
            collectioncheck: currentCache
             });
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

  // toCollect: function(event) {
  //       var cache = wx.getStorageSync('cache_key');
  //       var currentCache = cache[this.data.currentId];
  //       currentCache = !currentCache;
  //       cache[this.data.currentId] = currentCache;
  //       wx.setStorageSync('cache_key',cache);
  //       this.setData({
  //           collection: currentCache
  //       });
  //       wx.showToast({
  //           title: currentCache?'点赞':'取消',
  //           icon: 'success',
  //           duration: 2000
  //       });
  //   },

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
      url: `http://gifme-api.wogengapp.cn/api/v1/gifs/${options.id}`,
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
    var getId = options.id;
    console.log(getId)
        this.setData({
            currentId: getId
        });
        var user = wx.getStorageSync('user')
        const current_user_id = user.id
        wx.request({
          url: `https://gifme-api.wogengapp.cn/api/v1/users/${current_user_id}/collections`,
          method: 'GET',
            success(res) {
              const usercollection = res.data.collections;
              console.log(usercollection[0].gif.id);
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
