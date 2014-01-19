EggsBook.Views.PostView = Backbone.View.extend({
  events: {
    'submit #new_comment':'add_comment',
    'click .like':'like',
    'click .unLike':'unLike'
  },

  initialize: function() {
    // this.listenTo(this.model.get('comments'), "all", this.render);
    this.listenTo(this.model.get('liking_users'), "add", this.render);
  },

  template: JST['posts/show'],

  render: function() {
    console.log("rendering!");
    console.log("num liking users: " + this.model.get('liking_users').models.length);
    var renderedContent = this.template({post: this.model, currentUser: EggsBook.currentUser});
    this.$el.html(renderedContent);
    return this;
  },

  add_comment: function(event) {
    var that = this;

    event.preventDefault();

    var formData = $(event.currentTarget).serializeJSON();
    formData.comment.post_id = this.model.id;
    console.log(formData);

    var comment = new EggsBook.Models.Comment(formData.comment);

    console.log(comment);

    comment.save({}, {
      success: function() {
        that.model.get('comments').add(comment);
      },
    });
  },

  // clean this up later. toggle both classes
  like: function(event) {
    button = $(event.currentTarget);
    this.changeButton(button, "like");
    // console.log(button.attr("data-type"))
    if(button.attr("data-type") === "post") {
      objToLike = new EggsBook.Models.PostLike({ "post_id": this.model.id });
    } else {
      // add logic here
      // objToLike = EggsBook.Models.CommentLike({"comment_id"})
    }
    likedPostIds = EggsBook.currentUser.get('liked_post_ids');
    likedPostIds = likedPostIds.concat(parseInt(button.attr('data-id')));
    EggsBook.currentUser.set({'liked_post_ids': likedPostIds});
    var post = this.model;
    post.get('liking_users').add(EggsBook.currentUser);
    objToLike.save();
    // this.render();


    // var that = this;
    // objToLike.save({}, {
    //   success: function() {
    //     that.model.set('likedByCurrentUser', true);

    //     // temp: replace 1 with an actual value. need to set a "Current User" for the app.
    //     var currentUser = new EggsBook.Models.User({'id': 1});

    //     currentUser.fetch({
    //       success: function() {
    //         that.model.get('liking_users').add(currentUser, {
    //           success: function() {
    //             console.log("successfully fetched current user");
    //           }
    //         });
    //         console.log(that.model.get('liking_users'));
    //       }
    //     });
        
    //   },

    //   error: function() {
    //     console.log("there was an error");
    //   }
    // });
  },

  unLike: function(event) {
    button = $(event.currentTarget);
    this.changeButton(button, "unLike");
  },

  changeButton: function(button, currentClass) {
    classToAdd = (currentClass == "like" ? "unLike" : "like");
    buttonText = currentClass == "like" ? "Un-Like" : "Like";
    button.text(buttonText).removeClass(currentClass).addClass(classToAdd);
  }
});





