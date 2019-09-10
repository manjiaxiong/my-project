// pages/movie/movie-more/movie-more.js
var app=getApp()
var { getMoiveList } = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    requestUrl:'',
    totalCount:0,
    totalData:[],
    isEnd:false
  },
  handelMoiveList:function(data){
    if(data.length==0){
      wx.showToast({
        title: '已经没有啦',
      })
      this.data.isEnd=true
      return ;

    }
    this.data.totalCount=this.data.totalCount+data.length;
    this.data.totalData= this.data.totalData.concat(data)
    this.setData({ movies: this.data.totalData },function(){
        //设置页面加载完毕后取消加载
        wx.hideNavigationBarLoading()
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var type = options.type
    var _this = this
    var baseUrl =app.globalData.CommonUrl;
    var requestUrl = ''
    var navigationBarTitleText=''
    switch(type){
      case 'inTheaters':
        requestUrl = baseUrl + '/in_theaters'
        navigationBarTitleText='正在热映'
        break
      case 'comingSoon':
        requestUrl = baseUrl + '/coming_soon'
        navigationBarTitleText = '正在上映'
        break
      case 'top250':
        requestUrl = baseUrl + '/top250'
        navigationBarTitleText = 'top250'
        break               
    }
    //保存requestUrl
    this.data.requestUrl=requestUrl;
    //设置标题头
    wx.setNavigationBarTitle({
      title: navigationBarTitleText
    })
    //设置加载
    wx.showNavigationBarLoading()
    //获取数据渲染界面
    /*
    getMoiveList(requestUrl, function (data) {
      _this.setData({ movies: data },function(){
        //设置页面加载完毕后取消加载
        wx.hideNavigationBarLoading()
      })
    })  
    */
     getMoiveList(requestUrl,this.handelMoiveList)
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
     wx.showNavigationBarLoading()
     getMoiveList(this.data.requestUrl,this.handelMoiveList)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(this.data.isEnd){
        wx.showToast({
        title: '已经没有啦',
      })
      return ;
    }
     var nextRequestUrl = this.data.requestUrl + "?start="+this.data.totalCount+"&count=20"
    getMoiveList(nextRequestUrl,this.handelMoiveList)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})