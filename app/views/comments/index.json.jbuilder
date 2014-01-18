json.array!(@comments) do |comment|
  json.(comment, :id, :details, :user_id)
  json.liking_user_ids(comment.liking_user_ids)
end