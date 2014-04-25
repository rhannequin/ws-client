var PlaceManager = new Marionette.Application();

PlaceManager.addRegions({
  headerRegion: "#header-region",
  mainRegion: "#main-region",
  dialogRegion: Marionette.Region.Dialog.extend({
    el: "#dialog-region"
  })
});

PlaceManager.navigate = function(route,  options){
  options || (options = {});
  Backbone.history.navigate(route, options);
};

PlaceManager.getCurrentRoute = function(){
  return Backbone.history.fragment
};

PlaceManager.on("initialize:after", function(){
  if(Backbone.history){
    Backbone.history.start();

    if(this.getCurrentRoute() === ""){
      PlaceManager.trigger("places:list");
    }
  }
});