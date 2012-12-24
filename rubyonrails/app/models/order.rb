class Order
  include Mongoid::Document
  include Mongoid::Timestamps
  field :token, type: String
  field :description, type: String
  field :observation, type: String
  field :status,      type: String
  field :has_shipping, type: Boolean

  belongs_to :address, autosave: true
  belongs_to :payment, autosave: true
  belongs_to :user, polymorphic: true
  embeds_many :itens, :as => :order_itens, :class_name => "OrderItem"

  def as_json(options={})
    {
      "_id"            => _id,
      "address"        => address,
      "created_at"     => created_at,
      "description"    => description,
      "has_shipping"   => has_shipping,
      "itens"          => _itens,
      "observation"    => observation,
      "status"         => status,
      "total"          => total,
      "user"           => user,
      "updated_at"     => updated_at
    }
  end

  def _itens
    itens = []
    self.itens.each do |item|
      itens.push(
        :qty => item.qty,
        :description => CardapioItem.find( item.cardapio_item_id ).description
      )
    end
    itens
  end

  def fee
    @fee = 0.0
    @configuration = StoreConfiguration.first_one
    @fee += @configuration.online_fee
    @fee += @configuration.delivery_fee if has_shipping
    @fee.round(2)
  end

  def total_itens
    @total_itens = 0.0
    itens.each do |item|
      @total_itens += CardapioItem.find( item.cardapio_item_id ).price * item.qty
    end
    @total_itens.round(2)
  end

  def total
    @total = total_itens + fee
    @total.round(2)
  end

  @@STATUS = {
    :pending   => "PENDING",
    :paid      => "PAID",
    :doing     => "DOING",
    :done      => "DONE",
    :delivered => "DELIVERED",
    :refunded  => "REFUNDED"
  }

  def self.STATUS
    @@STATUS
  end

  def set_as(type)
    self.status = @@STATUS[type]
    self
  end

  def is?(type)
    status == @@STATUS[type]
  end

end
