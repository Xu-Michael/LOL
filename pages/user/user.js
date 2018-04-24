// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    totalscore: 0
  },

  showCollection: function (e) {
    const data = e.currentTarget.dataset;
    console.log(data)
    const userId = data.user.id;
    wx.navigateTo({
      url: `../collection/collection?id=${userId}`
    });
  },

  showGif: function (e) {
    console.log(e)
    const data = e.currentTarget.dataset;
    console.log(data);
    const gifId = data.gif.id;
    console.log(gifId);
  },

  showDeletes: function () {
    this.setData({ deleteflag: true })
  },

  hideDeletes: function () {
    this.setData({ deleteflag: false })
  },

  gifDelete: function(e) {
    const gifId = e.currentTarget.dataset.gif;
    console.log(gifId);
    wx.showModal({
      title: 'Delete',
      content: 'Delete? :(',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: `https://gifme-api.wogengapp.cn/api/v1/gifs/${gifId}`,
            // url: `http://localhost:3000/api/v1/gifs/${gifId}`,
            method: 'DELETE',
            success() {
              // set data on index page and show
              wx.reLaunch({
                url: '../user/user',
              })
            }
          });
        } else if (res.cancel) {
          modalHidden: true;
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let page = this;
    try {
      var user = wx.getStorageSync('user')
      if (user) {
        wx.request({
          url: `https://gifme-api.wogengapp.cn/api/v1/users/${user.id}`,
          // url: `http://localhost:3000/api/v1/users/${user.id}`,
          method: 'GET',
          success(res) {
            if (res.statusCode == 200) {
              const user = res.data;
              const user_gifs = user.users_gifs
              // page.setData({usergifscount: user_gifs.length});
              // console.log(res.data);
              const usergifs = res.data.users_gifs;
              console.log(usergifs)
              // var thecount = usergifs.length;
              page.setData({ usergifscount: usergifs.length });
              console.log(page.data.usergifscount);
              var i;
              var a = []
              for (i in usergifs) {
              // console.log(usergifs[i].collection_count);
              a.push(usergifs[i].collection_count);
            };
              console.log(a);

              // console.log(a)
              var total=0;
              for(var i in a) { total += a[i] };
              page.setData({ totalscore: total });

              if (page.data.usergifscount == 0) {
                console.log("success")
                page.setData({ badge: "../../image/orange/favorite.svg" });
                page.setData({ message: "Make some Gifs!" });
              } else if (page.data.totalscore > 0 && page.data.totalscore < 10) {
                page.setData({ badge: "../../image/orange/favorite.svg" });
                page.setData({ message: "Noob" });
              } else if (page.data.totalscore > 9 && page.data.totalscore < 20) {
                page.setData({ badge: "../../image/orange/favorite.svg" });
                page.setData({ message: "Beginner" });
              } else if (page.data.totalscore > 19 && page.data.totalscore < 30) {
                page.setData({ badge: "../../image/orange/favorite.svg" });
                page.setData({ message: "Novice" });
              } else if (page.data.totalscore > 29 && page.data.totalscore < 50) {
                page.setData({ badge: "../../image/orange/favorite.svg" });
                page.setData({ message: "Intermediate" });
              } else if (page.data.totalscore > 49 && page.data.totalscore < 100) {
                page.setData({ badge: "../../image/orange/favorite.svg" });
                page.setData({ message: "Advanced" });
              } else if (page.data.totalscore > 99 && page.data.totalscore < 150) {
                page.setData({ badge: "../../image/orange/favorite.svg" });
                page.setData({ message: "Expert" });
              } else if (page.data.totalscore > 149 && page.data.totalscore < 200) {
                page.setData({ badge: "../../image/orange/favorite.svg" });
                page.setData({ message: "Elite" });
              } else if (page.data.totalscore > 199 && page.data.totalscore < 300) {
                page.setData({ badge: "../../image/orange/favorite.svg" });
                page.setData({ message: "Gif Magistrate" });
              } else if (page.data.totalscore > 299 && page.data.totalscore < 500) {
                page.setData({ badge: "../../image/orange/favorite.svg" });
                page.setData({ message: "Gif King" });
              } else if (page.data.totalscore > 499 && page.data.totalscore < 1000) {
                page.setData({ badge: "../../image/orange/favorite.svg" });
                page.setData({ message: "Gif Emperor" });
              } else if (page.data.totalscore > 999 && page.data.totalscore < 2000) {
                page.setData({ badge: "../../image/orange/favorite.svg" });
                page.setData({ message: "Master of Gifs" });
              } else if (page.data.totalscore > 1999 && page.data.totalscore < 3000) {
                page.setData({ badge: "../../image/orange/favorite.svg" });
                page.setData({ message: "Grandmaster" });
              } else if (page.data.totalscore > 2999 && page.data.totalscore < 5000) {
                page.setData({ badge: "../../image/orange/favorite.svg" });
                page.setData({ message: "Ulramaster" });
              } else if (page.data.totalscore > 4999 && page.data.totalscore < 10000) {
                page.setData({ badge: "../../image/orange/favorite.svg" });
                page.setData({ message: "Gif Ascendant" });
              } else if (page.data.totalscore > 9999) {
                page.setData({ badge: "../../image/orange/favorite.svg" });
                page.setData({ message: "Gif God" });
              } else {
                console.log(page.data.totalscore)
                page.setData({ badge: "../../image/orange/favorite.svg" });
                page.setData({ message: "Gif God" });
              }
              // console.log(total)
              // return total

            // console.log(page.data.totalscore)

              // Update local data
              page.setData({
                user: user,
                gifs: user_gifs
              });
              wx.hideToast();
            } else {
              wx.reLaunch({
                url: '../login/login'
              });
            }
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
