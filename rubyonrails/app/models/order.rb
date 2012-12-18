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
    @fee
  end

  def total_itens
    @total = 0.0
    self.itens.each do |item|
      @total += CardapioItem.find( item.cardapio_item_id ).price * item.qty
    end
    @total
  end

  def total
    total_itens + fee
  end

end
