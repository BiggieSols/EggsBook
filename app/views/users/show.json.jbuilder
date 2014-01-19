json.(@user, :id, :name, :email, :about_me, :photo_urls)

json.posts(@user.posts) do |post|
  json.partial!('posts/single_post', post: post)
end

if @user == current_user
  json.favorite_foods_ids(@user.favorite_food_ids)
  json.liked_post_ids(@user.liked_post_ids)
  json.liked_comment_ids(@user.liked_comment_ids)
end