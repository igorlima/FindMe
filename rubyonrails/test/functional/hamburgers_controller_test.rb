require 'test_helper'

class HamburgersControllerTest < ActionController::TestCase
  setup do
    @hamburger = hamburgers(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:hamburgers)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create hamburger" do
    assert_difference('Hamburger.count') do
      post :create, hamburger: { description: @hamburger.description, ingredients: @hamburger.ingredients, price: @hamburger.price }
    end

    assert_redirected_to hamburger_path(assigns(:hamburger))
  end

  test "should show hamburger" do
    get :show, id: @hamburger
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @hamburger
    assert_response :success
  end

  test "should update hamburger" do
    put :update, id: @hamburger, hamburger: { description: @hamburger.description, ingredients: @hamburger.ingredients, price: @hamburger.price }
    assert_redirected_to hamburger_path(assigns(:hamburger))
  end

  test "should destroy hamburger" do
    assert_difference('Hamburger.count', -1) do
      delete :destroy, id: @hamburger
    end

    assert_redirected_to hamburgers_path
  end
end
