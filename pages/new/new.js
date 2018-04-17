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
        const form_gif = {
          tags: "testing",
          image: 'https://picchain-1256466747.cos.ap-chengdu.myqcloud.com/' + Key,
          author: "testing",
          collected: 12
        };
        wx.request({
          url: `https://gifme-api.wogengapp.cn/api/v1/gifs`,
          method: 'POST',
          data: form_gif,
          success(res) {
            console.log(res)
            wx.redirectTo({
              url: `../show/show?id=${res.data.id}`
            });
          }
        });
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
