'use strict';

var $ = require('jquery')

module.exports = {
    mainContainer: findMainContainer
  , gifLoader: findGifLoader
  , sidebar: findSidebar
  , findInput: findInput
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

function findInput($form, input, type) {
  type = type || 'input'
  return $form.find(type + "[name$='" + input + "']")
}
