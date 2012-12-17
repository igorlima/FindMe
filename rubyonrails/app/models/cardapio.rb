class Cardapio
  include Mongoid::Document
  field :url, type: String
  field :description, type: String
  field :welcome, type: String
  field :json, type:String
  field :order, type:Integer

  has_many :itens, :class_name => "CardapioItem"

end
