"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _api = require("@/api");

var state = {};
var actions = {
  shopCartList: function shopCartList() {
    var result;
    return regeneratorRuntime.async(function shopCartList$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap((0, _api.reqCartList)());

          case 2:
            result = _context.sent;

            if (result.code === 200) {
              console.log(result.data[0].cartInfoList);
            }

          case 4:
          case "end":
            return _context.stop();
        }
      }
    });
  }
};
var mutations = {};
var getters = {};
var _default = {
  state: state,
  actions: actions,
  mutations: mutations,
  getters: getters
};
exports["default"] = _default;