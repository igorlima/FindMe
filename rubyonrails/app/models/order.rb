class Order
  include Mongoid::Document
  include Mongoid::Timestamps
  field :token, type: String
  field :description, type: String
  field :observation, type: String
  field :has_shipping, type: Boolean

  belongs_to :address, autosave: true
  belongs_to :payment, autosave: true
  belongs_to :user, polymorphic: true
  embeds_many :itens, :as => :order_itens, :class_name => "OrderItem"

  def fee
    @fee = 0.0
    @configuration = StoreConfiguration.first_one
    @fee += @configuration.online_fee
    @fee += @configuration.delivery_fee if self.has_shipping
    @fee.round(2)
  end

  def total_itens
    @total_itens = 0.0
    self.itens.each do |item|
      @total_itens += CardapioItem.find( item.cardapio_item_id ).price * item.qty
    end
    @total_itens.round(2)
  end

  def total
    @total = total_itens + fee
    @total.round(2)
  end

end
