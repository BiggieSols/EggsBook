json.(user, :id, :name, :email, :about_me, :photo_urls, :favorite_food_ids, :friend_ids)

json.posts do
  json.array!(user.posts) do |post|
    json.partial!('posts/single_post', post: post)
  end
end

# json.friends_ids do
#   json.array!(user.friends) do |friend|
#     json.partial!('users/user_lite', user: friend)
#   end
# end

# only necessary to tell whether the current has liked a particular post or comment
if user == current_user
  json.liked_post_ids(user.liked_post_ids)
  json.liked_comment_ids(user.liked_comment_ids)
  json.(user, :friend_ids, :friends_requested_ids, :users_requesting_friendship_ids)
end