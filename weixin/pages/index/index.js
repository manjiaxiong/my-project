//index.js
//获取应用实例
const app = getApp()

Page({
  // tapText:function(){
  //   console.log('tapText')
  // },
  // tapView:function(){
  //   console.log('tapView')
  // }
   onLoad: function (options) {
    // console.log('index onLoad')
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // console.log('index onReady')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // console.log('index onShow')
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    // console.log('index onHide')
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    // console.log('index onUnload')
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    // console.log('index onPullDownRefresh')
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // console.log('index onReachBottom')
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    // console.log('index onShareAppMessage')
  },
  tapMotto:function(){
    wx.navigateTo({//保留当前页面，跳转到应用内的某个页面。但是不能跳到 tabbar 页面。
      url: '/pages/article/article-detail/article-detail?articleId=' + articleId,
    })
    // wx.redirectTo({//关闭当前页面，跳转到应用内的某个页面。但是不允许跳转到 tabbar 页面。
    //   url: '/pages/article/article',
    // })
  }
})
