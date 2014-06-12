;(function(){
  'use strict';

  var eventsManager = require('./events')
    , loaders = require('./loaders')

  // Events
  eventsManager.launch()

  // Launch
  loaders.loadHome()

})()
