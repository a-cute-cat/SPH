"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reqCartList = exports.reqAddUpdateShopCar = exports.reqGoodList = exports.reqSearchInfo = exports.reqFloorList = exports.reqBannerList = exports.reqCategoryList = void 0;

var _ajax = _interopRequireDefault(require("./ajax"));

var _mockAjax = _interopRequireDefault(require("./mockAjax"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// 获取商品三级分类数据CategoryList
var reqCategoryList = function reqCategoryList() {
  return (0, _ajax["default"])({
    url: '/product/getBaseCategoryList',
    method: 'get'
  });
}; // 获取轮播图数据BannerList


exports.reqCategoryList = reqCategoryList;

var reqBannerList = function reqBannerList() {
  return (0, _mockAjax["default"])({
    url: '/banner',
    method: 'get'
  });
}; // 获取轮播图数据FloorList


exports.reqBannerList = reqBannerList;

var reqFloorList = function reqFloorList() {
  return (0, _mockAjax["default"])({
    url: '/floor',
    method: 'get'
  });
}; // 获取搜索页数据SearchInfo


exports.reqFloorList = reqFloorList;

var reqSearchInfo = function reqSearchInfo(params) {
  return (0, _ajax["default"])({
    url: '/list',
    method: 'post',
    data: params
  });
}; // 获取商品详情页数据GoodInfo


exports.reqSearchInfo = reqSearchInfo;

var reqGoodList = function reqGoodList(skuId) {
  return (0, _ajax["default"])({
    url: "/item/".concat(skuId),
    method: 'get'
  });
}; // 加入或更新购物车


exports.reqGoodList = reqGoodList;

var reqAddUpdateShopCar = function reqAddUpdateShopCar(skuId, skuNum) {
  return (0, _ajax["default"])({
    url: "/cart/addToCart/".concat(skuId, "/").concat(skuNum),
    method: 'post'
  });
}; // 获取购物车数据CarList


exports.reqAddUpdateShopCar = reqAddUpdateShopCar;

var reqCartList = function reqCartList() {
  return (0, _ajax["default"])({
    url: '/cart/cartList',
    method: 'get'
  });
};

exports.reqCartList = reqCartList;