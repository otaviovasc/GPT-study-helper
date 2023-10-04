class AddDetailsToExercises < ActiveRecord::Migration[7.0]
  def change
    add_column :exercises, :direita, :text, array: true, default: []
    add_column :exercises, :options, :text, array: true, default: []
  end
end
