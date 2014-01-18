EggsBook.Views.PostView = Backbone.View.extend({
  template: JST['posts/show'],

  render: function() {
    var renderedContent = this.template({post: this.model})
    // console.log(this.model);
    // var renderedContent = "<div>"+this.model.get('comments')+"</div>";
    this.$el.html(renderedContent);
    return this;
  }
})