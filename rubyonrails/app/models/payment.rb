class Payment
  include Mongoid::Document
  include Mongoid::Timestamps
  field :params, type: String
  field :status, type: String
  field :transaction_id, type: String
  field :payer_id, type: String

  has_one :order
  has_many :notifications, :class_name => "Notification"

  def completed?
    @notification = last_notification
    return @notification.status == "Completed" unless @notification.nil?
    return status == "Completed"
  end

  private

  def last_notification
    notifications.desc('updated_at').first
  end

end
