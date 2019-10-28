// pages/details/details.js

var Api = require('../../utils/api.js');
var wxRequest = require('../../utils/wxRequest.js')


Page({
  /**
   * 页面的初始数据
   */
  data: {
    newslist:[],
    //标签以后在写
    newsPostsComment:[],
    tags:[],
    tags2:[],
  },
  //复制原文地址
  copyText: function (e) {
    console.log(e)
    wx.setClipboardData({
      data: e.currentTarget.dataset.text,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '复制成功'
            })
          }
        })
      }
    })
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  // onLoad: function (options) {
  // },
  //b.js 页面接收参数
  onLoad: function (options) {       //options用于接收上个页面传递过来的参数
    var that = this;
    that.setData({  //this.setData的方法用于把传递过来的id转化成小程序模板语言
      // details_id: options.id,  
         //id是a页面传递过来的名称，a_id是保存在本页面的全局变量   {{b_id}}方法使用
      details_title: options.title,
      details_img: options.img,
      details_date: options.date,
      // list: options.list,
      // title: options.title
      
    })
  
    // 请求接口 获取文章详情渲染
    var getPostsRequest = wxRequest.getRequest(Api.getPostsId(options.id));
    getPostsRequest.then(res => {
        this.setData({
          newslist: res.data,
        })
      })
  //获取文章评论
    var getPostsRequest = wxRequest.getRequest(Api.getPostsComment(options.id));
    getPostsRequest.then(res => {
      // console.log(res.data)
      res.data[0].content.rendered = res.data[0].content.rendered.substring(3);
      
      this.setData({
        newsPostsComment: res.data,
      })
    })


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

  }

})