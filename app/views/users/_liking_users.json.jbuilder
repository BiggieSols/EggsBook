json.liking_users do
  json.array!(likable_object.liking_users) do |user|
    json.id = user.id
    json.name = user.name
  end
end