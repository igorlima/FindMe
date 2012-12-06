class SessionsController < ApplicationController
  def create
    user = User.from_omniauth(env["omniauth.auth"])
    session[:user] = { name: user.name, provider: user.provider, uid: user.uid }
    redirect_to '/'
  end

  def destroy
    session[:user] = nil
    redirect_to '/'
  end

  def user
    respond_to do |format|
      format.json { render json: session[:user] }
    end
  end

end