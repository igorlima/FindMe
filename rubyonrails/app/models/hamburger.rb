class Hamburger
  include Mongoid::Document
  field :description, type: String
  field :ingredients, type: String
  field :price, type: BigDecimal
end
