EggsBook.Views.LikableObject = Backbone.View.extend({
  events: {
    'click .like':'toggleLike',
    'click .unLike':'toggleLike'
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
      // TODO: replace with backbone model override to change DELETE url
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
      _like();
    } else {
      _unLike();
    }

    // TODO: replace with event listener. merge listenTo call in initializer here into sub-classes (PostView, CommentView)
    this.render();
  },
});