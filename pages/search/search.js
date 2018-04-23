//index.js
var WxSearch = require('../../wxSearchView/wxSearchView.js');
let top_ten = [];

Page({
  data: {},

  // 搜索栏
  onLoad: function () {
    let that = this;
    wx.request({
      url: `https://gifme-api.wogengapp.cn/api/v1/gifs`,
      method: 'GET',
      success(res) {
        console.log(res)
        let top_ten_obj = res.data.top_ten_tags;
        top_ten_obj.forEach(function (tag) { top_ten.push(tag.name); }),
        // Update local data
        that.setData({
          top_ten: top_ten
        });
      }
    });
    WxSearch.init(
      that,  // 本页面一个引用
      top_ten,// 搜索匹配，[]表示不使用
      that.mySearchFunction, // 提供一个搜索回调函数
      that.myGobackFunction //提供一个返回回调函数
    );
  },

  // 转发函数,固定部分
  wxSearchInput: WxSearch.wxSearchInput,  // 输入变化时的操作
  wxSearchKeyTap: WxSearch.wxSearchKeyTap,  // 点击提示或者关键字、历史记录时的操作
  wxSearchDeleteAll: WxSearch.wxSearchDeleteAll, // 删除所有的历史记录
  wxSearchConfirm: WxSearch.wxSearchConfirm,  // 搜索函数
  wxSearchClear: WxSearch.wxSearchClear,  // 清空函数

  // 搜索回调函数  
  mySearchFunction: function (value) {
    // do your job here
    // 跳转
    let page = this;
    let tag = value;
    wx.request({
      url: `https://gifme-api.wogengapp.cn/api/v1/gifs?tags=${tag}`,
      method: 'GET',
      success(res) {
        console.log("hello")
        console.log(res)
        let tagged_gifs = res.data.gifs;
        // Update local data
        page.setData({
          tagged_gifs: tagged_gifs
        });
      }
    });
    wx.redirectTo({
      url: '../index/index?searchValue=' + value
    })
  },
  showGif: function (e) {
    console.log(e);
    const data = e.currentTarget.dataset;
    const gifId = data.gif;
    wx.navigateTo({
      url: `../show/show?id=${gifId}`
    });
  },
  // 返回回调函数
  myGobackFunction: function () {
    // do your job here
    // 跳转
    wx.redirectTo({
      url: '../index/index'
    })
  }
})
