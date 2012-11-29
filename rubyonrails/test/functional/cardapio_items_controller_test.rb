require 'test_helper'

class CardapioItemsControllerTest < ActionController::TestCase
  setup do
    @cardapio_item = cardapio_items(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:cardapio_items)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create cardapio_item" do
    assert_difference('CardapioItem.count') do
      post :create, cardapio_item: { description: @cardapio_item.description, ingredients: @cardapio_item.ingredients, order: @cardapio_item.order, price: @cardapio_item.price }
    end

    assert_redirected_to cardapio_item_path(assigns(:cardapio_item))
  end

  test "should show cardapio_item" do
    get :show, id: @cardapio_item
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @cardapio_item
    assert_response :success
  end

  test "should update cardapio_item" do
    put :update, id: @cardapio_item, cardapio_item: { description: @cardapio_item.description, ingredients: @cardapio_item.ingredients, order: @cardapio_item.order, price: @cardapio_item.price }
    assert_redirected_to cardapio_item_path(assigns(:cardapio_item))
  end

  test "should destroy cardapio_item" do
    assert_difference('CardapioItem.count', -1) do
      delete :destroy, id: @cardapio_item
    end

    assert_redirected_to cardapio_items_path
  end
end
