EggsBook.Collections.Users = Backbone.Collection.extend({
  url: '/users', 

  parse: function(response, options) {
    
    return response;
  }
})