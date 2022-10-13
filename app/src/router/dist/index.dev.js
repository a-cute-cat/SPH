"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

var _Home = _interopRequireDefault(require("@/views/Home"));

var _Login = _interopRequireDefault(require("@/views/Login"));

var _Register = _interopRequireDefault(require("@/views/Register"));

var _Search = _interopRequireDefault(require("@/views/Search"));

var _Detail = _interopRequireDefault(require("@/views/Detail"));

var _AddCartSuccess = _interopRequireDefault(require("@/views/AddCartSuccess"));

var _ShopCart = _interopRequireDefault(require("@/views/ShopCart"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].use(_vueRouter["default"]); // 重写push方法，解决重复点击的问题


var originPush = _vueRouter["default"].prototype.push;

_vueRouter["default"].prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject);
  } else {
    originPush.call(this, location, function () {}, function () {});
  }
};

var _default = new _vueRouter["default"]({
  routes: [{
    name: "home",
    path: "/home",
    component: _Home["default"]
  }, {
    name: "login",
    path: "/login",
    component: _Login["default"]
  }, {
    name: "register",
    path: "/register",
    component: _Register["default"]
  }, {
    name: "search",
    path: "/search/:keyword?",
    component: _Search["default"]
  }, {
    name: "detail",
    path: "/detail/:skuid",
    component: _Detail["default"]
  }, {
    name: "addCartSuccess",
    path: "/addCartSuccess",
    component: _AddCartSuccess["default"]
  }, {
    name: "shopCart",
    path: "/shopCart",
    component: _ShopCart["default"]
  }, {
    path: "/",
    component: _Home["default"]
  }],
  scrollBehavior: function scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return {
      y: 0
    };
  }
});

exports["default"] = _default;