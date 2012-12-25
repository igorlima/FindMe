class SessionsController < ApplicationController
  def create
    user = User.from_omniauth(env["omniauth.auth"])
    session[:user] = user_session_values( user )
    redirect_to '/'
  end

  def fake
    user = User.where( uid: CONFIG[:user_uid_fake], provider: CONFIG[:user_provider_fake] ).first
    session[:user] = user_session_values( user ) unless user.nil?
    redirect_to '/'
  end  

  def destroy
    session[:user] = nil
    redirect_to '/'
  end

  def user
    user = session[:user] ||= {}
    user = user.merge( :authenticity_token => form_authenticity_token )
    respond_to do |format|
      format.html { render json: user }
      format.json { render json: user }
    end
  end

private

  def user_session_values(user)
    { 
      provider: user.provider, 
      uid: user.uid, 
      name: user.name, 
      firstName: user.first_name,
      image: user.image 
    }
  end

end