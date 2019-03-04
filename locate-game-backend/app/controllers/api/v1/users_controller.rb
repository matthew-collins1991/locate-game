class Api::V1::UsersController < ApplicationController

    def index
        @users = User.all
        render json: @users
      end
    
      def create
        @user = User.new(score: params[:score], user_id: params[:user_id])
        if @user.save
          render json: @user
        else
          render json: { error: "Unable to create User." }, status: 400
        end
      end

end
