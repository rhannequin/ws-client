'use strict';

var $ = require('jquery')

module.exports = {
    mainContainer: findMainContainer
  , gifLoader: findGifLoader
  , sidebar: findSidebar
}

function findMainContainer() {
  return $('.js-main')
}

function findGifLoader() {
  return $('.navbar-brand').find('.js-loader')
}

function findSidebar() {
  return $('.nav.nav-sidebar')
}
