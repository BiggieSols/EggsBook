class FeedsController < ApplicationController
  def show
    @feed_posts = current_user.friends.map(&:posts).flatten
    @feed_posts += current_user.posts
    @feed_posts += current_user.liked_posts
    @feed_posts.flatten.uniq
    @feed_posts.sort_by! {|post| post.updated_at }
    @feed_posts.reverse!

    ids = @feed_posts.map(&:id)

    # @posts = Post.includes(:comments)
    #         .includes(:commenting_users)
    #         .includes(:liking_users)
    #         .find(ids)

    # @posts = Post.find(ids, include: [:posting_users, :liking_users, :comments => { [:user, :liking_users] }])
    @feed_posts = Post.find(ids, include: [:posting_user, :liking_users, :comments => [:user, :liking_users] ])

    # posting user
    # liking users
    # comments

    # comment.user
    # comment.liking_users



    # head :ok

    # User.find(params[:user_id], include: {:friends => {:posts => :comments}})

    # render json: @feed_posts
  end
end
