class RegionSerializer < ActiveModel::Serializer
  attributes :id, :region
  has_many :cities

  class CitySerializer < ActiveModel::Serializer
    attributes :id, :name, :region_id, :long, :lat
  end
end
