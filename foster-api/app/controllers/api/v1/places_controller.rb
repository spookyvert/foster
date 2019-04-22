class Api::V1::PlacesController < ApplicationController
  before_action :find_place, only: [:show]

  skip_before_action :authorized, only: [:create, :index]

  def index
    @places = Place.all
    render json: @places
  end

  def show
    render json: @place
  end

  def create
    @place = Idea.create(idea_params)
    if @place.valid?
      render json: @place, status: :created
    else
      render json: { errors: @place.errors.full_messages }, status: :unprocessible_entity
    end
  end

  private

  def place_params
    params.permit(:address, :zipcode,:user_id)
  end

  def find_place
    @place = Place.find(params[:id])
  end
end
