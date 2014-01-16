class FeedsController < ApplicationController
  def show
    @user = User.find(params[:user_id], include: {:friends => {:posts => :comments}})
    @feed_posts = @user.friends.map(&:posts).inject(:+)
    # render json: @feed_posts
  end
end
