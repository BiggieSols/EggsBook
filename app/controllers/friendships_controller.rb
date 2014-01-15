class FriendshipsController < ApplicationController
  def create
    other_user_id = params[:friendship][:friend_id]
    friendship_1, friendship_2 = current_user.confirm_friend_request(other_user_id)

    # ADD THIS AFTER TESTING
    ActiveRecord::Base.transaction do
      if friendship_1.save  && friendship_2.save
        flash.now[:success] = "request approved!"
        redirect_to users_url
      else
        errors = friendship_1.errors.full_messages + friendship_2.errors.full_messages
        flash.now[:errors] = errors
        redirect_to users_url
      end
    end
  end

  def destroy
    friendship = Friendship.find_by_user_id_and_friend_id(current_user.id, params[:friend_id])
    friendship.destroy
    flash.now[:success] = "un-friended!"
    redirect_to users_url
  end
end
