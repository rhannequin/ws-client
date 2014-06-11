'use strict';

var $ = require('jquery')

module.exports = {
  gifLoader: findGifLoader
}

function findGifLoader() {
  return $('.navbar-brand').find('.js-loader')
}
