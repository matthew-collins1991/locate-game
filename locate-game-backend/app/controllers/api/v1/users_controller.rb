class Api::V1::UsersController < ApplicationController

    def index
        @users = User.all
        render json: @users
      end

      def create
        @user = User.new(name: params[:name], username: params[:username])
        if @user.valid?
          @user.save
          render json: @user
        else
          render json: { error: "Unable to create User." }, status: 400
        end

      end


      def show
         @user = User.find_by(username: params[:username])

          if @user
            render json: @user
          else
            render json: {error: "User not found"}, status: 404
        end
      end

      def signin
        @user = User.find_or_create_by(username: params[:username])
        render json: @user
      end
end
