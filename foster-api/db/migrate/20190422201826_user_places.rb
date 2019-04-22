class UserPlaces < ActiveRecord::Migration[5.2]
  def change
    create_table :user_places do |t|
      t.belongs_to :user, foreign_key: true
      t.belongs_to :place, foreign_key: true

      t.timestamps
    end
  end
end
