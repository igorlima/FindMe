Rails.application.config.middleware.use OmniAuth::Builder do
  provider :facebook, '177982242345352', '5834c8b83cca1e33cd3d0a6e4cb4e2e9',
           :scope => 'email,user_likes,publish_stream', :display => 'touch'
end