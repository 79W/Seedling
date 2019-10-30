// pages/sortDetails/sortDetails.js

var Api = require('../../utils/api.js');
var wxRequest = require('../../utils/wxRequest.js')
import config from '../../utils/config.js'
var defaultimg = config.getDefaultImg;
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    TabCur: 0,
    MainCur: 0,
    VerticalNavTop: 0,
    yiyan:[],
    wenlist : []

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({  //this.setData的方法用于把传递过来的id转化成小程序模板语言
      imgurl: options.imgurl,
      getimg: defaultimg,
      sorttitle : options.title
    })
    var yiyan = wxRequest.getRequest('https://v1.hitokoto.cn/');
    yiyan.then(res => {
      // console.log(res.data)
      that.setData({
        yiyan: res.data,
      })
    })

    var fenwenzhang = wxRequest.getRequest(Api.getCategoriesPosts(options.id));
    fenwenzhang.then(res => {
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
        wenlist: res.data,
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