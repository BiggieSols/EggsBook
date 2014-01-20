json.(post, :id, :details, :image_urls)

json.user do
  json.partial!('users/user_lite', user: post.posting_user)
end

json.partial!('users/liking_users', likable_object: post)

json.comments(post.comments) do |comment|
  json.partial!('comments/show', comment: comment)
end