

class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :username
  has_many :games

  class GameSerializer < ActiveModel::Serializer
    attributes :id, :user_id, :score
  end
end