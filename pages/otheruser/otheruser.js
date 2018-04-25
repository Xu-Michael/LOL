// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  showGif: function (e) {
    const data = e.currentTarget.dataset;
    const gifId = data.gif;
    wx.navigateTo({
      url: `../show/show?id=${gifId}`
    });
  },

  showDeletes: function () {
    this.setData({ deleteflag: true })
  },

  hideDeletes: function () {
    this.setData({ deleteflag: false })
  },

  gifDelete: function (e) {
    const data = e.currentTarget.dataset;
    console.log(data);
    const gifId = data.gif.id;
    console.log(gifId);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.setData(app.globalData);
    let page = this;
    let user_id = options.id
    var user = wx.getStorageSync('user')
    wx.request({
     url: `https://gifme-api.wogengapp.cn/api/v1/users/${user_id}?current_user_id=${user.id}`,
      // url: `https://gifme-api.wogengapp.cn/api/v1/gifscurrent_user_id=${user.id}`,
      // url: `https://gifme-api.wogengapp.cn/api/v1/users/${user_id}?current_user_id=${user.id}`,
      // url: `http://localhost:3000/api/v1/users/${user_id}?current_user_id=${user.id}`,
      method: 'GET',
      success(res) {
        const user = res.data;
        // const user_gifs = user.users_gifs;
        // Update local data
        const usergifs = res.data.users_gifs;
        console.log(usergifs);
        // page.setData({
        //   user: user,
        //   usergifscount: usergifs.length
        // });
        var i;
        var a = []
        for (i in usergifs) {
        // console.log(usergifs[i].collection_count);
          a.push(usergifs[i].collection_count);
        };
        console.log(a);
        var total = 0;
        for (var i in a) { total += a[i] };
        page.setData({
          totalscore: total,
          user: user,
          usergifscount: usergifs.length,
          gifs: usergifs
        });

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
        wx.hideToast();
      }
    });
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
            console.log(res.data)
            // Update local data
            // page.setData({
            //   user: user
            // });

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
              success(res) {
                console.log(e)
                var user = wx.getStorageSync('user')
                const user_id = user.id
                  wx.request({
                  url: `https://gifme-api.wogengapp.cn/api/v1/users/${user_id}?current_user_id=${user.id}`,
                  // url: `https://gifme-api.wogengapp.cn/api/v1/gifs?user_id=${user_id}`,
                  method: 'GET',
                  success(res) {
                    console.log(res)
                    const user = res.data
                    console.log(user)
                    // Update local data
                    page.setData({
                      user: user
                    });
                    wx.hideToast();
                  }
                });
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
  }

  // collect: function (e) {
  //   let data = e.currentTarget.dataset;
  //   let page = this;
  //   try {
  //     var user = wx.getStorageSync('user')
  //     if (user) {
  //       const current_user_id = user.id
  //       const collection = {
  //         user_id: current_user_id,
  //         gif_id: data.gif
  //       };
  //       wx.request({
  //         url: `https://gifme-api.wogengapp.cn/api/v1/users/${current_user_id}/collections`,
  //         // url: `http://localhost:3000/api/v1/users/${current_user_id}/collections`,
  //         method: 'POST',
  //         data: collection,
  //         success(e) {
  //           console.log(e)
  //           // set data on index page and show
  //         }
  //       });
  //     } else {
  //       wx.reLaunch({
  //         url: '../login/login'
  //       });
  //     }
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }
})
