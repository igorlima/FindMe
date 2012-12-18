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

  def total
    @total = 0.0;
    self.itens.each do |item|
      @total += CardapioItem.find( item.cardapio_item_id ).price * item.qty
    end

    @configuration = StoreConfiguration.first_one
    @total += @configuration.online_fee
    @total += @configuration.delivery_fee if self.has_shipping
    @total
  end

end
