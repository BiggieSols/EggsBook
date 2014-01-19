EggsBook.Models.User = Backbone.Model.extend({
  // confirm that this will happen automatically, but seems likely
  urlRoot: '/users',

  parse: function(response, options) {
    console.log(response);
    return response;
  }
});