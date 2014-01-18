json.(comment, :id, :details)
json.user_info do
  json.partial!('users/user_lite', user: comment.user)
end
# json.user(comment.user.id)#, comment.user.name)#, comment.user.profile_picture.url)

json.partial!('users/liking_users', likable_object: comment)