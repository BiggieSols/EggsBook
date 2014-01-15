class User < ActiveRecord::Base
  attr_accessible :email, :password
  attr_accessor :password

  before_validation :set_session_token, :set_password_digest, on: :create

  validates :email, :password_digest, :session_token, presence: true
  validates :password, length: { minimum: 4 }, on: :create

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
end
