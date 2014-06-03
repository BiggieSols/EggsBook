class FeedsController < ApplicationController
  def show
    @feed_posts = current_user.friends.map(&:posts).flatten
    @feed_posts += current_user.posts
    @feed_posts += current_user.liked_posts
    @feed_posts.flatten.uniq
    @feed_posts.sort_by! {|post| post.updated_at }
    @feed_posts

    ids = @feed_posts.map(&:id)

    # nesting includes statements here to optimize query efficiency
    @feed_posts = Post.find(ids, include: [
                              :posting_user, 
                              :liking_users, 
                              :comments => [:user, :liking_users] 
                            ])[0..10]
  end
end
