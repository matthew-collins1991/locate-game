class Api::V1::RegionsController < ApplicationController

    def index
        @regions = Region.all
        render json: @regions
      end
    
      def create
        @region = Region.new(region: params[:region])
        if @region.save
          render json: @region
        else
          render json: { error: "Unable to create Region." }, status: 400
        end
      end

end
