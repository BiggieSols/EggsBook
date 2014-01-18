json.liking_users do
  json.array!(likable_object.liking_users) do |user|
    json.partial!('users/user_lite', user: user)
  end
end