module PayPal
  module Recurring
    # Return PayPal's API version.
    #
    def self.api_version
      "95.0"
    end
  end
end

PayPal::Recurring.configure do |config|
  config.sandbox   = true
  config.username  = "lima.i_1355153760_biz_api1.gmail.com"
  config.password  = "1355153784"
  config.signature = "A7vF1b4x9ByrDedPEUykRMGFDdB1AKHjDVCrwsHtDBtlXUohsPQPhOCp"
end
