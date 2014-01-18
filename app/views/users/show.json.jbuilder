json.(@user, :id, :name, :email, :about_me, :photo_url)

json.posts do
  json.array!(@user.posts) do |post|
    json.id(post.id)
  end
end

json.favorite_foods do
  json.favorite_foods_ids(@user.favorite_food_ids)
end