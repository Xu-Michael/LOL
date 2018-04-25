let cos_utils = require('../../utils/cos')
var config = require('../../config')
let Key = ''
let filePath = ''
let image_src = 'https://picchain-1256466747.cos.ap-chengdu.myqcloud.com/'
let user_id
let db_user

function getRandomColor() {
  let rgb = []
  for (let i = 0; i < 3; ++i) {
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length == 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
};

let tempPath;

Page({
  onLoad: function(options) {
    var page = this
    try {
      var user = wx.getStorageSync('user')
      if (user) {
        wx.request({
          url: `https://gifme-api.wogengapp.cn/api/v1/users/${user.id}`,
          // url: `http://localhost:3000/api/v1/users/${user.id}`,
          method: 'GET',
          success(res) {
            if (res.statusCode == 200) {
              db_user = res.data;
              wx.chooseVideo({
                sourceType: ['album', 'camera'],
                maxDuration: 10,
                camera: ['front', 'back'],
                success: function (res) {
                  if (res.width > res.height && res.width > 320) {
                    filePath = res.tempFilePath
                    Key = filePath.substr(filePath.lastIndexOf('/') + 1); // 这里指定上传的文件名
                    page.setData({
                      src: filePath,
                      Key: Key
                    });
                  } else {
                    wx.showModal({
                      content: "Please retake in landscape mode :)",
                      confirmText: "Ok",
                      cancelText: "STFU",
                      success(res) {
                        if (res.confirm) {
                          wx.reLaunch({
                            url: '../new/new',
                          })
                        } else {
                          wx.reLaunch({
                            url: '../index/index',
                          })
                        }
                      }
                    })
                  }
                }
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
    };
  },

  onReady: function (res) {
    this.videoContext = wx.createVideoContext('myVideo')
  },

  onShow: function () {
  },

  inputValue: '',

  data: {
    src: ''
  },

  bindInputBlur: function (e) {
    this.inputValue = e.detail.value
  },

  bindButtonTap: function () {
    var page = this
    try {
      var user = wx.getStorageSync('user')
      if (user) {
        wx.request({
          url: `https://gifme-api.wogengapp.cn/api/v1/users/${user.id}`,
          // url: `http://localhost:3000/api/v1/users/${user.id}`,
          method: 'GET',
          success(res) {
            if (res.statusCode == 200) {
              db_user = res.data;
              wx.chooseVideo({
                sourceType: ['album', 'camera'],
                maxDuration: 10,
                camera: ['front', 'back'],
                success: function (res) {
                  if (res.width > res.height && res.width > 320) {
                    filePath = res.tempFilePath
                    Key = filePath.substr(filePath.lastIndexOf('/') + 1); // 这里指定上传的文件名
                    page.setData({
                      src: filePath,
                      Key: Key
                    });                   
                  } else {
                    wx.showModal({
                      content: "Please retake in landscape mode :)",
                      confirmText: "Ok",
                      cancelText: "STFU",
                      success(res) {
                        if (res.confirm) {
                          wx.reLaunch({
                            url: '../new/new',
                          })
                        } else {
                          wx.reLaunch({
                            url: '../index/index',
                          })
                        }
                      }
                    })
                  }
                }
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

  bindSubmit: function (e) {
    const page = this;
    const input_tag = e.detail.value.content;
    if (input_tag == '') {
      wx.showModal({
        title: 'Tags Required',
        content: 'Please add 1 or more tags to post your gif :)',
      });
    } else {
      wx.showLoading({
        title: 'Creating gif...',
      });
      wx.uploadFile({
        // url: 'http://localhost:3000/api/v1/gifs',
        url: 'https://gifme-api.wogengapp.cn/api/v1/gifs',
        filePath: filePath,
        name: 'video_upload',
        method: 'POST',
        formData: {
          user_id: db_user.id,
          tags: input_tag
        },
        success: function (res) {
          page.setData({
            src: '',
            Key: ''
          });
          wx.switchTab({
            url: `../user/user`
          });
          wx.hideLoading();
        }
      });
    }
  },

  bindSendDanmu: function () {
    this.videoContext.sendDanmu({
      text: this.inputValue,
      color: getRandomColor()
    })
  }
})
