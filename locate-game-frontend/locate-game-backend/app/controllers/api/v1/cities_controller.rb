class Api::V1::CitiesController < ApplicationController

    def index
        @cities = City.all
        render json: @cities
      end
    
      def create
        @city = City.new(name: params[:name], region_id: params[:region_id], long: params[:long], lat: params[:lat])
        if @city.save
          render json: @city
        else
          render json: { error: "Unable to create City." }, status: 400
        end
      end

end
