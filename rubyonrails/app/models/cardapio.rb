class Cardapio
  include Mongoid::Document
  field :url, type: String
  field :description, type: String
  field :json, type:String
end