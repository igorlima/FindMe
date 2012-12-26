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

  def user
    user = user_session_values( session[:user] )
    user = user.merge( :authenticity_token => form_authenticity_token )
    respond_to do |format|
      format.html { render json: user }
      format.json { render json: user }
    end
  end

  def last_address
    has_user_in_session = !session[:user].nil?
    last_address = has_user_in_session ? session[:user].last_address : {}
    respond_to do |format|
      format.html { render json: last_address }
      format.json { render json: last_address }
    end
  end

private

  def user_session_values(user)
    return {} if user.nil?
    user.as_json
  end

end