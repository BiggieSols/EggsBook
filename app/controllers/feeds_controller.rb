class FeedsController < ApplicationController
  def show
    @feed_posts = current_user.friends.map(&:posts).flatten
    @feed_posts += current_user.posts
    @feed_posts += current_user.liked_posts
    @feed_posts.flatten.uniq
    @feed_posts.sort_by! {|post| post.updated_at }
    # render json: @feed_posts
  end
end
