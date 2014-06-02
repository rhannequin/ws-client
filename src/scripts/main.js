;(function(win){
  'use strict';

  var $ = require('jquery')
    , WS = win.WS = win.WS || {}

  WS.version = 0.1
  WS.apiUrl = 'http://localhost:5000'

  WS.apiRequest = function(endpoint, method, data) {
    endpoint = endpoint || '/'
    method = method || 'GET'
    data = data || {}
    return $.ajax({
        url: WS.apiUrl + endpoint
      , type: method
      , data: data
      , dataType: 'json'
    })
  }

  WS.apiRequest().done(function(result) {
    console.log(result.data)
  })

})(window)
