//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  doWxLogin(e) {
    wx.login({
      success(res) {
        if (res.code) {
          wx.request({
            method: 'POST',
            url: 'http://localhost:6340/wx/register', // Api地址
            data: {
              code: res.code,
              ...e.detail.userInfo
            }
          })
        }
      }
    })
    
  },
  doWebLogin(e) {
    wx.request({
      method: 'POST',
      url: 'http://localhost:6340/web/login', // Api地址
      data: {
        password: 'lgy981224',
        email: '15704634868@163.com'
      }
    })
  },
  doWebRegister(e) {
    wx.request({
      method: 'POST',
      url: 'http://localhost:6340/web/register', // Api地址
      data: {
        username: '给我点阳光就灿烂',
        password: 'lgy981224',
        email: '15704634868@163.com'
      }
    })
  }
})
