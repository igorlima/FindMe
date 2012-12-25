class MessagesController < ApplicationController

  # GET /messages
  # GET /messages.json
  def index
    @messages = Message.all.limit(25).asc( 'read' ).desc('updated_at')

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @messages }
    end
  end

  # GET /messages/1
  # GET /messages/1.json
  def show
    @message = Message.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @message }
    end
  end

  # GET /messages/new
  # GET /messages/new.json
  def new
    @message = Message.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @message }
    end
  end

  # GET /messages/1/edit
  def edit
    @message = Message.find(params[:id])
  end

  # POST /messages
  # POST /messages.json
  def create
    @message = Message.new(params[:message])
    @message.user = User.find( session[:user].id ) unless session[:user].nil?

    respond_to do |format|
      if @message.save
        ApplicationHelper.broadcast "/messages/new", @message

        format.html { redirect_to @message, notice: 'Message was successfully created.' }
        format.json { render json: @message, status: :created, location: @message }
      else
        format.html { render action: "new" }
        format.json { render json: {:errors => @message.errors} }
      end
    end
  end

  # PUT /messages/1
  # PUT /messages/1.json
  def update
    @message = Message.find(params[:id])

    respond_to do |format|
      if @message.update_attributes(params[:message])
        format.html { redirect_to @message, notice: 'Message was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @message.errors, status: :unprocessable_entity }
      end
    end
  end

  def read
    @message = Message.find(params[:id])
    @message.read = 1;

    respond_to do |format|
      if @message.update_attributes(params[:message])
        format.html { render json: { success: true } }
        format.json { render json: { success: true } }
      else
        format.html { render json: { success: false } }
        format.json { render json: { success: false } }
      end
    end
  end

  def notread
    @message = Message.find(params[:id])
    @message.read = 0;

    respond_to do |format|
      if @message.update_attributes(params[:message])
        format.html { render json: { success: true } }
        format.json { render json: { success: true } }
      else
        format.html { render json: { success: false } }
        format.json { render json: { success: false } }
      end
    end
  end

  # DELETE /messages/1
  # DELETE /messages/1.json
  def destroy
    @message = Message.find(params[:id])
    @message.destroy

    respond_to do |format|
      format.html { redirect_to messages_url }
      format.json { head :no_content }
    end
  end

end
