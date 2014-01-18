json.(@user, :id, :name, :email, :about_me)

if (@user.profile_picture.url == "/images/original/missing.png")
  json.profile_picture_url("")
else
  json.profile_picture_url(@user.profile_picture.url)
end

json.posts do
  json.array!(@user.posts) do |post|
    json.id(post.id)
  end
end

json.favorite_foods do
  json.favorite_foods_ids(@user.favorite_food_ids)
end