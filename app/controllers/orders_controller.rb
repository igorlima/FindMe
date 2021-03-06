class OrdersController < ApplicationController
  protect_from_forgery :except => [:ipn]

  def list
    respond_to do |format|
      format.html { render json: Order.list }
      format.json { render json: Order.list }
    end
  end

  def doing
    @order = Order.find(params[:id])
    @order.set_as :doing;

    respond_to do |format|
      if @order.save
        format.html { render json: { success: true } }
        format.json { render json: { success: true } }
      else
        format.html { render json: { success: false } }
        format.json { render json: { success: false } }
      end
    end
  end

  def done
    @order = Order.find(params[:id])
    @order.set_as :done;

    respond_to do |format|
      if @order.save
        format.html { render json: { success: true } }
        format.json { render json: { success: true } }
      else
        format.html { render json: { success: false } }
        format.json { render json: { success: false } }
      end
    end
  end

  def delivered
    @order = Order.find(params[:id])
    @order.set_as :delivered;

    respond_to do |format|
      if @order.save
        format.html { render json: { success: true } }
        format.json { render json: { success: true } }
      else
        format.html { render json: { success: false } }
        format.json { render json: { success: false } }
      end
    end
  end

  def create

    @order = new_order
    response = checkout(@order)
    @order.token = response.token if response.valid?
    
    respond_to do |format|
      if response.valid? && @order.save
        format.html { render json: {:checkout_paypal_url => response.checkout_url} }
        format.json { render json: {:checkout_paypal_url => response.checkout_url} }
      else
        format.html { render json: {:errors => @order.errors} }
        format.json { render json: {:errors => @order.errors} }
      end
    end

  end

  def success

    @order = request_payment(params)
    return cancel if @order.nil?

    @order.save
    (@order.payment.set_order_status).broadcast
    redirect_to "/#thanks"

  end

  def cancel
    redirect_to "/"
  end

  def ipn

    return cancel unless (PayPal::Recurring::Notification.new params).verified?

    @payment = Payment.where( :transaction_id => params[:parent_txn_id] ).first
    return cancel if @payment.nil?
    return cancel if @payment.transaction_id.nil?

    @notification = Notification.new(
      :transaction_id => params[:txn_id],
      :params => params.to_s,
      :status => params[:payment_status]
    )
    @payment.notifications.push(@notification)
    @notification.save
    (@payment.set_order_status).broadcast
    render :nothing => true

  end

private

  def new_order

    @order = Order.new
    @order.user = User.find( session[:user].id ) unless session[:user].nil?
    @order.observation = params[:observation]
    @order.has_shipping = true
    @order.address = Address.new(params[:address])
    params[:itens].each do |item|
      @order.itens.push( OrderItem.new( :cardapio_item_id => item[:id], :qty => item[:qty] ) )
    end
    @order.set_as :pending
  end

  def checkout(order)
    ppr = PayPal::Recurring.new( paypal_checkout_values(order) )
    response = ppr.checkout
  end

  def paypal_checkout_values(order)
    values = {
      :return_url   => CONFIG[:return_url],
      :cancel_url   => CONFIG[:cancel_url],
      :ipn_url      => CONFIG[:ipn_url],
      :currency     => "BRL",
      :locale       => "BR",
      :description  => "Pedido do Lanches Online - Obrigado pela preferencia",
      :amount       => order.total
    }
  end

  def request_payment(params) 

    @order = Order.where( :token => params[:token] ).first
    return @order if @order.nil?
    return nil    if @order.token.nil?
    return @order unless @order.payment.nil?

    ppr = PayPal::Recurring.new( paypal_request_payment_values(@order) )
    response = ppr.request_payment
    @order.payment = Payment.new( 
      :params => params.to_s, 
      :status => response.status,
      :transaction_id => response.transaction_id,
      :payer_id => params[:PayerID]
    )
    @order
  end

  def paypal_request_payment_values(order)
    values = {
      :token => order.token,
      :payer_id => params[:PayerID],
      :amount => order.total,
      :currency => "BRL"
    }
  end

end
