PlaceManager.module("HeaderApp", function(Header, PlaceManager, Backbone, Marionette, $, _){
  var API = {
    listHeader: function(){
      Header.List.Controller.listHeader();
    }
  };

  PlaceManager.commands.setHandler("set:active:header", function(name){
    PlaceManager.HeaderApp.List.Controller.setActiveHeader(name);
  });

  Header.on("start", function(){
    API.listHeader();
  });
});
