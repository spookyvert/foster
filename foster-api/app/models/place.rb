class Place < ApplicationRecord

  has_many :user_places
  has_many :users, through: :user_places

  validates :address, presence: true
  validates :zipcode, presence: true

end
