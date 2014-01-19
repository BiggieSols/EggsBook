EggsBook.Collections.Users = Backbone.Collection.extend({
  url: '/users',

  model: EggsBook.Models.User,

  parse: function(response, options) {
    return response;
  }
});