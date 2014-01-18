EggsBook.Models.Comment = Backbone.Model.extend({
  // initialize: function(options) {
    // this.liking_users = options.liking_users
  // },
  // urlRoot: '/comments'
  collection: EggsBook.Collections.Comments,

  parse: function(response) {
    var liking_users = new EggsBook.Collections.Users();
    parsed_liking_users = liking_users.parse(response.liking_users);
    response.liking_users = liking_users.set(parsed_liking_users);
    response.user = new EggsBook.Models.User(response.user);
    return response;
  }
});