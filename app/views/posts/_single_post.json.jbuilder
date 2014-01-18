json.(post, :id, :details)
if (post.image.url == "/images/original/missing.png")
  json.image_url("")
else
  json.image_url(post.image.url)
end

json.user do
  json.partial!('users/user_lite', user: post.posting_user)
end


json.comments(post.comments) do |comment|
  json.partial!('comments/show', comment: comment)
end