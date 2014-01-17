class CommentLikesController < ApplicationController
  def create
    comment_id_to_add = [params[:comment_id].to_i]
    current_user.liked_comment_ids += comment_id_to_add
    Comment.find(params[:comment_id]).post.touch
    redirect_to feed_url
  end

  def destroy
    comment_id_to_destroy = [params[:comment_id].to_i]
    current_user.liked_comment_ids -= comment_id_to_destroy
    redirect_to feed_url  
  end
end
