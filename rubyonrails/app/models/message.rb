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
  validates_presence_of :text, :message => "Favor preencher pelo menos o conteudo da mensagem"

  def as_json(options={})
    {
      _id:        id,
      name:       name,
      phone:      phone,
      email:      email,
      subject:    subject,
      text:       text,
      read:       read,
      user:       user,
      created_at: created_at.strftime("%H:%M - %d/%m/%Y"),
      updated_at: updated_at.strftime("%H:%M - %d/%m/%Y")
    }
  end

end
