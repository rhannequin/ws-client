PlaceManager.module("AboutApp.Show", function(Show, PlaceManager, Backbone, Marionette, $, _){
  Show.Controller = {
    showAbout: function(){
      var view = new Show.Message();
      PlaceManager.mainRegion.show(view);
    }
  };
});
