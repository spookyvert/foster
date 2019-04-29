class Api::V1::UserPlacesController < ApplicationController

  skip_before_action :authorized, only: [:index, :create, :destroy]

  def index
    @user_places = UserPlace.all
    render json: @user_places
  end

  def create
    @user_place = UserPlace.create(user_place_params)
    if @user_place.valid?
      render json: @user_place, status: :created
    else
      render json: { errors: @user_place.errors.full_messages }, status: :unprocessible_entity
    end
  end

  def destroy
    @user_place = UserPlace.find(params[:id])
    @user_place.destroy
  end

  private

  def user_place_params
    params.permit(:user_id, :place_id, :sugg)
  end
end
