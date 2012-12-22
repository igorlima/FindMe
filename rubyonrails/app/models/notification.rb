class Notification
  include Mongoid::Document
  field :params, type: String
  field :invoice, type: String
  field :status, type: String
  field :transaction_id, type: String

  embedded_in :payment_notification
end
