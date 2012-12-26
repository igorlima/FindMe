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

  has_many :orders, :class_name => "Order"
  has_many :messages, :class_name => "Message"

  def as_json(options={})
    {
      provider:  provider,
      uid:       uid,
      name:      name,
      firstName: first_name,
      image:     image
    }
  end

  def last_address
    last_order = Order.where( :user => id ).desc("created_at").first
    last_order.nil? ? nil : last_order.address
  end

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
