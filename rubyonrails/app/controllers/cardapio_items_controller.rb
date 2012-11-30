class CardapioItemsController < ApplicationController
  # GET /cardapio_items
  # GET /cardapio_items.json
  def index
    
    @cardapio_items = cardapio.itens

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @cardapio_items }
    end
  end

  # GET /cardapio_items/1
  # GET /cardapio_items/1.json
  def show
    @cardapio_item = CardapioItem.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @cardapio_item }
    end
  end

  # GET /cardapio_items/new
  # GET /cardapio_items/new.json
  def new
    @cardapio_item = CardapioItem.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @cardapio_item }
    end
  end

  # GET /cardapio_items/1/edit
  def edit
    @cardapio_item = CardapioItem.find(params[:id])
  end

  # POST /cardapio_items
  # POST /cardapio_items.json
  def create
    @cardapio_item = CardapioItem.new(params[:cardapio_item])

    respond_to do |format|
      if @cardapio_item.save
        format.html { redirect_to @cardapio_item, notice: 'Cardapio item was successfully created.' }
        format.json { render json: @cardapio_item, status: :created, location: @cardapio_item }
      else
        format.html { render action: "new" }
        format.json { render json: @cardapio_item.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /cardapio_items/1
  # PUT /cardapio_items/1.json
  def update
    @cardapio_item = CardapioItem.find(params[:id])

    respond_to do |format|
      if @cardapio_item.update_attributes(params[:cardapio_item])
        format.html { redirect_to @cardapio_item, notice: 'Cardapio item was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @cardapio_item.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /cardapio_items/1
  # DELETE /cardapio_items/1.json
  def destroy
    @cardapio_item = CardapioItem.find(params[:id])
    @cardapio_item.destroy

    respond_to do |format|
      format.html { redirect_to cardapio_items_url }
      format.json { head :no_content }
    end
  end

  def cardapio
    id_cardapio = request.query_parameters[:id]
    Cardapio.where( _id: id_cardapio ).first
  end

  
end
