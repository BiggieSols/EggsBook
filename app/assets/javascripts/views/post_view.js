EggsBook.Views.PostView = Backbone.View.extend({
  events: {
    'submit #new_comment':'add_comment',
    'click .like':'toggleLike',
    'click .unLike':'toggleLike'
  },

  initialize: function() {
    // this.listenTo(this.model.get('comments'), "all", this.render);
    this.listenTo(this.model.get('liking_users'), "add remove", this.render);
    this.listenTo(this.model.get('comments'), "add remove change", this.render);
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

  toggleLike: function(event) {
    var _setAttributes = function() {
      var attributes = {};
      attributes[attrName] = likedObjIds;
      console.log("Attributes are ");
      console.log(attributes);
      EggsBook.currentUser.set(attributes);
    };

    var _like = function() {
      likedObjIds = likedObjIds.concat(dataId);

      _setAttributes();

      target.get('liking_users').add(EggsBook.currentUser);
      likeObj.save();
    };

    var _unLike = function() {
      // set dummy id so we can destroy the object. 
      // destroy is based on the current_user and post_id or comment_id server side, 
      // not the id of the PostLike or CommentLike object
      likeObj.id = -1;
      likedObjIds = _.without(likedObjIds, dataId);

      _setAttributes();

      target.get('liking_users').remove(EggsBook.currentUser);
      likeObj.destroy();
    };

    var button = $(event.currentTarget);
    var dataType = button.attr("data-type");
    var action = button.attr("data-action");
    var dataId = parseInt(button.attr("data-id"));
    var likeObj, target;

    if(dataType === "post") {
      likeObj = new EggsBook.Models.PostLike({ "post_id": this.model.id });
      target = this.model;
    } else {
      likeObj = new EggsBook.Models.CommentLike({"comment_id": dataId});
      target = this.model.get('comments').get(dataId);
    }

    var attrName = 'liked_'+ dataType + '_ids';
    var likedObjIds = EggsBook.currentUser.get(attrName);

    if(action == "like"){
      console.log("attempting to like");
      _like();
    } else {
      console.log("attempting to unLike");
      _unLike();
    }
    this.render();
  },
});




