PlaceManager.module("AboutApp", function(AboutApp, PlaceManager, Backbone, Marionette, $, _){
  AboutApp.Router = Marionette.AppRouter.extend({
    appRoutes: {
      "about" : "showAbout"
    }
  });

  var API = {
    showAbout: function(){
      AboutApp.Show.Controller.showAbout();
      PlaceManager.execute("set:active:header", "about");
    }
  };

  PlaceManager.on("about:show", function(){
    PlaceManager.navigate("about");
    API.showAbout();
  });

  PlaceManager.addInitializer(function(){
    new AboutApp.Router({
      controller: API
    });
  });
});
