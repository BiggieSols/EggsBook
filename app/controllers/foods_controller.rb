class FoodsController < ApplicationController
  def index
    @foods = Food.all
    render json: @foods
  end

  def new
    @food = Food.new
  end

  def create
    @food = Food.new(params[:food])
    if @food.save
      redirect_to foods_url
    else
      render @food.errors
    end
  end

  def edit
    @food = Food.find(params[:id])
  end

  def update
    @food = Food.find(params[:id])
    if @food.update_attributes(params[:food])
      redirect_to foods_url
    else
      render @food.errors
    end
  end

  def destroy
  end
end
