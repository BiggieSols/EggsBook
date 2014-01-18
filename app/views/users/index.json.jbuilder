json.array!(@users) do |user|
  json.(user, :id, :name, :email, :about_me)

  if (user.profile_picture.url == "/images/original/missing.png")
    json.profile_picture_url("")
  else
    json.profile_picture_url(user.profile_picture.url)
  end
end