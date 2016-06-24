'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TSheets = exports.utils = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = require('./utils');

var utils = _interopRequireWildcard(_utils);

var _cruder = require('./utils/cruder');

var _cruder2 = _interopRequireDefault(_cruder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TSheets = function () {
  /** Constructor
   */

  function TSheets() {
    _classCallCheck(this, TSheets);

    this.utils = utils;
  }

  _createClass(TSheets, [{
    key: 'timesheets',
    value: function timesheets() {
      return (0, _cruder2.default)('/timesheets', ['get', 'add', 'update', 'remove']);
    }
  }, {
    key: 'jobcodes',
    value: function jobcodes() {
      return (0, _cruder2.default)('/jobcodes', ['get', 'add', 'update', 'remove']);
    }
  }, {
    key: 'groups',
    value: function groups() {
      return (0, _cruder2.default)('/groups', ['get', 'add', 'update', 'remove']);
    }
  }, {
    key: 'users',
    value: function users() {
      return (0, _cruder2.default)('/groups', ['get', 'add', 'update', 'remove']);
    }

    // Original API

  }, {
    key: 'reportTime',
    value: function reportTime() {}
  }, {
    key: 'getTimesheets',
    value: function getTimesheets() {
      return (0, _cruder.get)('/timesheets')();
    }
  }, {
    key: 'getJobcodes',
    value: function getJobcodes() {
      return (0, _cruder.get)('/timesheets')();
    }
  }]);

  return TSheets;
}();

exports.default = TSheets;
exports.utils = utils;
exports.TSheets = TSheets;