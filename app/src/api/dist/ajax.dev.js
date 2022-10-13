"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _nprogress = _interopRequireDefault(require("nprogress"));

require("nprogress/nprogress.css");

var _store = _interopRequireDefault(require("@/store"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var requests = new _axios["default"].create({
  baseURL: '/api',
  timeout: 5000
}); //axios设置请求截器

requests.interceptors.request.use(function (config) {
  //   config.headers.mytoken = 'nihao' //设置响应头
  _nprogress["default"].start();

  if (_store["default"].state.detail.uuid_token) {
    // userTempId是跟后端商量好的，不能改
    config.headers.userTempId = _store["default"].state.detail.uuid_token;
  }

  return config;
}, function (err) {
  console.log(err);
}); //axios设置响应拦截器

requests.interceptors.response.use(function (response) {
  _nprogress["default"].done();

  return response.data; //拦截处理响应结果，直接返回需要的数据
}, function (err) {
  console.log(err);
});
var _default = requests;
exports["default"] = _default;