class SessionsController < ApplicationController
  def create
    user = User.from_omniauth(env["omniauth.auth"])
    session[:user] = User.find( user.id )
    redirect_to '/'
  end

  def fake
    user = User.where( uid: CONFIG[:user_uid_fake], provider: CONFIG[:user_provider_fake] ).first
    session[:user] = user unless user.nil?
    redirect_to '/'
  end  

  def destroy
    session[:user] = nil
    redirect_to '/'
  end

end