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
        format.html { render json: params }
        format.json { render json: params }
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
