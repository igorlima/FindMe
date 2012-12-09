class Message
  include Mongoid::Document
  field :name, type: String
  field :phone, type: String
  field :email, type: String
  field :subject, type: String
  field :text, type: String
end
