EggsBook.Collections.Posts = Backbone.Collection.extend({
  initialize: function(options) {
    // this.user_id = options.user_id
    // this.photo_only = options.photos_only
  }, 

  url: '/posts'

  // url: function(){
  //   // convert this to a switch statement later
  //   if(this.user_id) {
  //     if(this.photos_only) {
  //       return '/users/' + user_id + '/photos'  
  //     } else {
  //       return '/users/' + user_id + '/posts'
  //     }
  //   } else {
  //     return '/posts'      
  //   }
  // }
})