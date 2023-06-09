// app.js
App({
  globalData: {
    token: wx.getStorageSync('token') || ''
  }
})
