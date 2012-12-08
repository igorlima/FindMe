class User
  include Mongoid::Document
  field :provider, type: String
  field :uid, type: String
  field :name, type: String
  field :first_name, type: String
  field :email, type: String
  field :image, type: String
  field :oauth_token, type: String
  field :oauth_expires_at, type: Time

  def self.from_omniauth(auth)
    user = User.where( uid: auth.uid, provider: auth.provider ).first
    user = User.new if user.nil?

    user.provider = auth.provider
    user.uid = auth.uid
    user.name = auth.info.name
    user.email = auth.info.email
    user.first_name = auth.info.first_name
    user.image = auth.info.image
    user.oauth_token = auth.credentials.token
    user.oauth_expires_at = Time.at(auth.credentials.expires_at)
    user.save

    user
  end

end