class PostLikesController < ApplicationController
  def create
    post_id_to_add = [params[:post_id].to_i]
    current_user.liked_post_ids += post_id_to_add
    Post.find(params[:post_id]).touch

    # redirect_to feed_url
    # head :ok
    render json: {}
  end

  def destroy

    post_id_to_destroy = [params[:post_id].to_i]
    current_user.liked_post_ids -= post_id_to_destroy
    head :ok
    # redirect_to feed_url
  end
end
