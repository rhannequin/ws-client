'use strict';

var $ = require('jquery')
  , settings = require('./settings')

module.exports = function(endpoint, method, data) {
  endpoint = endpoint || '/'
  method = method || 'GET'
  data = data || {}
  return $.ajax({
      url: settings.apiUrl + endpoint
    , type: method
    , data: data
    , dataType: 'json'
  })
}
