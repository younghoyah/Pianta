class CreatePlants < ActiveRecord::Migration[5.1]
  def change
    create_table :plants do |t|
      t.string :name, null: false
      t.string :common_name
      t.string :scientific_name
      t.string :photo
      t.string :light_requirement
      t.string :soil_type
      t.string :water_requirement
      t.integer :garden_id, null: false

      t.timestamps
    end
  end
end