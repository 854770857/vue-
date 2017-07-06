require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()
var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

// 使用api的方法来创建连接时的请求
var apiRoutes=express.Router()

//tab切换
var navList=require("../src/mock/tab.json")
apiRoutes.get('/navList',function (req,res) {
  res.json(navList);
})

//banner切换
var bannerList=require("../src/mock/banner.json")
apiRoutes.get('/bannerList',function (req,res) {
  res.json(bannerList);
})

//女product列表
var productList=require("../src/mock/product.json")
apiRoutes.get('/productList/3',function (req,res) {
  res.json(productList);
})
var productTitle=require("../src/mock/productTitle.json")
apiRoutes.get('/productTitle/3',function (req,res) {
  res.json(productTitle);
})

//男product列表
var manProductList=require("../src/mock/manProductList.json")
apiRoutes.get('/ProductList/2',function (req,res) {
  res.json(manProductList);
})
var manProductTitle=require("../src/mock/manProductTitle.json")
apiRoutes.get('/ProductTitle/2',function (req,res) {
  res.json(manProductTitle);
})

//延时product列表
var setProductList=require("../src/mock/setProductList.json")
apiRoutes.get('/ProductList/4',function (req,res) {
  res.json(setProductList);
})
var setProductTitle=require("../src/mock/setProductTitle.json")
apiRoutes.get('/ProductTitle/4',function (req,res) {
  res.json(setProductTitle);
})

//内衣product列表
var nyProductList=require("../src/mock/nyProductList.json")
apiRoutes.get('/ProductList/5',function (req,res) {
  res.json(nyProductList);
})
var nyProductTitle=require("../src/mock/nyProductTitle.json")
apiRoutes.get('/ProductTitle/5',function (req,res) {
  res.json(nyProductTitle);
})

//套套product列表
var ttProductList=require("../src/mock/ttProductList.json")
apiRoutes.get('/ProductList/6',function (req,res) {
  res.json(ttProductList);
})
var ttProductTitle=require("../src/mock/ttProductTitle.json")
apiRoutes.get('/ProductTitle/6',function (req,res) {
  res.json(ttProductTitle);
})

//助兴product列表
var zxProductList=require("../src/mock/zxProductList.json")
apiRoutes.get('/ProductList/7',function (req,res) {
  res.json(zxProductList);
})
var zxProductTitle=require("../src/mock/zxProductTitle.json")
apiRoutes.get('/ProductTitle/7',function (req,res) {
  res.json(zxProductTitle);
})

// 详情页
var allProduct=require("../src/mock/all.json")
apiRoutes.get('/allProduct',function (req,res) {
  var id=req.query.id;
  res.json(allProduct[id]);
})

// 调用api
app.use('/api',apiRoutes)

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
