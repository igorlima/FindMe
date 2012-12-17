class StoreConfigurationsController < ApplicationController

  def configuration
    @store_configuration = StoreConfiguration.desc('updated_at').first
    respond_to do |format|
      format.html { render json: @store_configuration }
      format.json { render json: @store_configuration }
    end
  end

  # GET /store_configurations
  # GET /store_configurations.json
  def index
    @store_configurations = StoreConfiguration.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @store_configurations }
    end
  end

  # GET /store_configurations/1
  # GET /store_configurations/1.json
  def show
    @store_configuration = StoreConfiguration.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @store_configuration }
    end
  end

  # GET /store_configurations/new
  # GET /store_configurations/new.json
  def new
    @store_configuration = StoreConfiguration.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @store_configuration }
    end
  end

  # GET /store_configurations/1/edit
  def edit
    @store_configuration = StoreConfiguration.find(params[:id])
  end

  # POST /store_configurations
  # POST /store_configurations.json
  def create
    @store_configuration = StoreConfiguration.new(params[:store_configuration])

    respond_to do |format|
      if @store_configuration.save
        format.html { redirect_to @store_configuration, notice: 'Store configuration was successfully created.' }
        format.json { render json: @store_configuration, status: :created, location: @store_configuration }
      else
        format.html { render action: "new" }
        format.json { render json: @store_configuration.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /store_configurations/1
  # PUT /store_configurations/1.json
  def update
    @store_configuration = StoreConfiguration.find(params[:id])

    respond_to do |format|
      if @store_configuration.update_attributes(params[:store_configuration])
        format.html { redirect_to @store_configuration, notice: 'Store configuration was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @store_configuration.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /store_configurations/1
  # DELETE /store_configurations/1.json
  def destroy
    @store_configuration = StoreConfiguration.find(params[:id])
    @store_configuration.destroy

    respond_to do |format|
      format.html { redirect_to store_configurations_url }
      format.json { head :no_content }
    end
  end
end
