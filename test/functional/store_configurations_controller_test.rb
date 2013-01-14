require 'test_helper'

class StoreConfigurationsControllerTest < ActionController::TestCase
  setup do
    @store_configuration = store_configurations(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:store_configurations)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create store_configuration" do
    assert_difference('StoreConfiguration.count') do
      post :create, store_configuration: { delivery_fee: @store_configuration.delivery_fee, is_open: @store_configuration.is_open, online_fee: @store_configuration.online_fee, qty_limit_lunch: @store_configuration.qty_limit_lunch }
    end

    assert_redirected_to store_configuration_path(assigns(:store_configuration))
  end

  test "should show store_configuration" do
    get :show, id: @store_configuration
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @store_configuration
    assert_response :success
  end

  test "should update store_configuration" do
    put :update, id: @store_configuration, store_configuration: { delivery_fee: @store_configuration.delivery_fee, is_open: @store_configuration.is_open, online_fee: @store_configuration.online_fee, qty_limit_lunch: @store_configuration.qty_limit_lunch }
    assert_redirected_to store_configuration_path(assigns(:store_configuration))
  end

  test "should destroy store_configuration" do
    assert_difference('StoreConfiguration.count', -1) do
      delete :destroy, id: @store_configuration
    end

    assert_redirected_to store_configurations_path
  end
end
