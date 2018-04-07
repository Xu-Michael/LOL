//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    gifs: [
      {
        "id": 1,
        "tag": "#secret, #gossip, #shh",
        "image": "https://media1.giphy.com/media/3o8dFgRzTzaLx3mWgo/giphy.gif",
        "author": "Converse",
        "collected": 524
      },
      {
        "id": 2,
        "tag": "#funny, #laugh, #flash",
        "image": "https://media2.giphy.com/media/3NtY188QaxDdC/giphy.gif",
        "author": "Zootopia",
        "collected": 125
      },
      {
        "id": 3,
        "tag": "#funny, #trump, #shake",
        "image": "https://media1.giphy.com/media/ASzK5wWjMtc6A/giphy.gif",
        "author": "Donald Trump",
        "collected": 54
      },
      {
        "id": 4,
        "tag": "#cat, #typing, #funny",
        "image": "https://media0.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif",
        "author": "Miao Cat",
        "collected": 78
      },
      {
        "id": 5,
        "tag": "#cat, #funny, #money",
        "image": "https://media1.giphy.com/media/ND6xkVPaj8tHO/giphy.gif",
        "author": "Miao Cat",
        "collected": 985
      },
      {
        "id": 6,
        "tag": "#baby, #funny, #spoon",
        "image": "https://media2.giphy.com/media/Jk4ZT6R0OEUoM/giphy.gif",
        "author": "Charlie",
        "collected": 55
      },
      {
        "id": 7,
        "tag": "#dog, #dance, #funny",
        "image": "https://media0.giphy.com/media/wW95fEq09hOI8/giphy.gif",
        "author": "Chiuhuahua",
        "collected": 21
      }
    ]
  }
})