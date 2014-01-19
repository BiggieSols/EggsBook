EggsBook.Views.PostView = Backbone.View.extend({
  events: {
    'submit #new_comment':'add_comment',
    'click .like':'like',
    'click .unLike':'unLike'
  },

  initialize: function() {
    // this.listenTo(this.model.get('comments'), "all", this.render);
    this.listenTo(this.model.get('liking_users'), "add remove", this.render);
  },

  template: JST['posts/show'],

  render: function() {
    console.log("rendering!");
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
    var button = $(event.currentTarget);
    var dataType = button.attr("data-type");
    if(dataType === "post") {
      var likeObj = new EggsBook.Models.PostLike({ "post_id": this.model.id });
      var target = this.model;
    } else {
      // add logic here
      // likeObj = EggsBook.Models.CommentLike({"comment_id"})
    }

    var attrName = 'liked_'+ dataType + '_ids';

    var likedObjIds = EggsBook.currentUser.get(attrName);
    likedObjIds = likedObjIds.concat(parseInt(button.attr('data-id')));

    var attributes = {};
    attributes[attrName] = likedObjIds;
    EggsBook.currentUser.set(attributes);

    target.get('liking_users').add(EggsBook.currentUser);
    likeObj.save();
  },

  unLike: function(event) {
    button = $(event.currentTarget);
    var dataType = button.attr("data-type");
    if(dataType == "post") {
      var likeObj =  new EggsBook.Models.PostLike({"post_id": this.model.id});
      // set dummy id so we can destroy the object. 
      // destroy is based on the current_user and post_id server side, 
      // not the id of the PostLike object
      likeObj.id = -1;
      var target = this.model;
    } else {
      // add logic here for comments
    }
    var attrName = 'liked_'+ dataType + '_ids';

    var likedObjIds = EggsBook.currentUser.get(attrName);

    // different from above
    likedObjIds = _.without(likedObjIds, parseInt(button.attr('data-id')));
    // end difference

    var attributes = {};
    attributes[attrName] = likedObjIds;
    EggsBook.currentUser.set(attributes);

    target.get('liking_users').remove(EggsBook.currentUser);
    // different from above
    likeObj.destroy();
    // end difference
  },
});





