let cos_utils = require('../../utils/cos')
var config = require('../../config')
let Key = ''
let filePath = ''
let image_src = 'https://picchain-1256466747.cos.ap-chengdu.myqcloud.com/'

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
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 10,
      camera: ['front', 'back'],
      success: function (res) {
        if (res.width > res.height && res.width > 320){
          filePath = res.tempFilePath
          Key = filePath.substr(filePath.lastIndexOf('/') + 1); // 这里指定上传的文件名
          page.setData({
            src: filePath,
            Key: Key
          });
          cos_utils.cos.postObject({
            Bucket: config.Bucket,
            Region: config.Region,
            Key: Key,
            FilePath: filePath,
            onProgress: function (info) {
              console.log(JSON.stringify(info));
            },
          });
          wx.redirectTo({
            url: `../generating/generating?key=${Key}`
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
    })
  },
  onReady: function (res) {
    this.videoContext = wx.createVideoContext('myVideo')
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
            cos_utils.cos.postObject({
              Bucket: config.Bucket,
              Region: config.Region,
              Key: Key,
              FilePath: filePath,
              onProgress: function (info) {
                console.log(JSON.stringify(info));
              },
            });
            wx.redirectTo({
              url: `../generating/generating?key=${Key}`
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
      })  
  },

  bindSendDanmu: function () {
    this.videoContext.sendDanmu({
      text: this.inputValue,
      color: getRandomColor()
    })
  }
})
