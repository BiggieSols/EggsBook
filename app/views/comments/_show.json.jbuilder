json.(comment, :id, :details, :user_id)

json.partial!('users/liking_users', likable_object: comment)