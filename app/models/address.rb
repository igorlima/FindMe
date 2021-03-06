class Address
  include Mongoid::Document
  field :street, type: String
  field :number, type: String
  field :district, type: String
  field :city, type: String

  has_one :order

  def as_json(options={})
    {
      street:    street,
      number:    number,
      district:  district,
      city:      city
    }
  end

end
