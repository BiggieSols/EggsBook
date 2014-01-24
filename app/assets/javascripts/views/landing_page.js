EggsBook.Views.LandingPageView = Backbone.View.extend({
  events: {
    "submit #new-session":"submit"
  },

  template: JST['new_session/new_session'],
  top_nav_template: JST['landing_page/top_nav'],

  togglePageStyle: function() {
    $('body').toggleClass('splash');
    console.log("toggled!");
  },

  addTopNav: function() {
    var renderedTopNav = this.top_nav_template({user: EggsBook.currentUser});
    $('#top-nav-container').html(renderedTopNav);
  },

  render: function() {
    this.togglePageStyle();
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    return this;
  },

  submit: function(event) {
    event.preventDefault();
    var formData = $(event.currentTarget).serializeJSON();
    this.model.set(formData);
    var that = this;

    this.model.save({}, {
      success: function() {
        console.log("log in successful");
        that.togglePageStyle();
        EggsBook.currentUser.fetch({
          success: function() {
            console.log("fetched successfully!");
            that.addTopNav();
          }
        });
        Backbone.history.navigate("feed", {trigger: true});
      },
      error: function() {
        console.log("log in failed");
      }
    });
  }, 

  removeBackgroundImage: function() {
    $('body').removeClass("landing-page");
  }
}); 