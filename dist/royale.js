"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _clan = _interopRequireDefault(require("./clan.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Royale = /*#__PURE__*/function () {
  function Royale() {
    _classCallCheck(this, Royale);

    this.clans = {};
  }

  _createClass(Royale, [{
    key: "getRiverScore",
    value: function () {
      var _getRiverScore = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(tag) {
        var clan;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                clan = this.clans[tag] || new _clan["default"](tag);
                _context.next = 3;
                return clan.getRiverScore();

              case 3:
                this.clans[tag] = clan;
                return _context.abrupt("return", clan.riverData);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getRiverScore(_x) {
        return _getRiverScore.apply(this, arguments);
      }

      return getRiverScore;
    }()
  }]);

  return Royale;
}();

var _default = Royale;
exports["default"] = _default;