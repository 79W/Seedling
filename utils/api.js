import config from 'config.js';
var domain = config.getDomain;
var IMGJSON = config.getImgJson;
var HOST_URI = 'https://' + domain + '/wp-json/wp/v2/';
var SORTLIST = config.getSortList;


module.exports = {  


  // 获取文章列表数据
  getPosts: function (page) {    
    return HOST_URI + 'posts?page=' + page;
  },

  //获取指定id的文章
  getPostsId: function (id) {
    return HOST_URI + 'posts/' + id;
  },

//获取置顶文章
  // wp-json / wp / v2 / posts ? sticky = true & per_page=5& page=1
  getPostsTop: function () {

    var url = HOST_URI + 'posts?sticky=true&per_page=5&page=1';

    return url;
  },
  //获取指定id的文章评论
  getPostsComment: function (newsid) {
    // https://www.79bk.cn//wp-json/wp/v2/comments?per_page=100&orderby=date&order=asc&post=1209&page=1
    return HOST_URI + 'comments?per_page=100&orderby=date&order=asc&post=' + newsid +'&page=1';
  },
  //获取全部分类
  getCategories: function () {
    return HOST_URI + 'categories?per_page=100&orderby=count&order=desc';

  },
  //获取分类文章
  getCategoriesPosts: function (id) {
    return HOST_URI + 'posts?per_page=99&orderby=date&order=desc&page=1&categories='+id;
  },
  //获取文章分类
  getlistCategories: function (id) {

    return HOST_URI + 'categories?include='+id+'&orderby=count&order=desc';
  },

//搜索文章
  // posts?search = wordpress
 getPostsSearch: function (text) {

   var url = HOST_URI + 'posts?per_page=99&search='+text;

    return url;
  },
  //随机数
  getrangenum: function () {

    return Math.floor(Math.random() * 666)
  },
  // 获取tag相关的文章列表
  getPostsByTags: function (id, tags) {
    var url = HOST_URI + 'posts?per_page=4&&page=1&exclude=' + id + "&tags=" + tags;
    return url;
  },

  //默认图片
  getimgjson:function(){

    return IMGJSON
  },
  //首页三个分类
  getsortzhiding:function(){
    var url = HOST_URI + 'categories?include=' + SORTLIST +'&orderby=count&order=desc';
    return url
  }

}