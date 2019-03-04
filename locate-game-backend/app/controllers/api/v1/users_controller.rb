class Api::V1::UsersController < ApplicationController

    def index
        @users = User.all
        render json: @users
      end
    
      def create
        @user = User.new(name: params[:name], username: params[:username])
        if @user.save
          render json: @user
        else
          render json: { error: "Unable to create User." }, status: 400
        end
      end

end
