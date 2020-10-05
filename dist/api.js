"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var royaleToken = process.env.CLASH_TOKEN;

var api = _axios["default"].create({
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'authorization': "Bearer ".concat(royaleToken)
  },
  baseURL: 'https://api.clashroyale.com/v1'
});

var _default = api;
exports["default"] = _default;