class Order
  include Mongoid::Document
  include Mongoid::Timestamps
  field :token, type: String
  field :description, type: String
  field :observation, type: String
  field :has_shipping, type: Boolean

  belongs_to :address
  belongs_to :payment
  belongs_to :user, polymorphic: true
  embeds_many :itens, :as => :order_itens, :class_name => "OrderItem"
end
