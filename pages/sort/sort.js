
var Api = require('../../utils/api.js');
var wxRequest = require('../../utils/wxRequest.js')
import config from '../../utils/config.js'
var defaultimg = config.getDefaultImg;

const app = getApp()
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    TabCur: 0,
    MainCur: 0,
    VerticalNavTop: 0,
    //分类列表
    CategoriesList:[],
    listls : [],
    CategoriesList2:[],
    numlistc :[],
    imglist:[],
    imageslist:[],
  },
  
  onLoad: function () {
    var that = this;
    //调用文章分类
    var getPostsRequest = wxRequest.getRequest(Api.getCategories());
    getPostsRequest.then(res => {
      
      that.setData({
        CategoriesList: res.data,
      })

    })

    //调用图片json
    var getPostsRequest2 = wxRequest.getRequest(Api.getimgjson());
    getPostsRequest2.then(res2 => {
      // console.log(res2.data)
      that.setData({
        imageslist: res2.data,
      })
      // console.log(this.data.imageslist)
    })
    
  },


  
  

  


  // 定位到具体
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      MainCur: e.currentTarget.dataset.id,
      VerticalNavTop: (e.currentTarget.dataset.id - 1) * 50
    })
  },
  
})