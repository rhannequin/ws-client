PlaceManager.module("AboutApp.Show", function(Show, PlaceManager, Backbone, Marionette, $, _){
  Show.Message = Marionette.ItemView.extend({
    template: "#about-message"
  });
});
