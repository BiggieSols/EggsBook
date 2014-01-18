window.EggsBook = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new EggsBook.Routers.Router({$rootEl: $('#content')});
    Backbone.history.start();
  }
};

$(document).ready(function(){
  EggsBook.initialize();
});
