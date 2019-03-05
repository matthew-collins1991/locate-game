# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


Game.destroy_all
User.destroy_all



User.create(name: 'Matt', username: 'Trigger')
User.create(name: 'Shane', username: 'Shano')
User.create(name: 'Saphie', username: 'The Saph Master')
User.create(name: 'Song', username: 'The Danger Song')
User.create(name: 'Yannick', username: 'The Kenyan Chief')


Game.create(user_id: 1, score: 50)
Game.create(user_id: 2, score: 102)
Game.create(user_id: 3, score: 84)
Game.create(user_id: 4, score: 24)
Game.create(user_id: 5, score: 72)
Game.create(user_id: 5, score: 312)
Game.create(user_id: 4, score: 45)
Game.create(user_id: 3, score: 69)
Game.create(user_id: 2, score: 88)
Game.create(user_id: 1, score: 12)
Game.create(user_id: 1, score: 48)
Game.create(user_id: 2, score: 94)
Game.create(user_id: 3, score: 256)
Game.create(user_id: 4, score: 345)
Game.create(user_id: 5, score: 327)
Game.create(user_id: 5, score: 148)
