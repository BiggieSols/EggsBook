EggsBook.Models.Comment = Backbone.Model.extend({
  // initialize: function(options) {
    // this.liking_users = options.liking_users
  // },
  // urlRoot: '/comments'
  collection: EggsBook.Collections.Comments,

  parse: function(response) {
    console.log("got to comment model parse function");
    // response.user = new EggsBook.Model.User(response.user);

    var liking_users = new EggsBook.Collections.Users();
    parsed_liking_users = liking_users.parse(response.liking_users);
    response.liking_users = liking_users.set(parsed_liking_users);
    return response;
  }
});