# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)





User.create(name: 'Matt', username: 'Trigger')
User.create(name: 'Shane', username: 'Shano')
User.create(name: 'Saphie', username: 'The Saph Master')
User.create(name: 'Song', username: 'The Danger Song')



Game.create(user_id: 1, score: 512)
Game.create(user_id: 2, score: 354)
Game.create(user_id: 3, score: 287)
Game.create(user_id: 4, score: 241)




Region.create(region: "NW")
Region.create(region: "SW")
Region.create(region: "NE")
Region.create(region: "SE")
Region.create(region: "MID")

# NW region
City.create(name: "Leeds", region_id: 1, long:53.8008, lat: -1.5491)
City.create(name: "Liverpool", region_id: 1, long:53.4084, lat: -2.9916)
City.create(name: "Glasgow", region_id: 1, long:55.8642, lat: -4.2518)
City.create(name: "Dublin", region_id: 1, long:53.3498, lat: -6.2603)
City.create(name: "Manchester", region_id: 1, long:53.4808, lat: -2.2426)

# SW Region
City.create(name: "Plymouth", region_id: 2, long:50.3755, lat: -4.1427)
City.create(name: "Bristol", region_id: 2, long:51.4545, lat: -2.5879)
City.create(name: "Cardiff", region_id: 2, long:51.4816, lat: -3.1791)
City.create(name: "Bournemouth", region_id: 2, long:50.7192, lat: -1.8808)
City.create(name: "Southampton", region_id: 2, long:50.9097, lat: -1.4044)

# NE Region
City.create(name: "Hull", region_id: 3, long:53.7457, lat: -0.3367)
City.create(name: "Newcastle", region_id: 3, long:54.9783, lat: -1.6178)
City.create(name: "Edinburgh", region_id: 3, long:55.9533, lat: -3.1883)
City.create(name: "York", region_id: 3, long:53.9600, lat: -1.0873)
City.create(name: "Middlesbrough", region_id: 3, long:54.5742, lat: -1.2350)

# SE Region
City.create(name: "Norwich", region_id: 4, long:52.6309, lat: 1.2974)
City.create(name: "Cambridge", region_id: 4, long:52.2053, lat: 0.1218)
City.create(name: "Brighton", region_id: 4, long:50.8225, lat: -0.1372)
City.create(name: "Dover", region_id: 4, long:51.1279, lat: 1.3134)
City.create(name: "Reading", region_id: 4, long:51.4543, lat: -0.9781)

# Midlands Region
City.create(name: "Nottingham", region_id: 5, long:52.9548, lat: -1.1581)
City.create(name: "Birmingham", region_id: 5, long:52.4862, lat: -1.8904)
City.create(name: "Oxford", region_id: 5, long:51.7520, lat: -1.2577)
City.create(name: "Peterborough", region_id: 5, long:52.5695, lat: -0.2405)
City.create(name: "Worcester", region_id: 5, long:52.1936, lat: -2.2216)
