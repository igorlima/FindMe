class OrderItem
  include Mongoid::Document
  field :cardapio_item_id, type: String
  field :qty, type: Integer

  embedded_in :order_itens
end
