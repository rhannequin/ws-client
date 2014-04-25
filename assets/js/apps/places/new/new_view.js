PlaceManager.module("PlacesApp.New", function(New, PlaceManager, Backbone, Marionette, $, _){
  New.Place = PlaceManager.PlacesApp.Common.Views.Form.extend({
    title: "New Place",

    onRender: function(){
      this.$(".js-submit").text("Create place");
    }
  });
});
