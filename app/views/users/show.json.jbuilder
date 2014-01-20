# json.(@user, :id, :name, :email, :about_me, :photo_urls)

# json.posts(@user.posts) do |post|
#   json.partial!('posts/single_post', post: post)
# end

# json.partial!('users/user_lite', user: @user)

json.(@user, :id, :name, :email, :about_me, :photo_urls, :favorite_food_ids)

json.posts do
  json.array!(@user.posts) do |post|
    json.partial!('posts/single_post', post: post)
  end
end

# only necessary to tell whether the current has liked a particular post or comment
if @user == current_user
  # json.favorite_foods_ids(@user.favorite_food_ids)
  json.liked_post_ids(@user.liked_post_ids)
  json.liked_comment_ids(@user.liked_comment_ids)
end