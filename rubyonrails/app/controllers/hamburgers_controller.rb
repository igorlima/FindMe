class HamburgersController < ApplicationController
  # GET /hamburgers
  # GET /hamburgers.json
  def index
    @hamburgers = Hamburger.all.asc('order')

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @hamburgers }
    end
  end

  # GET /hamburgers/1
  # GET /hamburgers/1.json
  def show
    @hamburger = Hamburger.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @hamburger }
    end
  end

  # GET /hamburgers/new
  # GET /hamburgers/new.json
  def new
    @hamburger = Hamburger.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @hamburger }
    end
  end

  # GET /hamburgers/1/edit
  def edit
    @hamburger = Hamburger.find(params[:id])
  end

  # POST /hamburgers
  # POST /hamburgers.json
  def create
    @hamburger = Hamburger.new(params[:hamburger])

    respond_to do |format|
      if @hamburger.save
        format.html { redirect_to @hamburger, notice: 'Hamburger was successfully created.' }
        format.json { render json: @hamburger, status: :created, location: @hamburger }
      else
        format.html { render action: "new" }
        format.json { render json: @hamburger.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /hamburgers/1
  # PUT /hamburgers/1.json
  def update
    @hamburger = Hamburger.find(params[:id])

    respond_to do |format|
      if @hamburger.update_attributes(params[:hamburger])
        format.html { redirect_to @hamburger, notice: 'Hamburger was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @hamburger.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /hamburgers/1
  # DELETE /hamburgers/1.json
  def destroy
    @hamburger = Hamburger.find(params[:id])
    @hamburger.destroy

    respond_to do |format|
      format.html { redirect_to hamburgers_url }
      format.json { head :no_content }
    end
  end
end
