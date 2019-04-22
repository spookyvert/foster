class User < ApplicationRecord
  has_secure_password

  has_many :user_places
  has_many :places, through: :user_places

  validates :name, presence: true, uniqueness: { case_sensitive: false }
  validates :name, format: { with: /\A[a-zA-Z0-9\s]+\z/i, message: "can only contain letters and numbers." }





end
