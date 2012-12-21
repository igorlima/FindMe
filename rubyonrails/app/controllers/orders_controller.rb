class OrdersController < ApplicationController

  def create

    @order = new_order
    response = checkout(@order)
    @order.token = response.token if response.valid?
    
    respond_to do |format|
      if response.valid? && @order.save
        format.html { render json: {:checkout_paypal_url => response.checkout_url} } if response.valid?
        format.json { render json: {:checkout_paypal_url => response.checkout_url} } if response.valid?
        format.html { render json: {} } unless response.valid?
        format.json { render json: {} } unless response.valid?
      else
        format.html { render json: @order.errors, status: :unprocessable_entity }
        format.json { render json: @order.errors, status: :unprocessable_entity }
      end
    end

  end

  def success

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
    ppr = PayPal::Recurring.new( paypal_values(@order) )
    response = ppr.checkout
  end

  def paypal_values(order)
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

end
