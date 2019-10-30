// pages/search/search.js

var Api = require('../../utils/api.js');
var wxRequest = require('../../utils/wxRequest.js')
import config from '../../utils/config.js'
var defaultimg = config.getDefaultImg;


Page({
  /**
   * 页面的初始数据
   */
  data: {
    search_text:"",
    search_posts:[],


    
  },
  //获取搜索输入的内容
  nameblur: function (e) {
    // console.log(e.detail.value)
    
    this.setData({
      search_text: e.detail.value
    })


  },


 

  sousuoan:function(){
    wx.showLoading({
      title: '正在搜索',
      mask: true,
      duration: 1500,
    }); 
    var that = this;
    //获取搜索的文章内容
    var getPostsRequest = wxRequest.getRequest(Api.getPostsSearch(that.data.search_text));
    getPostsRequest.then(res => {

      if (res.data.length <= 0){
        wx.showToast({
          title: '没有搜到',
          mask: true,
          duration: 1000
        });
      }else{
        wx.showToast({
          title: '加载成功',
          mask: true,
          duration: 1000
        });
      }

      // console.log(res.data)
      var getDateLength = res.data.length;
      for (var i = 0; i < getDateLength; i++) {
        if (res.data[i].date.length < 20) {
          res.data[i].date = res.data[i].date.substring(0, 10);
        }
        //获取文章的第一个图片地址,如果没有给出默认图片
        var regex = /<img.*?src=[\'"](.*?)[\'"].*?>/g;
        var arrReg = regex.exec(res.data[i].content.rendered);
        var src = defaultimg;
        if (!arrReg) {
          res.data[i].content.img = src
        } else {
          res.data[i].content.img = arrReg[1];
        }
      }
      that.setData({
        search_posts: res.data
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({ 
      //搜索内容
    search_text: options.text,
    })

    wx.showLoading({
      title: '正在搜索',
      mask: true,
      duration: 1500,
    }); 
    //获取搜索的文章内容
    var getPostsRequest = wxRequest.getRequest(Api.getPostsSearch(that.data.search_text));
    getPostsRequest.then(res => {

      if (res.data.length <= 0) {
        wx.showToast({
          title: '没有搜到',
          mask: true,
          duration: 1000
        });
      } else {
        wx.showToast({
          title: '加载成功',
          mask: true,
          duration: 1000
        });
      }


      // console.log(res.data)
      var getDateLength = res.data.length;
      for (var i = 0; i < getDateLength; i++) {
        if (res.data[i].date.length < 20) {
          res.data[i].date = res.data[i].date.substring(0, 10);
        }
        //获取文章的第一个图片地址,如果没有给出默认图片
        var regex = /<img.*?src=[\'"](.*?)[\'"].*?>/g;
        var arrReg = regex.exec(res.data[i].content.rendered);
        var src = defaultimg;
        if (!arrReg) {
          res.data[i].content.img = src
        } else {
          res.data[i].content.img = arrReg[1];
        }
      }
      that.setData({
        search_posts: res.data
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