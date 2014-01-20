json.array!(@feed_posts) do |post|
  json.partial!('posts/single_post', post: post)
end