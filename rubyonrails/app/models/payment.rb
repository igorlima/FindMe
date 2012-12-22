class Payment
  include Mongoid::Document
  include Mongoid::Timestamps
  field :params, type: String
  field :status, type: String
  field :transaction_id, type: String
  field :payer_id, type: String

  has_one :order
  embeds_one :payment, :as => :payment_notification, :class_name => "Notification"
end
