class CardapioItem
  include Mongoid::Document
  field :description, type: String
  field :ingredients, type: String
  field :price, type: BigDecimal
  field :order, type: Integer

  belongs_to :cardapio, polymorphic: true
  
end
