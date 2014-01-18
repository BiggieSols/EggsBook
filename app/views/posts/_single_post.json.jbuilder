json.(post, :id, :user_id, :details)
if (post.image.url == "/images/original/missing.png")
  json.image_url("")
else
  json.image_url(post.image.url)
end


json.comments do
  json.array(post.comments) do |comment|
    json.partial!('comments/show', comment: comment)
  end
end