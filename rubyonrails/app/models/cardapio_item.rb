class CardapioItem
  include Mongoid::Document
  field :description, type: String
  field :ingredients, type: String
  field :price, type: BigDecimal
  field :order, type: Integer

  embedded_in :cardapio_itens
end
