"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.find");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.reduce");

require("core-js/modules/es.array.sort");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.object.define-properties");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.entries");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-own-property-descriptors");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.object.values");

require("core-js/modules/es.promise");

require("core-js/modules/web.dom-collections.for-each");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("regenerator-runtime/runtime");

var _api = _interopRequireDefault(require("./api.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Clan = /*#__PURE__*/function () {
  function Clan(tag) {
    _classCallCheck(this, Clan);

    this.tag = tag;
    this.lastUpdate = this.lastUpdate || new Date();
  }

  _createClass(Clan, [{
    key: "getRiverScore",
    value: function () {
      var _getRiverScore = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _yield$api$get, data, _this$processRace, lastWarSorted, lastWarId, riverData, lastUpdate;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;

                if (!(!this.riverData || this.riverData && new Date() - this.lastUpdate > 60000)) {
                  _context.next = 10;
                  break;
                }

                _context.next = 4;
                return _api["default"].get("/clans/%23".concat(this.tag, "/riverracelog"));

              case 4:
                _yield$api$get = _context.sent;
                data = _yield$api$get.data;
                _this$processRace = this.processRace(data), lastWarSorted = _this$processRace.lastWarSorted, lastWarId = _this$processRace.lastWarId;
                this.riverData = lastWarSorted;
                this.lastWarId = lastWarId;
                this.lastUpdate = new Date();

              case 10:
                _context.next = 15;
                break;

              case 12:
                _context.prev = 12;
                _context.t0 = _context["catch"](0);
                console.log(_context.t0);

              case 15:
                riverData = this.riverData, lastUpdate = this.lastUpdate;
                return _context.abrupt("return", {
                  riverData: riverData,
                  lastUpdate: lastUpdate
                });

              case 17:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 12]]);
      }));

      function getRiverScore() {
        return _getRiverScore.apply(this, arguments);
      }

      return getRiverScore;
    }()
  }, {
    key: "processRace",
    value: function processRace(_ref) {
      var _this = this;

      var items = _ref.items;
      var processed = items.reduce(function (res, cur) {
        var seasonId = cur.seasonId,
            standings = cur.standings;

        var _standings$find = standings.find(function (s) {
          return s.clan.tag === "#".concat(_this.tag);
        }),
            participants = _standings$find.clan.participants;

        res[seasonId] = res[seasonId] || {};
        participants.forEach(function (part) {
          res[seasonId][part.tag] = _objectSpread(_objectSpread({}, part), {}, {
            fame: (res[seasonId][part.tag] || {
              fame: 0
            }).fame + part.fame,
            repairPoints: (res[seasonId][part.tag] || {
              repairPoints: 0
            }).repairPoints + part.repairPoints
          });
        });
        return res;
      }, {});
      var wars = Object.entries(processed);
      var lastWar = wars[wars.length - 1];
      var lastWarId = lastWar[0];
      var lastWarSorted = Object.values(lastWar[1]).sort(function (a, b) {
        return b.fame + b.repairPoints - (a.fame + a.repairPoints);
      });
      return {
        lastWarSorted: lastWarSorted,
        lastWarId: lastWarId
      };
    }
  }]);

  return Clan;
}();

var _default = Clan;
exports["default"] = _default;