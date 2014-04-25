PlaceManager.module("HeaderApp.List", function(List, PlaceManager, Backbone, Marionette, $, _){
  List.Controller = {
    listHeader: function(){
      var links = PlaceManager.request("header:entities");
      var headers = new List.Headers({collection: links});

      headers.on("brand:clicked", function(){
        PlaceManager.trigger("places:list");
      });

      headers.on("itemview:navigate", function(childView, model){
        var trigger = model.get("navigationTrigger");
        PlaceManager.trigger(trigger);
      });

      PlaceManager.headerRegion.show(headers);
    },

    setActiveHeader: function(headerUrl){
      var links = PlaceManager.request("header:entities");
      var headerToSelect = links.find(function(header){ return header.get("url") === headerUrl; });
      headerToSelect.select();
      links.trigger("reset");
    }
  };
});
