var { articles } = require('../../../data/articles.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlaying:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var articleId = options.articleId
      var article = articles[articleId]
      //处理收藏
      var isCollected = false;
      //处理收藏初始化
      var article_collect = wx.getStorageSync('article_collect')

      if (article_collect){//有收藏对象
        isCollected = !!article_collect[articleId]
      }else{//无收藏对象
      //初始化收藏对象
      var data={
        
      }
        data[articleId] = false
        wx.setStorageSync('articles_collection', data)
    }
    //处理音乐
    //处理音乐
    var backgroundAudioManager = wx.getBackgroundAudioManager()
    backgroundAudioManager.onPlay(function () {
      this.setData({ isPlaying: true })
    }.bind(this))
    backgroundAudioManager.onPause(function () {
      this.setData({ isPlaying: false })
    }.bind(this))
    this.setData({ ...article, isCollected:isCollected})
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //处理收藏
  tapCollection:function(){
    var articles_collection = wx.getStorageSync('articles_collection')
    var currentIsCollected = articles_collection     [this.data.articleId]
    articles_collection[this.data.articleId] = !currentIsCollected
    wx.setStorageSync('articles_collection', articles_collection)
    this.setData({ isCollected: !currentIsCollected },function(){
      wx.showToast({
        title: currentIsCollected ? "取消成功" : "收藏成功",
        duration: 2000       
      })
    })
  },
  //处理转发
  tapShare:function(){
    var itemList=['分享到QQ', '分享到朋友圈', '分享到微博'];
    wx.showActionSheet({
      itemList: itemList,
      success(res) {
        wx.showToast({
          title: itemList[res.tapIndex]+"成功",
          duration: 2000
        })
      }
    })
  },
  //处理音乐播放
  tapMusic:function(){
    var backgroundAudioManager= wx.getBackgroundAudioManager()
    if(this.data.isPlaying){//播放中
      backgroundAudioManager.pause()
      
    }else{//暂停中
      backgroundAudioManager.src = this.data.music.src;
      backgroundAudioManager.title = this.data.music.title;  
      backgroundAudioManager.coverImgUrl = this.data.music.coverImgUrl
    }
  }
})