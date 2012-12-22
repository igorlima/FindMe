module ApplicationHelper

  def self.broadcast(channel, data)
    message = {:channel => channel, :data => data}
    uri = URI.parse( CONFIG[:broadcast_url] )
    Net::HTTP.post_form(uri, :message => message.to_json)
  end

end
