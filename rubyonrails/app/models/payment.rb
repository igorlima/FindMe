class Payment
  include Mongoid::Document
  include Mongoid::Timestamps
  field :params, type: String
  field :status, type: String
  field :transaction_id, type: String
  field :payer_id, type: String

  has_one :order
  has_many :notifications, :class_name => "Notification"

  def is?(status)
    @notification = last_notification
    return @notification.status == status unless @notification.nil?
    return self.status == status
  end

  def completed?
    is? "Completed"
  end

  def refunded?
    is? "Refunded"
  end

  def as_json(options={})
    @notification = last_notification
    {
      "_id"            => _id,
      "transaction_id" => transaction_id,
      "payer_id"       => payer_id,
      "status"         => @notification.nil? ? status : @notification.status
    }
  end

  private

  def last_notification
    notifications.desc('updated_at').first
  end

end
