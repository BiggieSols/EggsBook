EggsBook.Collections.Posts = Backbone.Collection.extend({
  // initialize: function(options) {
    // this.user_id = options.user_id
    // this.photo_only = options.photos_only
  // },
  model: EggsBook.Models.Post,



  url: '/posts',

  withPhotos: function() {
    var photoPosts = [];
    this.models.forEach(function(post) {
      // see if there are images available
      if(post.get('image_urls').small) {
        console.log("success");
        photoPosts.push(post);
      }
    });

    return photoPosts;
  }

  // parse: function(response, options) {
    // console.log(response);
    // response.forEach(function(json_item) {
    //   var comments = new EggsBook.Collections.Comments()
    //   json_item.comments.forEach(function(comment) {
    //     comment = EggsBook.comments.get(comment.id)
    //     comments.add(comment);
    //   });
    //   // json_item.comments = new EggsBook.Collections.Comments(json_item.comments)
    //   json_item.comments = comments
    // });
    // console.log(new EggsBook.Models.Post(response));
    // return response;
  // }

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