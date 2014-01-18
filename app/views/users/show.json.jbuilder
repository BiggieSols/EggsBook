json.(@user, :id, :name, :email, :about_me, :photo_urls)

json.posts(@user.posts) do |post|
  json.partial!('posts/single_post', post: post)
end

json.favorite_foods do
  json.favorite_foods_ids(@user.favorite_food_ids)
end