class User < ActiveRecord::Base
  attr_accessible :email, :password, :favorite_food_ids, :name, :about_me, :profile_picture

  has_attached_file :profile_picture, styles: {
    large: "600x600",
    medium: "300x300",
    small: "150x150",
    icon: "40x40"
  }


  attr_accessor :password

  before_validation :set_session_token, :set_password_digest, on: :create

  validates :email, :password_digest, :session_token, presence: true
  validates :password, length: { minimum: 4 }, on: :create

  has_many :posts
  has_many :comments #comments that I made, not comments made on my posts

  # Polymorophic inheritance. 
  #   Note: Rails does not support polymorphic has_many_through 
  #   with the generic "likable_object" e.g. user has_many liked_objects
  has_many :likes
  has_many :liked_posts, through: :likes, source: :likable_object, source_type: 'Post'
  has_many :liked_comments, through: :likes, source: :likable_object, source_type: 'Comment'

  has_many :user_foods
  has_many :favorite_foods, through: :user_foods, source: :food

  has_many :friendships, foreign_key: :user_id
  has_many :friends, through: :friendships, source: :friended_user

  has_many :made_friend_requests,
              foreign_key: :user_id,
              class_name: "FriendRequest"

  has_many :received_friend_requests,
              foreign_key: :friend_id,
              class_name: "FriendRequest"

  has_many :friends_requested,
              through: :made_friend_requests,
              source: :requested_user

  has_many :users_requesting_friendship,
              through: :received_friend_requests,
              source: :requesting_user

  def self.find_by_credentials(params={email: nil, password: nil})
    user = User.find_by_email(params[:email]);
    return user if user && user.is_password?(params[:password])
    nil
  end

  def set_session_token
    self.session_token = SecureRandom.urlsafe_base64(16);
  end

  def reset_session_token!
    set_session_token
    save!
  end

  def set_password_digest
    self.password_digest = BCrypt::Password.create(self.password);
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password);
  end

  def friendship_status_with(other_user_id)
    case
    when self.is_friends_with(other_user_id)
      return :friend
    when self.has_friend_request_from(other_user_id)
      return :requires_your_response
    when self.has_requested_friendship_from(other_user_id)
      return :requires_friend_response
    else
      return :none
    end
  end

  def is_friends_with(other_user_id)
    return self.friends.map(&:id).include?(other_user_id)
  end

  def has_friend_request_from(other_user_id)
    return self.users_requesting_friendship.map(&:id).include?(other_user_id)
  end

  def has_requested_friendship_from(other_user_id)
    return self.friends_requested.map(&:id).include?(other_user_id)
  end

  def confirm_friend_request(other_user_id)
    # remove the previously existing friend request
    # need to reverse order here since the other user initially requested the friendship
    request = FriendRequest.find_by_user_id_and_friend_id(other_user_id, self.id)

    # TODO: handle case when friend request does not exist
    request.destroy

    # add two new friendships (bi-directional)
    friendship_1 = Friendship.new(user_id: self.id, friend_id: other_user_id)
    friendship_2 = Friendship.new(user_id: other_user_id, friend_id: self.id)
    [friendship_1, friendship_2]
  end

  def photo_urls
    if self.profile_picture.url == "/profile_pictures/original/missing.png"
      return {} 
    else
      sizes = [:icon, :small, :medium, :large]
      photo_urls = {}
      sizes.each {|size| photo_urls[size] = self.profile_picture.url(size)}
      return photo_urls
    end
  end
end
