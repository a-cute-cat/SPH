"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _api = require("@/api");

var _uuid_token = require("@/utils/uuid_token");

var state = {
  goodInfoList: {},
  // 通过uuid包生成一个唯一的id给游客，并存储在用户的本地存储，实现游客购物车
  uuid_token: (0, _uuid_token.getUUID)()
};
var actions = {
  goodInfo: function goodInfo(_ref, skuId) {
    var commit, result;
    return regeneratorRuntime.async(function goodInfo$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            commit = _ref.commit;
            _context.next = 3;
            return regeneratorRuntime.awrap((0, _api.reqGoodList)(skuId));

          case 3:
            result = _context.sent;

            if (result.code === 200) {
              commit('GOODINFO', result.data);
            }

          case 5:
          case "end":
            return _context.stop();
        }
      }
    });
  },
  addOrUpadateShopCart: function addOrUpadateShopCart(_ref2, _ref3) {
    var commit, skuId, skuNum, result;
    return regeneratorRuntime.async(function addOrUpadateShopCart$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            commit = _ref2.commit;
            skuId = _ref3.skuId, skuNum = _ref3.skuNum;
            _context2.next = 4;
            return regeneratorRuntime.awrap((0, _api.reqAddUpdateShopCar)(skuId, skuNum));

          case 4:
            result = _context2.sent;

            if (!(result.code === 200)) {
              _context2.next = 9;
              break;
            }

            return _context2.abrupt("return", "ok");

          case 9:
            return _context2.abrupt("return", Promise.reject(new Error("fail")));

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    });
  }
};
var mutations = {
  GOODINFO: function GOODINFO(state, goodInfoList) {
    state.goodInfoList = goodInfoList;
  }
};
var getters = {
  categoryView: function categoryView(state) {
    return state.goodInfoList.categoryView || {};
  },
  skuInfo: function skuInfo(state) {
    return state.goodInfoList.skuInfo || {};
  },
  spuSaleAttrList: function spuSaleAttrList(state) {
    return state.goodInfoList.spuSaleAttrList || [];
  }
};
var _default = {
  state: state,
  actions: actions,
  mutations: mutations,
  getters: getters
};
exports["default"] = _default;