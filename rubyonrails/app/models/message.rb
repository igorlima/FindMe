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
end
