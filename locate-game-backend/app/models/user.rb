class User < ApplicationRecord
    has_many :games
    validates :name, presence: true
    validates :username, presence: true
    validates :username, uniqueness: true
end
