class Message
  include Mongoid::Document
  include Mongoid::Paranoia
  include Mongoid::Timestamps

  field :name, type: String
  field :phone, type: String
  field :email, type: String
  field :subject, type: String
  field :text, type: String
  field :read, type: Integer, default: 0

  belongs_to :user, polymorphic: true

  validates_presence_of :user, :message => "Favor fazer o login para enviar uma mensagem"

  def as_json(options={})
    {
      name:    name,
      phone:   phone,
      email:   email,
      subject: subject,
      text:    text,
      read:    read,
      user:    user
    }
  end

end
