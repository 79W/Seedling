/*
 * WordPres版微信小程序
 * author: qiaoyue
 * organization: 乔越博客 www.79bk.cn
 * github: 
 * 开源协议：MIT
 * Copyright (c) 2019 https://www.79bk.cn All rights reserved.
 */

//配置域名,域名只修改此处。
//如果wordpress没有安装在网站根目录请加上目录路径
//需要https 阿里云有免费的 也可以把api 里面的s去掉
var DOMAIN = "www.79bk.cn";//网站域名 不带http
var WEBSITENAME = "乔越博客"; //网站名称
var DEFAULTIMG ="http://api.img.79bk.cn/";//默认背景图 这里是api也可以自己更改
// http://api.img.79bk.cn/   
var APIIMGJSON = "http://api.img.79bk.cn/imgj.php";
var SORTLIST = [1,2,4]; //首页分类请写三个 分类id
export default {
  getDomain: DOMAIN,
  getWebsiteName: WEBSITENAME,
  getDefaultImg:DEFAULTIMG,
  getImgJson: APIIMGJSON,
  getSortList: SORTLIST,
}
