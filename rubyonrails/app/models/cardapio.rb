class Cardapio
  include Mongoid::Document
  field :url, type: String
  field :description, type: String
  field :welcome, type: String
  field :json, type:String
  field :order, type:Integer

  has_many :itens, :class_name => "CardapioItem"

  def as_json(options={})
    {
      "_id"         => self._id,
      "url"         => self.url,
      "description" => self.description,
      "welcome"     => self.welcome,
      "json"        => self.json,
      "order"       => self.order
    }
  end

end

