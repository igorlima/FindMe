class SessionsController < ApplicationController
  def create
    user = User.from_omniauth(env["omniauth.auth"])
    session[:user] = { 
      provider: user.provider, 
      uid: user.uid, 
      name: user.name, 
      firstName: user.first_name,
      image: user.image 
    }
    redirect_to '/'
  end

  def destroy
    session[:user] = nil
    redirect_to '/'
  end

  def user
    respond_to do |format|
      format.html { render json: session[:user] }
      format.json { render json: session[:user] }
    end
  end

end