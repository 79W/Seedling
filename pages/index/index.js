  //index.js
//获取应用实例

var Api = require('../../utils/api.js');
var wxRequest = require('../../utils/wxRequest.js')
import config from '../../utils/config.js'
var defaultimg = config.getDefaultImg;


const app = getApp()

 

Page({
  
  data: {
    
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    
    //轮播图
    cardCur: 0,
    swiperList: [],

   
    //
    list:[],
    list2:[],
    //页数
    pageid : 1,
    state:1,
  //搜索内容
    text:'',
    ispotesotext : "上拉加载更多文章",
    isLastPage:true,

    //json
    imageslist:[],
    //fenlei
    sort1:[],
    sort:[],
    listcategories:[],
    listcategories2:[]
  },
  //获取搜索输入的内容
  nameblur: function (e) {
    // console.log(e.detail.value)
    this.setData({
      text: e.detail.value
    })
  },


  onLoad: function () {
    wx.showLoading({
      title: '正在加载数据...',
    })
    var that = this;
    //调用文章列表 第一次
    var getPostsRequest = wxRequest.getRequest(Api.getPosts(1));
    getPostsRequest.then(res => {
      // console.log(res.data)
      var getDateLength = res.data.length;
      for (var i = 0; i < getDateLength; i++) {
        //处理时间
        if (res.data[i].date.length < 20) {
          res.data[i].date = res.data[i].date.substring(0, 10);
        }
        // 获取文章的第一个图片地址,如果没有给出默认图片
        var regex = /<img.*?src=[\'"](.*?)[\'"].*?>/g;
        var arrReg = regex.exec(res.data[i].content.rendered);
        var src = defaultimg;
        if (!arrReg) {
          res.data[i].content.img = src
        } else {
          res.data[i].content.img = arrReg[1];
        }
      }
      //文章分类名 显示右上角 没写
      // console.log(that.data.listcategories2)
      // //请求分类名第o个
      // var getPostssort = wxRequest.getRequest(Api.getlistCategories(that.data.listcategories2));
      // getPostssort.then(res2 => {
      //   console.log(res2.data)
      
      //   that.setData({
      //     listcategories: res2.data
      //   })
      // })
      if (getDateLength > 0){
        wx.showToast({
          title: '加载成功',
          mask: true,
          duration: 1000
        });
      }
      that.setData({
        list2:res.data,
        list: res.data,
      })
  
    })
    //调用文件列表结束

    //调用置顶文章 用于轮播图
    var getPostsRequest = wxRequest.getRequest(Api.getPostsTop());
    getPostsRequest.then(res => {
      
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
        swiperList: res.data,
      })
      // console.log(this.data.swiperList)
    })


    // 请求分类

    var sort = wxRequest.getRequest(Api.getsortzhiding());
    sort.then(res=>{
      // console.log(res.data)
      that.setData({
        sort: res.data
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



 
  //下拉事件加载
  onReachBottom: function () {
    var that = this;
    
    if (that.data.isLastPage){

    //上啦刷新加载多点文章
    if (this.data.state == 1) {
      wx.showLoading({
        title: '加载中',
      })
      this.data.pageid = this.data.pageid + 1;
      // console.log(this.data.pageid)
    //调用文章列表
      var getPostsRequest = wxRequest.getRequest(Api.getPosts(this.data.pageid));
    getPostsRequest.then(res => {
      // console.log(res.data.data.status)
      if (res.data.code == "rest_post_invalid_page_number") {
        that.setData({
          isLastPage: false,
          ispotesotext:"没有更多内容",
        });
        wx.showToast({
          title: '没有更多内容',
          mask: false,
          duration: 1500
        });
      }else{
        wx.showToast({
          title: '加载成功',
          mask: true,
          duration: 1000
        });

      }
          var getDateLength = res.data.length;
          for (var i = 0; i < getDateLength; i++) {
            if (res.data[i].date.length < 20) {
              res.data[i].date = res.data[i].date.substring(0, 10);
            }
          }
          for (var i = 0; i < res.data.length; i++) {
            this.data.list2.push(res.data[i]);  //每条数据循环push进去
            // console.log(res.data[i])
            var regex = /<img.*?src=[\'"](.*?)[\'"].*?>/i;
            var arrReg = regex.exec(res.data[i].content.rendered);
            var src = defaultimg;
            if (!arrReg) {
              res.data[i].content.img = src
            } else {
              res.data[i].content.img = arrReg[1];
            }
          }

      

          this.setData({
            list: this.data.list2,
          })
        })

      }

    }
      //下啦刷新结束
   
  },


  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
   

  //相关操作
 

  // cardSwiper
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  // towerSwiper
  // 初始化towerSwiper
  towerSwiper(name) {
    let list = this.data[name];
    for (let i = 0; i < list.length; i++) {
      list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
      list[i].mLeft = i - parseInt(list.length / 2)
    }
    this.setData({
      swiperList: list
    })
  },
  // towerSwiper触摸开始
  towerStart(e) {
    this.setData({
      towerStart: e.touches[0].pageX
    })
  },
  // towerSwiper计算方向
  towerMove(e) {
    this.setData({
      direction: e.touches[0].pageX - this.data.towerStart > 0 ? 'right' : 'left'
    })
  },
  // towerSwiper计算滚动
  towerEnd(e) {
    let direction = this.data.direction;
    let list = this.data.swiperList;
    if (direction == 'right') {
      let mLeft = list[0].mLeft;
      let zIndex = list[0].zIndex;
      for (let i = 1; i < list.length; i++) {
        list[i - 1].mLeft = list[i].mLeft
        list[i - 1].zIndex = list[i].zIndex
      }
      list[list.length - 1].mLeft = mLeft;
      list[list.length - 1].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    } else {
      let mLeft = list[list.length - 1].mLeft;
      let zIndex = list[list.length - 1].zIndex;
      for (let i = list.length - 1; i > 0; i--) {
        list[i].mLeft = list[i - 1].mLeft
        list[i].zIndex = list[i - 1].zIndex
      }
      list[0].mLeft = mLeft;
      list[0].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    }

  },
 
})



