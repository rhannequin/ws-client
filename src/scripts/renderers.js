'use strict';

var $ = require('jquery')
  , _ = require('lodash')
  , selectors = require('./selectors')
  , behavors = require('./behaviors')
  , $mainContainer = selectors.mainContainer
  , $loader = selectors.gifLoader
  , $sidebar = selectors.sidebar

module.exports = {
    renderHome: renderHome
  , renderPlace: renderPlace
  , renderPlaces: renderPlaces
  , renderAddPlace: renderAddPlace
  , renderTowns: renderTowns
  , renderTown: renderTown
  , renderAddTown: renderAddTown
  , renderTownsSelect: renderTownsSelect
  , renderCountries: renderCountries
  , renderCountry: renderCountry
  , renderAddCountry: renderAddCountry
  , renderCountriesSelect: renderCountriesSelect
}


function renderPage(title, content) {
  var $main = $mainContainer()
    , pageTemplate = _.template($('#js-page').html())
  $main.html(pageTemplate({title: title, content: content}))
}


function renderHome() {
  var homeTemplate = _.template($('#js-home').html())
  renderPage('Homepage', homeTemplate())
  updateSidebar('home')
  hideLoader()
}


// PLACES

function renderPlace(place, comments) {
  var placeItemTemplate = _.template($('#js-place-item').html())
  renderPage('Place: ' + place.name, placeItemTemplate({
      place: place
    , comments: comments
    , town: place.town
    , country: place.town.country
  }))
  hideLoader()
  behavors.showPlace(place)
}

function renderPlaces(dataP) {
  var places = dataP.data
    , placeListTemplate = _.template($('#js-place-list').html())
  renderPage('Places', placeListTemplate({places: places}))
  updateSidebar('places')
  hideLoader()
  behavors.placesList()
}

function renderAddPlace() {
  var addPlaceTemplate = _.template($('#js-add-place').html())
  renderPage('Add a Place', addPlaceTemplate())
  updateSidebar('place-add')
  hideLoader()
  behavors.addPlaceForm()
}


// TOWNS

function renderTowns(dataT) {
  var towns = dataT.data
    , townItemListTemplate = _.template($('#js-town-item-list').html())
    , str = ''
  $.each(towns, function(i, town) {
    str += townItemListTemplate(town)
  })
  renderPage('Towns', str)
  updateSidebar('towns')
  hideLoader()
}

function renderTown(dataT) {
  var town = dataT.data
    , townItemTemplate = _.template($('#js-town-item').html())
  renderPage('Town: ' + town.name, townItemTemplate({
      town: town
    , country: town.country
  }))
  hideLoader()
}

function renderAddTown() {
  var addTownTemplate = _.template($('#js-add-town').html())
  renderPage('Add a Town', addTownTemplate())
  updateSidebar('town-add')
  hideLoader()
  behavors.addTownForm()
}

function renderTownsSelect(dataT) {
  var townsSelectTemplate = _.template($('#js-towns-select').html())
  $('.towns-select').html(townsSelectTemplate({ towns: dataT.data }))
}


// COUNTRIES

function renderCountries(dataC) {
  var countries = dataC.data
    , townItemListTemplate = _.template($('#js-country-item-list').html())
    , str = ''
  $.each(countries, function(i, country) {
    str += townItemListTemplate(country)
  })
  renderPage('Countries', str)
  updateSidebar('countries')
  hideLoader()
}

function renderCountry(dataC) {
  var country = dataC.data
    , townItemTemplate = _.template($('#js-country-item').html())
  renderPage('Country: ' + country.name, townItemTemplate({ country: country }))
  hideLoader()
}

function renderAddCountry() {
  var addCountryTemplate = _.template($('#js-add-country').html())
  renderPage('Add a Country', addCountryTemplate())
  updateSidebar('country-add')
  hideLoader()
  behavors.addCountryForm()
}

function renderCountriesSelect(dataC) {
  var countriesSelectTemplate = _.template($('#js-countries-select').html())
  $('.countries-select').html(countriesSelectTemplate({ countries: dataC.data }))
}


// Internal

function updateSidebar(toActive) {
  var $s = $sidebar()
    , active = 'active'
  $s.find('li.' + active).removeClass(active)
  $s.find('li.css-' + toActive).addClass(active)
}

function hideLoader() {
  $loader().hide()
}
