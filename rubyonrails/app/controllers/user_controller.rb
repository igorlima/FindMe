class UserController < ApplicationController

  def data
    user = user_session_values( session[:user] )
    user = user.merge( :authenticity_token => form_authenticity_token )
    respond_to do |format|
      format.html { render json: user }
      format.json { render json: user }
    end
  end

  def last_address
    has_user_in_session = !session[:user].nil?
    last_address = nil
    last_address = session[:user].last_address if has_user_in_session
    last_address = {} if last_address.nil?

    respond_to do |format|
      format.html { render json: last_address }
      format.json { render json: last_address }
    end
  end

  def last_orders
    has_user_in_session = !session[:user].nil?
    last_orders = nil
    last_orders = session[:user].last_orders if has_user_in_session

    respond_to do |format|
      format.html { render json: last_orders }
      format.json { render json: last_orders }
    end
  end

  def last_messages
    has_user_in_session = !session[:user].nil?
    last_messages = nil
    last_messages = session[:user].last_messages if has_user_in_session

    respond_to do |format|
      format.html { render json: last_messages }
      format.json { render json: last_messages }
    end
  end

private

  def user_session_values(user)
    return {} if user.nil?
    user.as_json
  end

end
