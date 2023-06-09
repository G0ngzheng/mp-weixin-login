// index.js
const app = getApp()

Page({
  handleTap() {
    wx.login({
      success: (res) => {
        wx.request({
          url: 'http://localhost:9991/login/check',
          method: 'GET',
          data: {
            code: res.code
          },
          success(res) {
            console.log('res', res)
            app.globalData.token = res.data.token
            wx.setStorage({
              key: 'token',
              data: res.data.token,
              success(res) {
                console.log('token 已存入', res)
              }
            })
          }
        })
      }
    })
  },

  handleReqTap() {
    wx.request({
      url: 'http://localhost:9991/order/list',
      header: {
        token: app.globalData.token
      },
      success(res) {
        console.log('res', res)
      }
    })
  },

  handleGetPhoneNumber(e) {
    console.log(e)
    wx.request({
      url: 'http://localhost:9991/login/phone',
      data: {
        code: e.detail.code
      },
      success(res) {
        console.log('res', res)
      }
    })
  }
})
