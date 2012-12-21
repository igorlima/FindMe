class OrdersController < ApplicationController

  def create

    @order = Order.new
    @order.observation = params[:observation]
    @order.has_shipping = true
    @order.address = Address.new(params[:address])
    params[:itens].each do |item|
      @order.itens.push( OrderItem.new( :cardapio_item_id => item[:id], :qty => item[:qty] ) )
    end
    
    respond_to do |format|
      if @order.save
        ppr = PayPal::Recurring.new({
          :return_url   => CONFIG[:return_url],
          :cancel_url   => CONFIG[:cancel_url],
          :ipn_url      => CONFIG[:ipn_url],
          :currency     => "BRL",
          :locale       => "BR",
          :description  => "Awesome - Monthly Subscription",
          :amount       => "9.00"
        })
        response = ppr.checkout

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

  end

end
