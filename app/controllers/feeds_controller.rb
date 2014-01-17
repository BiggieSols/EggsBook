class FeedsController < ApplicationController
  def show
    @feed_posts = current_user.friends.map(&:posts).flatten
    # render json: @feed_posts
  end
end
