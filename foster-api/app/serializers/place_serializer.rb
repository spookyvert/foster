class PlaceSerializer < ActiveModel::Serializer
  attributes :id, :zipcode, :address, :user_id
end
