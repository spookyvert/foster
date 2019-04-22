# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
UserPlace.destroy_all
User.destroy_all
Place.destroy_all


shemar = User.create(name: "Shemar Dacosta", zipcode: 10473, password: "test")

jamar = User.create(name: "Jamar Dacosta", zipcode: 10473, password: "test")

cris = User.create(name: "Cristobal Rivera", zipcode: 10458, password: "test")

ada = User.create(name: "Ada Muniz", zipcode: 10468, password: "test")

# base = Place.create(address: "2474 Crotona Avea", zipcode: 10458, user_id: 1)
#
# home = Place.create(address: "535 Havemeyer Ave", zipcode: 10473, user_id: 2)
#
# brib = Place.create(address: "1555 Odell Ave", zipcode: 10458, user_id: 3)
#
# UserPlace.create(user_id: 4, place_id:2)
