![landing page](https://raw2.github.com/BiggieSols/EggsBook/master/app/assets/images/github_readme_images/EggsBook_landing_page.png)

Live version: http://herokuapp.eggsbook.com

<h1>EggsBook<h1> <h3>the social network for people who love breakfast<h3>

This is a demo project with a limited set of facebook features, built with Ruby on Rails and Backbone.js. The project took about one week to complete.

<h3>Backbone on Rails</h3>
* Except for the landing page, the app runs entirely in backbone.js with rails on the back-end. Rails recieves and responds with JSON requests as submitted by backbone. 
* Data is deeply nested in some requests. or example a post includes: the post content, the posting user, the liking users, the comments on the post, and the liking users of each comment. And of course a feed is a collection of posts. To handle this more elegantly I use jbuilder to create the API. 
* Backbone takes a json response from rails and parses out all the individual objects on the client side. To some extent this is handled in backbone, but to created nested object relationships we need to override the Backbone.js Parse method for our collections and models. We can "chain" parse methods in backbone to build a whole series of nested objects from a single JSON response. 
* Once an object has been pulled down from the server, it is stored on the client side and not created again unless it is updated. This won't work well with multiple users interacting simultaneously in the app, so scaling will require a bit of a different approach.

<h3>Authentication</h3>
* I built the user auth system from scratch, with BCrypt as the password encryption method. I use the ruby bcrypt gem to handle the encryption and verification of passwords. Of course no plain text passwords are stored. Upon successful login a cookie is set on the user's browser using the built-in rails session functionality.

<h3>Components</h3>

The app has two pages: the feed page and the user profile page. More detail on these below.

<h4>Posts</h4>
* a user can create a post and upload photos via a drag and drop interface. I used Dropzone (http://www.dropzonejs.com) to support file uploads rather than use a standard form input

<h4>Comments</h4>
* A post can be commented on by a user. Comments appear in-line as they are created on the feed, and also on the profile page.

<h4>Likes</h4>
* A post or comment can be "liked" by a user. Each post and comment display "liking users" along with its content. To handle this, I used a polymorphic association in rails with ActiveRecord, and also in Backbone by creating a LikeableObject superclass. 

* In rails the polymorphic association allows us to create a single join table for posts and comments as likable objects, where we have 3 columns: (liking_user_id, object_id, object_type). This could easily extend to new types of likable objects as they're added to the featureset (calendar events, photo album creations, etc.).

* In backbone, there's a lot of shared code for likes between posts and comments. There is a single view for "liking users" and the "like button" that is re-used for posts and comments. The backbone.js superclass view for LikeableObject contains event listeners for like and un-like actions and is inherited by the PostView and CommentView.


<h4>Users</h4>
* A user can create posts, which will appear on their profile page. Posts that have photos are also displayed on a separate tab and can be expanded to a larger resolution view. Users can also have friendships with other users (more details below). 

<h4>Friendships</h4>
* Friendships exist between two users, and require a friend request --> confirmation to be established, just like facebook. To do this I created a FriendRequest model and a FriendShip model. A friend request creates a new instance of a FriendRequest, and the confirmation destroys the FriendRequest and creates the friendship. Note that a friend request is a one-directional

<h4>Feed</h4>
* The news feed contains posts we expect you might be interested in. It shows your own posts, your friends' posts, and posts you have commented on, liked, or like other users' comments on. Posts are sorted in reverse chronological order based on their last update, comment, or like.


![feed page](https://raw2.github.com/BiggieSols/EggsBook/master/app/assets/images/github_readme_images/EggsBook_Feed.png)

![profile page](https://raw2.github.com/BiggieSols/EggsBook/master/app/assets/images/github_readme_images/EggsBook_profile_page.png)
