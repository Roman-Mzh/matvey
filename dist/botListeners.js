"use strict";

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.join");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/es.string.pad-end");

require("regenerator-runtime/runtime");

var _ = _interopRequireDefault(require("."));

var _royale = _interopRequireDefault(require("./royale"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var royale = new _royale["default"]();
var defaults = {};
var help = "\u041A\u0430\u043A \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C\u0441\u044F \u0431\u043E\u0442\u043E\u043C:\n\n<pre>/poehali [tag] [n]</pre>\u043E\u0442\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435 \u0441\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0438 \u0440\u0435\u0447\u043D\u043E\u0439 \u0433\u043E\u043D\u043A\u0438\n<b>tag</b> - \u0442\u044D\u0433 \u043A\u043B\u0430\u043D\u0430, <b>n</b> - \u043A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0443\u0447\u0430\u0441\u0442\u043D\u0438\u043A\u043E\u0432, \u043F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E 10\n<pre>/setDefault [tag]</pre>\u0443\u0441\u0442\u0430\u043D\u0430\u0432\u043B\u0438\u0432\u0430\u0435\u0442 \u0434\u043B\u044F \u043A\u0430\u043D\u0430\u043B\u0430 \u0442\u044D\u0433 \u043F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E\n<pre>/getDefault</pre>\u0432\u044B\u0432\u043E\u0434\u0438\u0442 \u0442\u0435\u043A\u0443\u0449\u0438\u0439 \u0442\u044D\u0433 \u043F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E\n";

_["default"].onText(/\/setDefault ([\d\w]*)/, function (_ref, match) {
  var id = _ref.chat.id;
  var tag = match[1];
  defaults[id] = tag;
});

_["default"].onText(/\/getDefault/, function (_ref2) {
  var id = _ref2.chat.id;

  _["default"].sendMessage(id, "".concat(defaults[id]));
});

_["default"].onText(/\/help/, function (_ref3) {
  var id = _ref3.chat.id;

  _["default"].sendMessage(id, help, {
    parse_mode: 'HTML'
  });
});

_["default"].onText(/\/poehali\s?([\d\w]*)?\s?(\d*)/, /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref4, match) {
    var id, tag, numberOfParticipants, _yield$royale$getClan, riverData, lastUpdate, lastWarId, formattedParticipants;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            id = _ref4.chat.id;
            tag = match[1] || defaults[id];

            if (tag) {
              _context.next = 5;
              break;
            }

            _["default"].sendMessage(id, help, {
              parse_mode: 'HTML'
            });

            return _context.abrupt("return");

          case 5:
            numberOfParticipants = match[2];
            _context.prev = 6;
            _context.next = 9;
            return royale.getClanData(tag);

          case 9:
            _yield$royale$getClan = _context.sent;
            riverData = _yield$royale$getClan.riverData;
            lastUpdate = _yield$royale$getClan.lastUpdate;
            lastWarId = _yield$royale$getClan.lastWarId;
            formattedParticipants = riverData.slice(0, numberOfParticipants ? Math.max(numberOfParticipants, 1) : 10).map(function (p, i) {
              return "".concat((i + 1 + ' ' + p.name).slice(0, 10).padEnd(10), " : ").concat(p.fame, " ").concat(p.repairPoints);
            });

            _["default"].sendMessage(id, '<pre>Наши герои: \n' + "\u0410\u043A\u0442\u0443\u0430\u043B\u044C\u043D\u043E \u043D\u0430: ".concat(new Intl.DateTimeFormat('ru-RU', {
              dateStyle: 'short',
              timeStyle: 'short'
            }).format(lastUpdate), "\n") + "\u0418\u0434\u0435\u043D\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u043E\u0440 \u0432\u043E\u0439\u043D\u044B: ".concat(lastWarId) + '\n' + '-------------------------\n' + formattedParticipants.join('\n') + '</pre>', {
              parse_mode: 'HTML'
            });

            _context.next = 20;
            break;

          case 17:
            _context.prev = 17;
            _context.t0 = _context["catch"](6);
            console.log(_context.t0);

          case 20:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[6, 17]]);
  }));

  return function (_x, _x2) {
    return _ref5.apply(this, arguments);
  };
}());