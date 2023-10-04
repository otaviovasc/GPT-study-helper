class AddImgTagToExercises < ActiveRecord::Migration[7.0]
  def change
    add_column :exercises, :img_tag, :string
  end
end
