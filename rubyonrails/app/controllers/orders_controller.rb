class OrdersController < ApplicationController

  def create

    @order = new_order
    response = checkout(@order)
    @order.token = response.token if response.valid?
    
    respond_to do |format|
      if response.valid? && @order.save
        format.html { render json: {:checkout_paypal_url => response.checkout_url} }
        format.json { render json: {:checkout_paypal_url => response.checkout_url} }
      else
        format.html { render json: @order.errors, status: :unprocessable_entity }
        format.json { render json: @order.errors, status: :unprocessable_entity }
      end
    end

  end

  def success
    @order = Order.where( :token => params[:token] ).first
    response = request_payment(@order)
    @order.payment = Payment.new( 
      :params => params.to_s, 
      :status => response.status,
      :transaction_id => response.transaction_id,
      :payer_id => params[:PayerID]
    )

    respond_to do |format|
      if response.approved? and response.completed? and @order.save
        redirect_to "/#thanks"
      else
        cancel
      end
    end

  end

  def cancel
    redirect_to "/"
  end

private

  def new_order
    @order = Order.new
    @order.observation = params[:observation]
    @order.has_shipping = true
    @order.address = Address.new(params[:address])
    params[:itens].each do |item|
      @order.itens.push( OrderItem.new( :cardapio_item_id => item[:id], :qty => item[:qty] ) )
    end
    @order
  end

  def checkout(order)
    ppr = PayPal::Recurring.new( paypal_checkout_values(@order) )
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

  def request_payment(order)
    ppr = PayPal::Recurring.new( paypal_request_payment_values(order) )
    response = ppr.request_payment
  end

  def paypal_request_payment_values(order)
    values = {
      :token => order.token,
      :payer_id => order.payment.payer_id,
      :amount => order.total,
      :currency => "BRL"
    }
  end

end
