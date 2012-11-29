class CardapiosController < ApplicationController
  # GET /cardapios
  # GET /cardapios.json
  def index
    @cardapios = Cardapio.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @cardapios }
    end
  end

  # GET /cardapios/1
  # GET /cardapios/1.json
  def show
    @cardapio = Cardapio.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @cardapio }
    end
  end

  # GET /cardapios/new
  # GET /cardapios/new.json
  def new
    @cardapio = Cardapio.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @cardapio }
    end
  end

  # GET /cardapios/1/edit
  def edit
    @cardapio = Cardapio.find(params[:id])
  end

  # POST /cardapios
  # POST /cardapios.json
  def create
    @cardapio = Cardapio.new(params[:cardapio])

    respond_to do |format|
      if @cardapio.save
        format.html { redirect_to @cardapio, notice: 'Cardapio was successfully created.' }
        format.json { render json: @cardapio, status: :created, location: @cardapio }
      else
        format.html { render action: "new" }
        format.json { render json: @cardapio.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /cardapios/1
  # PUT /cardapios/1.json
  def update
    @cardapio = Cardapio.find(params[:id])

    respond_to do |format|
      if @cardapio.update_attributes(params[:cardapio])
        format.html { redirect_to @cardapio, notice: 'Cardapio was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @cardapio.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /cardapios/1
  # DELETE /cardapios/1.json
  def destroy
    @cardapio = Cardapio.find(params[:id])
    @cardapio.destroy

    respond_to do |format|
      format.html { redirect_to cardapios_url }
      format.json { head :no_content }
    end
  end
end
