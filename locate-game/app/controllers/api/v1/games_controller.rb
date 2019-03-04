class Api::V1::GamesController < ApplicationController

    def index
        @games = Game.all
        render json: @games
      end
    
      def create
        @game = Game.new(score: params[:score], user_id: params[:user_id])
        if @game.save
          render json: @game
        else
          render json: { error: "Unable to create Game." }, status: 400
        end
      end


end
