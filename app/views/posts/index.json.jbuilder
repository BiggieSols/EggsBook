json.array!(@posts) do |post|
  json.(post, :id, :user_id, :details, :created_at, :updated_at)
  json.image_url(post.image.url == "/images/original/missing.png" ? "" : post.image.url)
  json.liking_user_ids(post.liking_user_ids)
  json.comments do
    json.array!(post.comments) do |comment|
      # may want to remove everything except id
      json.id(comment.id)
      # json.commenting_user_id(comment.user.id)
      # json.details(comment.details)
      # json.liking_user_ids(comment.liking_user_ids)
    end
  end
end