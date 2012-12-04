class Cardapio
  include Mongoid::Document
  field :url, type: String
  field :description, type: String
  field :welcome, type: String
  field :json, type:String
  field :order, type:Integer

  embeds_many :itens, :as => :cardapio_itens, :class_name => "CardapioItem"
end
