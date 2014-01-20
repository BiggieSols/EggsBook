json.array!(@foods) do |food|
  json.(food, :id, :name, :photo_urls)
end
  