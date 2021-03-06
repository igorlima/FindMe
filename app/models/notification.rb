class Notification
  include Mongoid::Document
  include Mongoid::Timestamps
  field :params,         type: String
  field :status,         type: String
  field :transaction_id, type: String

  belongs_to  :payment, polymorphic: true

end
