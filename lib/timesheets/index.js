'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _cruder = require('../utils/cruder');

var _cruder2 = _interopRequireDefault(_cruder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var endpoint = '/timesheets';
  var methods = {
    add: function add(project) {
      if (!project.name) return Promise.reject({ message: 'name is required' });
      if (project.name.match(/[^A-Za-z0-9\-_!,() ]/)) {
        return Promise.reject({
          message: 'name may not contain symbols other than: _ ! , ( )'
        });
      }
      return (0, _cruder.add)(endpoint)(project);
    }

  };

  return Object.assign({}, (0, _cruder2.default)(url, ['get']), methods);
};