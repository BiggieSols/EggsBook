json.array!(@users) do |user|
  json.partial!('users/user_full', user: user)
end