class FriendshipsController < ApplicationController
  def create
    other_user_id = params[:friend_id]
    friendship_1, friendship_2 = current_user.confirm_friend_request(other_user_id)

    # ADD THIS AFTER TESTING
    ActiveRecord::Base.transaction do
      if friendship_1.save  && friendship_2.save
        flash.now[:success] = "request approved!"
        render json: [friendship_1, friendship_2]
      else
        errors = friendship_1.errors.full_messages + friendship_2.errors.full_messages
        flash.now[:errors] = errors
        render json: errors
      end
    end
  end

  def destroy
    friendship_1 = Friendship.find_by_user_id_and_friend_id(current_user.id, params[:friend_id])
    friendship_2 = Friendship.find_by_user_id_and_friend_id(params[:friend_id], current_user.id)
    friendship_1.destroy
    friendship_2.destroy
    flash.now[:success] = "un-friended!"
    render json: true
  end
end