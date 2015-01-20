'use strict';

require('chai').should();

var tsheets_client = require('../tsheets-client.js');

describe(__filename, function() {

  describe('exports', function() {

    it('should define reportTime()', function() {
      tsheets_client.should.have.property('reportTime');
      tsheets_client.reportTime.should.be.a('function');
    });

  });

});
