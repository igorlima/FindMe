class StoreConfiguration
  include Mongoid::Document
  include Mongoid::Paranoia
  include Mongoid::Timestamps
  
  field :qty_limit_lunch, type: Integer
  field :is_open, type: Boolean
  field :delivery_fee, type: BigDecimal
  field :online_fee, type: BigDecimal
end
